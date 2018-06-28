var jwt = require('jwt-simple');
var passport = require('./passport');
var async = require('async');
var base64 = require('base-64');
var localStorage = require('localStorage');
var OAuth2Error = require('oauth2-server/lib/error');
//var thing_registration = require('../lib/thing_registration/thing_registration');
var oAuthSettings = require('./oAuthSettings');
var model = module.exports;

//tokens expiration time
model.accessTokenLifetime = 3600;
model.refreshTokenLifetime = 86400;

// JWT secret keys
var secretKey = oAuthSettings.secretKey;
var clientKey = oAuthSettings.clientKey;

/**
 * @author NB
 * allowJson() will convert content-type from json to x-www-form-urlencoded to allow this request
 * @param  {req}   req
 * @param  {res}   res
 * @param  {Function} next
 * @return {Function} next
 */
model.allowJson = function (req, res, next) {
	console.log('--1--');
    req.body.grant_type = "password";
    if (req.is('json'))
        req.headers['content-type'] = 'application/x-www-form-urlencoded';
    next();
};

model.allowJsonWithRefreshToken = function (req, res, next) {
	console.log('--2--');
    req.body.refresh_token = req.body.refreshtoken;
    req.body.grant_type = "refresh_token";
    if (req.is('json'))
        req.headers['content-type'] = 'application/x-www-form-urlencoded';
    next();
};

/**
 * @author NB
 * getClient() will verify client
 * @param  {String}   clientId
 * @param  {String}   clientSecret
 * @param  {Function} callback
 * @return {Function} callback
 */
model.getClient = function (clientId, clientSecret, callback) {
	console.log('--3--');
    var decoded = '';
    var randNum = '';
    async.series([
        function (cb) {
            decoded = jwt.decode(clientSecret, secretKey);
            cb(null, null);
        },
        function (cb) {
            randNum = localStorage.getItem('randomNumber');
            cb(null, null);
        }
    ],
        function (err, results) {
            if (err) {
                return callback(err, null);
            }
            return callback(null, {
                "clientId": clientId,
                "clientSecret": clientSecret
            });
        })
};

/**
 * grantTypeAllowed() will check for allowed grant type and allow user to authorized
 * @param  {String}   clientId
 * @param  {String}   grantType
 * @param  {Function} callback
 * @return {Function} callback
 */
model.grantTypeAllowed = function (clientId, grantType, callback) {
	console.log('--4--');
    callback(false, true);
};

/**
 * getUser() will verify user via grant type password
 * @param  {String}   username  email of user
 * @param  {String}   password
 * @param  {Function} callback
 * @return {Function} callback
 */
model.getUser = function (username, password, callback) {
	console.log('--5--');
    var req = {
        body: {
            username: username,
            password: password
        }
    };
    var res = {};
    //verify user name and password with local strategy
    passport.authenticate('local', function (err, user, info) {
        if (!user) {
            if (err) {
                return callback(new OAuth2Error('invalid_grant', err));
            }
            else if (info.message) {
                return callback(new OAuth2Error('invalid_grant', info.message));
            }
            else {
                return callback(new OAuth2Error('invalid_grant', err));
            }

        } else {
            callback(null, {
                id: user.id,
                email: user.email
            });
        }
    })(req, res);
};

/**
 * generateToken() will generate new token
 * @param  {String}   type token type
 * @param  {req}   req
 * @param  {Function} callback
 * @return {Function} callback
 */
model.generateToken = function (type, req, callback) {
	console.log('--6--');
    //Use the default implementation for refresh tokens
    if (type === 'refreshToken') {
        callback(null, null);
        return;
    }
    var expireDate = new Date();
    expireDate.setTime(expireDate.getTime() + model.accessTokenLifetime * 1000);

    //on refresh token will carry old user information
    var userInfo = {};

    if (req.cookies && req.cookies.userSession) {
        var oldToken = (JSON.parse(JSON.stringify(req.cookies.userSession))).access_token;
        if (oldToken) {
            var decoded = jwt.decode(oldToken, secretKey);
            userInfo = decoded.user;
        } else {
            userInfo = req.user;
        }
    }
    else {
        userInfo = req.user;
    }

    var token = jwt.encode({
        user: userInfo,
        subject: req.client.clientId,
        exp: expireDate
    }, secretKey);

    callback(null, token);
};

/**
 * saveAccessToken() will save access token
 * @param  {String}   token
 * @param  {String}   clientId
 * @param  {Timestamp}   expires
 * @param  {Object}   user
 * @param  {Function} callback
 * @return {Function} callback
 */
model.saveAccessToken = function (token, clientId, expires, user, callback) {
	console.log('--7--');
    callback(null);
};

/**
 * getAccessToken() will get bearer token
 * @param  {String}   bearerToken
 * @param  {Function} callback
 * @return {Function} callback
 */
model.getAccessToken = function (bearerToken, callback) {
	console.log('--8--');
    try {
        var decoded = jwt.decode(bearerToken, secretKey);
        callback(null, {
            accessToken: bearerToken,
            clientId: decoded.sub,
            userId: decoded.user,
            expires: new Date(decoded.exp)
        });
    } catch (e) {
        callback(e);
    }
};

/**
 * getRefreshToken() get refresh token from database
 * @param  {String}   refreshToken
 * @param  {Function} callback
 * @return {Function} callback
 */
model.getRefreshToken = function (refreshToken, callback) {
	console.log('--9--');
    var invokingUser = commonMethods.emptyUUID();
    var params = new procedureParams();
    /*Output params*/
    params.addOut('output', dataType.VarChar());
    params.addOut('fieldname', dataType.VarChar());
    /*Input params*/
    params.addIn('refreshtoken', dataType.VarChar(), refreshToken);
    params.addIn('invokingUser', dataType.VarChar(), invokingUser);
    params.addIn('version', dataType.VarChar(), currentVersionFolder);
    commonMethods.callStoreProcedure(masterDb,userStoreProcedure.getUserToken, params, function (err, isSuccess, response, output) {
        if (!err) {
            if (isSuccess) {
                var user = response[0];
                var userInfo = {
                    id: user.userGuid,
                    companyId: user.companyGuid,
                    roleId: user.roleGuid,
                    roleName: user.roleName,
                    cpId: user.cpId,
                    entityGuid: user.entityGuid
                };

                callback(null, {
                    refreshToken: user.refreshToken,
                    clientId: 'screteKEY',
                    user: userInfo,
                    expires: user.expireOn
                });
            } else {
                callback(null, {
                    refreshToken: '',
                    clientId: '',
                    userId: '',
                    expires: ''
                });
            }
        } else {
            callback(err);
        }
    });
};

/**
 * saveRefreshToken will save refresh token in database
 * @param  {String}   token
 * @param  {String}   clieexpireDatentId
 * @param  {Timestamp}  expires
 * @param  {Object}   user
 * @param  {Function} callback
 * @return {Function} callback
 */
model.saveRefreshToken = function (token, clientId, expires, user, callback) {
	console.log('--10--');
    callback(null, 'data');
};
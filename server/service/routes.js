'use strict';
var oAuthSettings = require('./config/oAuthSettings');
var jwt = require('jwt-simple');
var utf8 = require('utf8');
var base64 = require('base-64');
var commonMethod = require('../common/commonMethods');
var localStorage = require('localStorage');

var settings = require('../common/settings');
//Status codes and messages
var statusCode = settings.statusCode;
var authMessages = statusCode.authFailed;

module.exports = function(app) {
	var oAuthServer = require('oauth2-server');
    var oAuthModel = require('./config/oAuthModel');
	
	 /* Oauth server setup */
    app.oauth = new oAuthServer({
        model: oAuthModel,
        grants: ['password', 'refresh_token', 'client_credentials', 'authorization_code'],
        debug: false,
        accessTokenLifetime: oAuthModel.accessTokenLifetime,
        refreshTokenLifetime: oAuthModel.refreshTokenLifetime
    });

	// test
	/*app.get('/test', function(req, res, next) {
		console.log('test---11');
	});*/    
	
	
	//generate token
     app.get('/api/v1.1/auth/basic-token', function (req, res, next) {

        // localStorage.clear();
        var secretKey = oAuthSettings.secretKey;
		var randomNumber = Math.random().toString(36).slice(-10);

        var token = jwt.encode({
            'import': randomNumber
        }, secretKey);
		
        var text = 'screteKEY:' + token;
        var bytes = utf8.encode(text);
        var encoded = base64.encode(bytes);
        var token = encoded;
        if (token) {
            localStorage.setItem('randomNumber', randomNumber);
            var randNum = localStorage.getItem('randomNumber');
            //var refresthTokenData = [{ "refreshToken": token }]
            commonMethod.setSuccess(token, authMessages.basicTokenSuccess, function (response) {
                res.status(response.status).json(response);
            });
        }
        else {
            commonMethod.setPreconditionFailedError(refresthTokenData, authMessages.basicTokenFailed, function (response) {
                res.status(response.status).json(response);
            });
        }
    });
	
	// Login API
	app.post('/api/v1.1/auth/login', oAuthModel.allowJson, app.oauth.grant());
	
	// Check Validation
	app.all('/api/s/*', app.oauth.authorise(), function(req, res, next) {
		
        next();
    });
	
	app.use(function (err, req, res, next) {
		
        if (err) {
            if (err.status != 404 && err.status != "404") {
                try {
                    var requesturl = req.method + " " + req.get("host") + req.originalUrl;
                    commonMethod.error(requesturl, JSON.stringify(err));
                } catch (err) {
                    //console.log(err);
                }
                return res.status(401).json({
                    status: 401,
                    error: [{ "params": "OAuth", "message": ((err.message) ? err.message : err.error) }],
                    message: ((err.message) ? err.message : err.error)
                });
            }
        }
    });
	
	var apiVersion = 'v1.1'
	
	// User Route
	var userRoute = require('./api/site/user/'+apiVersion+'/route/userRoute.js');
    new userRoute(app);
};
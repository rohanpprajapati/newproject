var settings = require('./settings');
var statusCode = settings.statusCode;

var crypto = require('crypto');

// Password Authenticate
function authenticate(plainText, hashedPassword) {
	//console.log(encryptPassword(plainText, settings.saltKey));
    return encryptPassword(plainText, settings.saltKey) === hashedPassword;
}

// Create encrypt password
function encryptPassword(password) {
    if (!password) return '';
    return crypto.pbkdf2Sync(password, settings.saltKey, 10000, 64, 'sha512').toString('hex');
}

/**
 * @description Seeting a success response
 * @param data
 * @param message
 * @param callback
 */
var setSuccess = function (data, message, callback) {
    return callback({
        status: statusCode.success.code,
        data: data,
        message: message
    });
};

module.exports = {
	setSuccess: setSuccess,
	authenticate: authenticate
}
'use strict';

var userController = require('../controller/userController');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var currentVersionFolder = 'v1.1';

module.exports = function(app) {
    app.get('/api/s/'+currentVersionFolder+'/user/profile', userController.getProfile);
};
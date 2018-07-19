'use strict';

/*Node server */
var express = require('express');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var session = require('express-session');
var path = require('path');
var http = require('http');
var router = express.Router();

var app = express();
app.use(session({
    'secret': "secret key",
    'name': 'sid',
    'unset': 'destroy', 
    'resave': true,
    'saveUninitialized': true
}));

app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(function(req, res, next) {
	console.log('--come--');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Authorization, x-id, Content-Length, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
      
    next();
});



/*app.all('/log', function(req, res, next) {
    res.sendfile(app.get('appPath') + '/data_log.txt');
    //console.log(req.params.id);
    //res.render('index', { "did": req.params.id});
});*/

// routes
var router = require('./service/routes');
router(app);

//app.set('appPath', 'public');
//app.use(express.static(__dirname + '/public/dist'));
//app.all('/', function(req, res) { res.sendfile('./public/dist/index.html'); });


http.createServer(app).listen(4100, function(){
    console.log("Express server listening on port 4100");
});



exports = module.exports = app;
/*Node server */
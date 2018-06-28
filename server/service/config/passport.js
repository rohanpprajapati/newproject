var bcrypt = require('bcrypt-nodejs');
var passport = require('passport');
var _ = require('lodash');
var commonMethod = require('../../common/commonMethods');

//These are different types of authentication strategies that can be used with Passport.
var LocalStrategy = require('passport-local').Strategy;
var db = require('../../common/sequelize').db;
var localStorage = require('localStorage');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    db.models.user.find({where:{email:email}}).then(function(user){
        done(null, user);
    }).catch(function(err) {
        done(err, null);
    });
});

//Use local strategy
passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
}, function(req, email, password, done) {
    //tmpflag will check is user is proxy login or actual login
		
		db.models.user.findOne({
            where:{email:email}
        }).then(function(user){
				if (!user)
				{
					// User information not found
					done(null, false, {
						message: 'Email or Password is invalid'
					});
				}
				else if (!commonMethod.authenticate(password, user.password))
				{
					// Password Invalid
					done(null, false, {
						message: 'Email or Password is invalid'
					});
				}
				else
				{
					// Success
				    localStorage.clear();
					done(null, user);
				}
        }).catch(function(err) {
            done(err, null);
        });
        
}));

module.exports = passport;
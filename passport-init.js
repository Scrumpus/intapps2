var mongoose = require('mongoose');
var Admin = mongoose.model('Admin');
var LocalStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport) {

	//sereailize/deserialize users
	passport.serializeUser(function(user, done) {
		done(null, user._id);
	});

	passport.deserializeUser(function(id, done) {
		Admin.findById(id, function(err, user) {
			done(err, user);
		})
	});

	//authenticate admin login
	passport.use('login', new LocalStrategy({
			passReqToCallback : true
		},
		function(req, username, password, done) {
			Admin.findOne({ 'username' : username },
				function(err, user) {
					if (err) {
						console.log('Error');
						return done(err);
					}

					if (!user) {
						console.log('User not found');
						return done(null, false);
					}

					if (!isValidPassword(user, password)) {
						console.log('Invalid Password');
						return done(null, false);
					}
					req.session.user = user;
					return done(null, user);
				}
			)
		}
	));

	var isValidPassword = function(user, password) {
		return bCrypt.compareSync(password, user.password);
	}

	var createHash = function(password) {
		return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
	}


};
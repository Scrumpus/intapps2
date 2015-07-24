var express = require('express');
var router = express.Router();

module.exports = function(passport) {


	//sends failure login state back to angular
	router.get('/failure', function(req, res){
		res.send({state: 'failure', user: null, message: "Invalid username or password"});
	});

	router.get('/success', function(req, res) {
		req.user = req.body.firstname;
		res.redirect('/admin');
	})

	//log in
	router.post('/login', passport.authenticate('login', {
		failureRedirect: '/auth/failure',
		successRedirect: '/auth/success'
	}));

	//log out
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	return router;

}


// creating and show new entries

var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var User = mongoose.model('User');
var Tweet = mongoose.model('Tweet');


//handle posts
router.route('/posts')

	//create a new post
	.post(function(req, res) {
		var user = new User();
		user.firstname = req.body.firstname;
		user.lastname = req.body.lastname;
		user.email = req.body.email;
		user.zipcode = req.body.zipcode;
		user.signup = req.body.signup;

		// add to mailing list if user requested
		if (req.body.signup) {
			
		}

		user.save(function(err, user) {
			if (err) {
				console.log(err);
				return res.send(500,err);
			}
			return res.json(user);
		});
	})

	//get tweet content
	router.get('/tweet', function(req, res) {		
		Tweet.findOne(function(err, tweet) {
			if (err) return res.send(500, err);
			return res.send(200, tweet);
		})
		
	})

module.exports = router;
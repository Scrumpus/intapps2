// creating and show new entries

var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var User = mongoose.model('User');
var csv = require('csv');

//handle posts
router.route('/posts')

	//create a new post
	.post(function(req, res) {
		var user = new User();
		console.log(req.body);
		user.firstname = req.body.firstname;
		user.lastname = req.body.lastname;
		user.email = req.body.email;
		user.zipcode = req.body.zipcode;
		user.save(function(err, user) {
			if (err) {
				console.log(err);
				return res.send(500,err);
			}
			return res.json(user);
		});
	})
	//get all posts
	.get(function(req, res) {
		User.find(function(err, users) {
			if(err) {
				return res.send(500, err);
			}
			return res.send(200, users);
		})
	});

//export entries as csv
router.route('/download')
	.get(function(req, res) {
		User.find(function(err, results) {
			if(err) { throw err; }

			var users = results.map(function(user) {
				return {
					firstname: user.firstname,
					lastname: user.lastname,
					email: user.email,
					zipcode: user.zipcode
				}
			});

			csv.stringify(users, function(err2, data) {
				if (err) { throw err; }
				res.set({"Content-Disposition": "attachment; filename='users.csv'"});
				console.log('sending data');
				res.send(data);
			});
		})
	});


module.exports = router;
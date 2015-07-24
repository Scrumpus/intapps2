var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Tweet = mongoose.model('Tweet');
var csv = require('csv');
var passport = require('passport');
var nodemailer = require('nodemailer');

router.get('/', isAdmin, function(req, res, next) {
  	res.render('admin', { title: 'IntApp' });
});

router.route('/entries')
	.put(function(req,res) {
		User.findOneAndUpdate({_id: req.body._id}, {
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			email: req.body.email,
			zipcode: req.body.zipcode
		}, function(err, data) {
			if (err) throw err;
			return res.send('entry updated');
		})
	})
	.delete(function(req, res) {
		console.log(req.query);
		
		User.remove({_id:req.query._id}, function(err) {
			if (err) throw err;
		})
		
	});

router.route('/tweet')
	.put(function(req, res) {
		Tweet.findOne(function(err, tweet) {
			if (!tweet) {
				var newTweet = new Tweet();
				newTweet.content = req.body.content;
				newTweet.save(function(err, newtweet) {
					if (err) return res.send(500, err);
					return res.json(newtweet);
				})
			}
			else {
				Tweet.findOneAndUpdate({}, {
					content: req.body.content
				}, function(err, data) {
					if (err) throw err;
					return res.send('tweet updated');
				})
			}
		})
	})
	.get(function(req, res) {
		Tweet.findOne(function(err, tweet) {
			if (err) throw err;
			return res.send(200, tweet);
		})
	})

//export entries as csv
router.get('/download', function(req, res) {

	User.find(function(err, results) {
		if(err) throw err;

		var users = results.map(function(user) {
			return {
				firstname: user.firstname,
				lastname: user.lastname,
				email: user.email,
				zipcode: user.zipcode
			}
		});
		
		csv.stringify(users, function(err2, data) {
			if (err) throw err;
			res.set({"Content-Disposition": "attachment; filename=\"entries.csv\""});
			res.writeHead(200, {
		        'Content-Type': 'text/csv'
		    });
			res.end(data);
		});
	})
});

//get all posts
router.get('/posts', function(req, res) {
	User.find(function(err, users) {
		if(err) {
			return res.send(500, err);
		}
		return res.send(200, users);
	})
})

//logout
router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
})

//send mail to mailing list
router.post('/sendmail', function(req, res) {
	User.find({signup: true}, function(err, users) {
		if (err) throw err;
		var mailList = '';
		for (var i=0; i<users.length; i++) {
			if (i>0) {
				mailList += ', ';
			}
			mailList += users[i];
		}
		var transporter = nodemailer.createTransport({
			service: 'Gmail',
			auth: {
				user: 'scottdschwalbe@gmail.com',
				pass: 'ewok0515'
			}
		});
		var mailOptions = {
			from: 'scottdschwalbe@gmail.com',
			to: mailList,
			subject: 'Hello',
			text: req.body.email
		}
		transporter.sendMail(mailOptions, function(err, data) {
			if (err) console.log(err);
		})

	})
})

function isAdmin(req, res, next) {
	if (!req.user) {
		res.redirect('/#/login');
	}
	else {
		next();
	}
}


module.exports = router;
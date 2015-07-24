var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = mongoose.Schema({
	firstname: String,
	lastname: String,
	email: String,
	zipcode: String,
	signup: Boolean
});

var adminSchema = mongoose.Schema({
	username: String,
	password: String
})

var tweetSchema = mongoose.Schema({
	content: String
})


mongoose.model('User', userSchema);
mongoose.model('Admin', adminSchema);
mongoose.model('Tweet', tweetSchema);
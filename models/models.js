var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = mongoose.Schema({
	firstname: String,
	lastname: String,
	email: String,
	zipcode: String
});

mongoose.model('User', userSchema);
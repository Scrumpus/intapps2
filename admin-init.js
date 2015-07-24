var mongoose = require('mongoose');
var Admin = mongoose.model('Admin');
var bCrypt = require('bcrypt-nodejs');


module.exports = function() {
	
	Admin.findOne({username: 'demo'}, function(err, user) {
		if (err) throw err;
		if (!user) {
			var admin = new Admin();
			admin.username = 'demo';
			admin.password = bCrypt.hashSync('demo', bCrypt.genSaltSync(10), null);
			admin.save(function(err) {
				if (err) throw err;
			})
		}
	})

}
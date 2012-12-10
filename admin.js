// Kudos to http://mikevalstar.com/Blog/106/Coding_with_Nodejs_Part_3_Admin_login_with_Mongo_&_Mongoose

var crypto = require('crypto');

function hashString(value) {
  hash = crypto.createHash('sha1');
  hash.update(value);
  return hash.digest('hex');
}

var mongoose = require('mongoose');
mongoose.db = mongoose.connect('mongodb://localhost/mydb');
var Schema = mongoose.Schema;

if (process.argv.length == 4) {
	var User = new Schema({
    	    username: String,
        	password: String
    	});

	var userModel = mongoose.model('User', User);

	var user = new userModel({username: process.argv[2], password: hashString(process.argv[3]) });

	user.save(function(err) {
		console.log("User added to database");
		process.exit(0);
	});

} else {
	console.error("Script requires exactly 2 arguments");
	console.error("Usage: node admin.js <username> <password>");
	process.exit(1);
}

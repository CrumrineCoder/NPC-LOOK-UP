/*
// This file handles the backend for the user mongoose schem and functions

var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var CommentSchema = mongoose.Schema({
	comment: {
		type: String
	},
	id: {
		type: String
	}, 
  user:{
    type: String
  }, 
  date:{
    type: String
  }
});

var Comment = module.exports = mongoose.model('Comment', CommentSchema);

module.exports.createUser = function(newUser, callback){

	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}
*/
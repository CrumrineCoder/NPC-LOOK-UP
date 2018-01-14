var express = require('express');
var router = express.Router();
// This file handles routing relation to making and viewing polls
//var passport = require('passport');
//var LocalStrategy = require('passport-local').Strategy;
var NPC = require(process.cwd() + '/models/NPC');
//var Comment = require(process.cwd() + '/models/comment');
var mongoose = require('mongoose');
mongoose.connect('mongodb://' + process.env.HOST + '/' + process.env.NAME, {
    useMongoClient: true
});
var db = mongoose.connection;
//var Position = db.collection('Position');
//var page; 
router.get('/create', function(req, res) {
   if (req.user) {
         res.render('create');
    } else {
        res.render('login');
    }  
});
router.get('/view/:id', function(req, res) {
    res.render('view');
});
router.get('/edit/:id', function(req, res) {
    res.render('edit');
});
router.get('/profile/', function (req,res){
   res.render('profile');
});

router.post('/edit/', function(req, res) {
     var newNPC = new NPC(req.body);
        NPC.replace(newNPC, function(err, NPC) {
            if (err) throw err;
        }); 
      req.flash('success_msg', 'Saves changed.');
        res.redirect('/');
});
router.post('/delete/', function(req, res) {
    console.log(req.body);
     var newNPC = new NPC(req.body);
        NPC.delete(newNPC, function(err, NPC) {
            if (err) throw err;
        }); 
      req.flash('success_msg', 'NPC deleted; you monster.');
        res.redirect('/'); 
});
router.post('/create', function(req, res) {
    req.checkBody('Name', 'Name is required').notEmpty();
    var errors = req.validationErrors();
     if (errors) {
        res.render('create', {
            errors: errors
        });
    } else {
       req.body.username = req.user.username; 
       req.body.comments = []; 
        
       var newNPC = new NPC(req.body);
       NPC.createNPC(newNPC, function(err, NPC) {
          if (err) throw err;
       });
        req.flash('success_msg', 'Your NPC was created.');
        res.redirect('/');
    }
});

// Post a comment
/*
router.post('/comment', function(req, res) {
  function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}
    console.log(req.body); 
    var comment = req.body.comment;  
    var commentID = guidGenerator();
    var date = Date.now();
    if(req.user){
      var user = req.user.username; 
    }
    var newComment = new Comment({
      	comment: comment,
        id: commentID,
        user: user,
        date: date
    });
  // Get the Date and add it
  // Test if the comment is made by a user and if so store it. 
    // Will need to display undefined name sections as 'Anonymous'
  /*
      var newUser = new User({
            name: name,
            email: email,
            username: username,
            password: password
        });
        User.createUser(newUser, function(err, user) {
            if (err) throw err;
        });

        req.flash('success_msg', 'You are registered and can now login');

        res.redirect('/users/login');
    */
//});*/

router.get("/listing", function(req,res){
   res.render('NPClisting');
});
module.exports = router;
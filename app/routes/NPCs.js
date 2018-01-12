var express = require('express');
var router = express.Router();
// This file handles routing relation to making and viewing polls
//var passport = require('passport');
//var LocalStrategy = require('passport-local').Strategy;
var NPC = require(process.cwd() + '/models/NPC');
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
        var newNPC = new NPC(req.body);
        NPC.createNPC(newNPC, function(err, NPC) {
            if (err) throw err;
        });
        req.flash('success_msg', 'Your NPC was created.');
        res.redirect('/');
    }
});
router.get('/?/', function(req, res) {
    res.render('NPClisting', {s: req.query.s});
});

router.post('/?/', function(req, res) {
    res.render(process.cwd() + '/views/NPClisting.handlebars');
});

module.exports = router;
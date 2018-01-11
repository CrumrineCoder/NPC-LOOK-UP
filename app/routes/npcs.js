var express = require('express');
var router = express.Router();
// This file handles routing relation to making and viewing polls
//var passport = require('passport');
//var LocalStrategy = require('passport-local').Strategy;
var NPC = require(process.cwd() + '/models/npc');
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
router.get('/NPClisting', function(req, res) {
    res.render('NPClisting');
});

router.post('/search/', function(req, res) {
    console.log("Trouble");
    res.render(process.cwd() + '/views/NPCListing.handlebars');
});

/*router.get('/view', function(req, res) {
    res.render('pollListings');
});


router.get('/view/:id', function(req, res) {
    res.render('vote');
});

router.get('/view/:id/results', function(req, res) {
    // TODO: Validation for if the user has not voted
    res.render('result');
});

// Create poll
router.post('/create', function(req, res) {
    var position;
  var numberOfOptions = 0;
    var errors = [];
    if (Object.hasOwnProperty.call(req.body, "user")) {
        req.body.user = req.user.username;
    };

  function positionConfigure(){

    Position.find({}).forEach(function(item) {
        position = item.Position;
      checkErrors(position)
    });
    Position.update({}, {
        $inc: {
            Position: 1,
        }
    });

  }

    function checkErrors(position) {

        for (var key in req.body) {
            if (req.body[key] != '' && key != 'question' && key != 'user' && key != "OpenAnswers" && key != "Multiple" && key != "Captcha" && key != "IP" && key != "Change" && key != "SeeResults") {
                numberOfOptions++;
            }
            if (key == 'question' && req.body[key] == '') {
                errors.push({
                    msg: 'Question is required'
                });
            }
        }
        if (numberOfOptions < 2) {
            errors.push({
                msg: 'At least two answers are required'
            });
        }

        var dummy = {};
        dummy["question"] = req.body['question'].trim();
        var newQuestion = new Poll(dummy);

        Poll.checkExistance(newQuestion, res, function(err, result) {
            if (err) {
                throw err;
            } else {
                if (result != "Not in docs") {

                    errors.push({
                        msg: 'Question is  already in the database.'
                    });

                }
                restOfCreate(position);

            }
        });

    }
    positionConfigure();

    function restOfCreate(position) {

        if (errors.length != 0 && errors.length != undefined) {
            res.render('create', {
                errors: errors,
            });
            errors = [];
        } else {

            for (var key in req.body) {
                if (req.body[key] == '') {
                    delete req.body[key];
                }
            }
            var parsed = {
                Options: []
            };
            for (var key in req.body) {
                if (key != 'question' && key != 'user' && key != "OpenAnswers" && key != "Multiple" && key != "Captcha" && key != "IP" && key != "Change" && key != "SeeResults") {
                    parsed[req.body[key]] = 0;
                } else if (key != 'question' && (key == "OpenAnswers" || key == "Multiple" || key == "Captcha" || key == "Change" || key == "SeeResults")) {
                    parsed["Options"].push(req.body[key])
                } else if (key == "question") {
                    parsed["question"] = req.body[key].trim();
                } else {
                    parsed["user"] = req.body[key];
                }
            }

            parsed["_id"] = position; 
            parsed["Position"] = position;

            var newPoll = new Poll(parsed);
            Poll.createPoll(newPoll, function(err, Poll) {
                if (err) throw err;
            });

            req.flash('success_msg', 'Your poll was created.');

            res.redirect('/polls/view');
        }
    }
});

router.get('/edit/:id', function(req, res) {
    if (req.user) {
        res.render('edit');
    } else {
        res.render('login');
    }
});

router.post('/edit/', function(req, res) {

    var numberOfOptions;
    var errors = [];
    if (req.body["reply"] != null) {
        for (var i = 0; i < req.body["reply"].length; i++) {
            req.body["addedAnswer" + i] = req.body["reply"][i];
        }
    }
    delete req.body["reply"];

    for (var key in req.body) {
        if (req.body[key] != '' && key != 'question' && key != 'user' && key != "IP" && key != "Options") {
            numberOfOptions++;
        }
        if (key == 'question' && req.body[key] == '') {
            errors.push({
                msg: 'Question is required'
            });
        }
    }
    if (numberOfOptions < 2) {
        errors.push({
            msg: 'At least two answers are required'
        });
    }
    if (errors.length != 0 && errors.length != undefined) {
        res.render('edit', {
            errors: errors
        });
        errors = [];
    } else {
        for (var key in req.body) {
            if (req.body[key] == '') {
                delete req.body[key];
            }
        }
        var parsed = {
            Options: []
        };
        for (var key in req.body) {
            if (key != 'question' && key != 'user'  && key != 'Position'  && key != "OpenAnswers" && key != "Multiple" && key != "Captcha" && key != "IP" && key != "Change" && key != "SeeResults") {
                parsed[req.body[key]] = 0;
            } else if (key != 'question' && (key == "OpenAnswers" || key == "Multiple" || key == "Captcha" || key == "Change" || key == "SeeResults")) {
                parsed["Options"].push(req.body[key])
            } else if (key == "question") {
                parsed["question"] = req.body[key].trim();
            }
        }

        parsed["user"] = req.user.username;
        parsed["Position"] = req.body.Position;

        var newPoll = new Poll(parsed);
        Poll.replace(newPoll, function(err, Poll) {
            if (err) throw err;

        });

        req.flash('success_msg', 'Changes Saved.');

        res.redirect('/polls/view');
    }
});

router.post("/delete", function(req, res) {

    var newPoll = new Poll(req.body);
    Poll.delete(newPoll, function(err, Poll) {
        if (err) throw err;
    })
    req.flash('success_msg', 'Poll Deleted :(');

    res.redirect('/polls/create');
    // Get the identityCounters collection and decrease the counter by 1
    // Connect to the database, get the polls collection, find the poll in question, and delete the document.
});

module.exports = router; */
module.exports = router;
'use strict';
var ObjectId = require('mongodb').ObjectID;
// This file gets the polls collection data from the db and handles adding votes to the database
function NPCHandler(db) {
 var npc = db.collection('npcs');
 this.getAllNPCs = function(req, res) {
        npc.find({}, {
            __v: 0
        }).toArray(function(err, documents) {
            if (err) throw err
        
        
            res.json(documents);
        })
    }
  this.getOneNPC = function(req, res) {
    console.log("If I may be frank");
    console.log(req.query.id);
        npc.find({ _id: ObjectId(req.query.id )}).toArray(function(err, documents) {
            if (err) throw err
            console.log(documents);
        
            res.json(documents);
        })
    }
 }


module.exports = NPCHandler;
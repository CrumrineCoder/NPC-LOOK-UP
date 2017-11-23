'use strict';
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
 }
module.exports = NPCHandler;
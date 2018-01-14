// This file handles the backend for the NPC mongoose schema
var mongoose = require('mongoose');
//mongoose.set('debug', true);
var bcrypt = require('bcryptjs');
mongoose.connect('mongodb://' + process.env.HOST + '/' + process.env.NAME, {
    useMongoClient: true
});
var db = mongoose.connection;
var npc = db.collection('npcs');
var NPCSchema = mongoose.Schema({
    Name: {
        type: String,
        text: true
    }
}, {
    strict: false
});
var ObjectId = require('mongodb').ObjectID;
NPCSchema.index({
    "$**": "text"
});
npc.createIndex({
    "$**": "text"
});
var NPC = module.exports = mongoose.model('NPC', NPCSchema);
module.exports.replace = function(newNPC, callback) {
    console.log(newNPC);
  console.log("Duck");
    npc.update({
        _id: ObjectId(newNPC._id)
    }, newNPC);
}
module.exports.delete = function(newNPC, callback) {
    npc.remove({
        _id: ObjectId(newNPC._id)
    });
}
module.exports.createNPC = function(newNPC, callback) {
    newNPC.save(callback);
}
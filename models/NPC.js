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
     type: String, text: true
   }
}, {
    strict: false
});
/*
NPCSchema.index({
    Background: 'text'
});*/
var ObjectId = require('mongodb').ObjectID;
//console.log(npc.getIndexes());
NPCSchema.index({"$**":"text"});
//NPCSchema.createIndex({"Backstory":"text","Name":"text"})
npc.createIndex({"$**":"text"});
  
var NPC = module.exports = mongoose.model('NPC', NPCSchema);

module.exports.replace = function(newNPC, callback) {
  npc.update({_id: ObjectId(newNPC._id) }, newNPC);
}
/*NPC.on('index', function(err) {
    if (err) {
        console.error('User index error: %s', err);
    } else {
        console.info('User indexing complete');
    }
}); */
 
module.exports.createNPC = function(newNPC, callback) {
      newNPC.save(callback);

}
/*
var polls = db.collection('polls');
var counter = db.collection('identitycounters');
module.exports.replace = function(newPoll, callback) {

var str = (newPoll.question).replace(/(['"])/g, "\\$1");
   /*polls.find( {$text: {
            $search: str
        }}).forEach(function(item) {
     console.log("Item: ");
      console.log(item);
    }); */
  //  $search: '\"' + newPoll.question + '\"'
  /*  polls.replaceOne({
        $text: {
            $search: '\"' + newPoll.question + '\"'
        }
    }, newPoll);
  
}



    var Position = db.collection('Position');
module.exports.delete = function(poll, callback) {
    // Get the id of the question
    var position;
    polls.find({
        question: poll.question
    }).forEach(function(item) {
        position = item.Position;
        decrement(position);
    });

   Position.update({}, {
        $inc: {
            Position: -1,
        }
    });

  
   
    polls.deleteOne({
        question: poll.question
    });
  
    counter.update({}, {
        $inc: {
            "count": -1
        }
    }, function(err, results) {
        if (err) {
            throw err
        }
        if (!results.length) {
              console.log("Not found");
        }
    });
    // Get every document with an ID larger than it and decrement it { qty: { $gt: 4 } } 
    function decrement(id) {
       
        polls.update({
            Position: {
                $gt: id
            }
        }, {

            $inc: {
                Position: -1
            }

        }, { multi: true })
    }

}

module.exports.checkExistance = function(poll, res, callback) {

    polls.find({
        question: poll.question
    }, {
        $exists: true
    }).toArray(function(err, doc) //find if a value exists
        {
            if (doc && doc.length) //if it does
            {
                return callback(null, doc); // print out what it sends back
            } else // if it does not 
            {
                return callback(null, "Not in docs");
            }
        });
} */
var NPCHandler = require(process.cwd() + '/app/controllers/NPCHandler.server.js');
'use strict';

module.exports = function (app, db) {
   var npcHandler = new NPCHandler(db);

   app.route('/')
      .get(function (req, res) {
         res.render(process.cwd() + '/views/index.handlebars');
      });
  app.route('/api/listings')
      .get(npcHandler.getAllNPCs)
  app.route('/api/NPC/?')
      .get(npcHandler.getOneNPC)
  app.route('/api/search/')
     .get(npcHandler.Search)
};

'use strict';

console.log("Test");
module.exports = function (app, db) {
 

   app.route('/')
      .get(function (req, res) {
         res.render(process.cwd() + '/views/index.handlebars');
      });
  app.route('/NPC/Create')
        .get(function(req, res) {
            res.render(process.cwd() + '/views/createNPC.handlebars');
        });

};
  
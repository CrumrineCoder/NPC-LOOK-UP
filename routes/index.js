
'use strict';

console.log("Test");
module.exports = function (app, db) {
 

   app.route('/')
      .get(function (req, res) {
         res.render(process.cwd() + '/views/index.handlebars');
      });

};
  

'use strict';

module.exports = function (app, db) {
 

   app.route('/')
      .get(function (req, res) {
         res.render(process.cwd() + '/views/index.handlebars');
      });
  
};
  
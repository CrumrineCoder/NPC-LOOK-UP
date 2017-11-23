
'use strict';
(function(){
   console.log("Hello!");
  
    var app = angular.module('NPCApp', []);
    app.config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('{[{');
        $interpolateProvider.endSymbol('}]}');
    });
    app.controller('NPCController', function($scope) {
      
    });
 })
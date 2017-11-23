'use strict'
console.log("Hi");
(function(){

   console.log("Hello!");
  
    var app = angular.module('npc', []);
    app.config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('{[{');
        $interpolateProvider.endSymbol('}]}');
    });
    app.controller('npcController', function($scope) {
       $scope.stores = [{name: "Happy"}];
    });

 })();
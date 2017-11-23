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
 
      
        $scope.NPCs = [];
     var apiUrl = 'https://npclookup.glitch.me/';  
      function ready(fn) {
         // Will do the function once the document is ready
         if (typeof fn !== 'function') {
             return;
         }
         if (document.readyState === 'complete') {
             return fn();
         }
         document.addEventListener('DOMContentLoaded', fn, false);
     }

     function ajaxRequest(method, url, callback) {
         var xmlhttp = new XMLHttpRequest();
         // Everytime the readystage changes, we're checking if it's done, and if so this function will do the callback
         xmlhttp.onreadystatechange = function() {
             if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                 callback(xmlhttp.response);
             }
         };
         xmlhttp.open(method, url, true);
         xmlhttp.send();
     }
      
   
      function showNPCs(data) {
        console.log(data);
       
         var NPCObject = JSON.parse(data);
            console.log(NPCObject);
         var number;
         if (NPCObject.length != 0) {
     
             for (var i = 0; i < NPCObject.length; i++) {
                 number = 0;
                 for (var key in NPCObject[i]) {
                     if (!isNaN(parseInt(NPCObject[i][key])) && key != "_id" && key != "IP" && key != "question" && key != "Position") {
                         number += NPCObject[i][key];
                     }
                 }
             }
         }
     }
       ready(ajaxRequest('GET', apiUrl + "api/listings", showNPCs));
    });

 })();
 window.onload = function() {
    var app = angular.module('NPCApp', []);
    app.config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('{[{');
        $interpolateProvider.endSymbol('}]}');
    });
    app.controller('NPCController', function($scope) {
        $scope.stores = [];
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
      
   
      function showQuestions(data) {
         var listings = document.getElementById('anchor');
         var pollObject = JSON.parse(data);

         var number;
         if (pollObject.length != 0) {
             listings.innerHTML = "";
             for (var i = 0; i < pollObject.length; i++) {
                 number = 0;
                 for (var key in pollObject[i]) {
                     if (!isNaN(parseInt(pollObject[i][key])) && key != "_id" && key != "IP" && key != "question" && key != "Position") {
                         number += pollObject[i][key];
                     }
                 }
                 listings.innerHTML += "<form action='" + apiUrl + "polls/view/" + pollObject[i].Position + "' method='get'>" + "<button type='submit' style='width: 75%;'>" + pollObject[i].question + "<div class='smallNumber'>" + number + "</div> </button>" + "<br>" + "</form>";
             }
         }
     }
    });
 }
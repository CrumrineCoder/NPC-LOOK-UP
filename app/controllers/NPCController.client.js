'use strict';
(function() {
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
        var user;

        function getUser(callback) {
            ajaxRequest('GET', apiUrl + "users/user_data", function(data) {
                data = JSON.parse(data);
                if (data.hasOwnProperty('username')) {
                    user = data.username;
                }
                callback();
            });
        }
        getUser(function() {
            ready(ajaxRequest('GET', apiUrl + "api/listings", showNPCs))
        });

        function search(nameKey, myArray) {
            var newArr = [];
            for (var i = 0; i < myArray.length; i++) {
                if (myArray[i].username === nameKey && nameKey != null) {
                    newArr.push(myArray[i]);
                }
            }
            return newArr;
        }

        function showNPCs(data) {
            var NPCObject = JSON.parse(data);
            var resultObject = search(user, NPCObject);
            for (var i = 0; i < NPCObject.length; i++) {
                $scope.$apply(function() {
                    $scope.NPCs.push(NPCObject[i]);
                });
            }
            if (resultObject.length > 0) {
              for(var i=0; i<resultObject.length; i++){
                var link = document.createElement("a");
                link.href = "edit/" + resultObject[i]._id;
                var textnode = document.createTextNode("Edit");
                link.appendChild(textnode);
                document.getElementById(resultObject[i]._id).appendChild(link);
                var br = document.createElement("br");
                document.getElementById(resultObject[i]._id).appendChild(br);
                 var link = document.createElement("a");
                link.href = "delete/" + resultObject[i]._id;
                var textnode = document.createTextNode("Delete");
                link.appendChild(textnode);
                link.onclick = function (){return confirm('Are you sure?')};
                document.getElementById(resultObject[i]._id).appendChild(link);
              }

            }
        }
    });
})();
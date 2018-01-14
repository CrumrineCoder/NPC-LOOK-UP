'use strict';
console.log(window.location.href);
(function() {
    var app = angular.module('npc', []);
    app.config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('{[{');
        $interpolateProvider.endSymbol('}]}');
    });
    app.controller('npcController', function($scope) {
        $scope.search = "";
        $scope.NPCs = [];
        var apiUrl = 'https://npclookup.glitch.me/';
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
        $scope.load = function reload() {
            getUser(function() {
                ready(ajaxRequest("GET", apiUrl + "api/listings", showNPCs))
            });
        }
        $scope.load();

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
           $scope.NPCs = [];
            if ($scope.search != "") {
                NPCObject = NPCObject.filter( function(obj){return (obj.Name.toLowerCase()).indexOf($scope.search.toLowerCase()) != -1});
            }
          
            for (var i = 0; i < NPCObject.length; i++) {
                $scope.$apply(function() {
                    $scope.NPCs.push(NPCObject[i]);
                });
            }
            if (NPCObject.length > 0) {
                for (var i = 0; i < NPCObject.length; i++) {
                    if (user == NPCObject[i].username) {
                        var link = document.createElement("a");
                        link.href = "NPC/edit/" + NPCObject[i]._id;
                        var textnode = document.createTextNode("Edit");
                        link.appendChild(textnode);
                        document.getElementById(NPCObject[i]._id).appendChild(link);
                    }
                }
                var elems = document.getElementsByClassName('confirmation');
                var confirmIt = function(e) {
                    if (!confirm('Are you sure?')) e.preventDefault();
                };
                for (var i = 0, l = elems.length; i < l; i++) {
                    elems[i].addEventListener('click', confirmIt, false);
                }
            }
          else{
            alert("No NPC can be found by that name.")
          }
        }
    });
})();
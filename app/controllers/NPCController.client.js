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
            console.log("Show NPCs");
            console.log(NPCObject);
            console.log($scope.search);
            if ($scope.search != "") {
              console.log("Bird");
                NPCObject = NPCObject.find( function(obj){ console.log(obj); return obj.name = $scope.search});
            }
            console.log(NPCObject);
            //   var resultObject = search(user, NPCObject);
            for (var i = 0; i < NPCObject.length; i++) {
                $scope.$apply(function() {
                    $scope.NPCs.push(NPCObject[i]);
                });
            }
            if (NPCObject.length > 0) {
                for (var i = 0; i < NPCObject.length; i++) {
                    if (user == NPCObject[i].username) {
                        var link = document.createElement("a");
                        link.href = "edit/" + NPCObject[i]._id;
                        var textnode = document.createTextNode("Edit");
                        link.appendChild(textnode);
                        document.getElementById(NPCObject[i]._id).appendChild(link);
                        var form = document.createElement("form");
                        form.setAttribute('method', "post");
                        form.setAttribute('action', "/NPC/delete");
                        var input = document.createElement("input");
                        input.type = "hidden";
                        input.name = "_id";
                        input.value = NPCObject[i]._id;
                        var button = document.createElement("button");
                        button.type = "submit";
                        button.className = "confirmation";
                        var textNode = document.createTextNode("Delete");
                        button.appendChild(textNode);
                        form.appendChild(input);
                        form.appendChild(button);
                        document.getElementById(NPCObject[i]._id).appendChild(form);
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
        }
    });
})();
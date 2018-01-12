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
            console.log(NPCObject);
            console.log(resultObject);
            for (var i = 0; i < resultObject.length; i++) {
                $scope.$apply(function() {
                    $scope.NPCs.push(resultObject[i]);
                });
            }
            if (resultObject.length > 0) {
                for (var i = 0; i < resultObject.length; i++) {
                    var form = document.createElement("form");
                    form.setAttribute('method', "post");
                    form.setAttribute('action', "/NPC/delete");
                    var input = document.createElement("input");
                    input.type = "hidden";
                    input.name = "_id";
                    input.value = resultObject[i]._id;
                    var button = document.createElement("button");
                    button.type = "submit";
                    button.className = "confirmation";
                    var textNode = document.createTextNode("Delete");
                    button.appendChild(textNode);
                    form.appendChild(input);
                    form.appendChild(button);
                    document.getElementById(resultObject[i]._id).appendChild(form);
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
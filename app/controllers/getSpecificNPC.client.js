(function() {
    var path = window.location.pathname;
    var page = path.split("/").pop();
    var app = angular.module('npc', []);
    app.config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('{[{');
        $interpolateProvider.endSymbol('}]}');
    });
    app.controller('npcController', function($scope) {
        $scope.NPC = [];
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
            var NPCObject = JSON.parse(data);
            /*   console.log(NPCObject[0]);
                 $scope.$apply(function() {
                     $scope.NPCs.push(NPCObject);
                    });
               console.log($scope.NPCs)*/

            for (var i = 0; i < NPCObject.length; i++) {
                $scope.$apply(function() {
                    $scope.NPC = NPCObject[i];
                });
            }
        }
        ready(ajaxRequest('GET', apiUrl + "api/NPC/?id=" + page, showNPCs));
    });
})();
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
(function() {
    var path = window.location.pathname;
    var page = path.split("/").pop();
    var angularApp = angular.module('npc', []);
    angularApp.config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('{[{');
        $interpolateProvider.endSymbol('}]}');
    });
    angularApp.controller('npcController', function($scope) {
        $scope.NPC = [];
        var apiUrl = 'https://npclookup.glitch.me/';

        function showNPCs(data) {
            var NPCObject = JSON.parse(data);
            console.log(NPCObject); 
            for (var i = 0; i < NPCObject.length; i++) {
                $scope.$apply(function() {
                    $scope.NPC = NPCObject[i];
                });
            }
        }
        ready(ajaxRequest('GET', apiUrl + "api/NPC/?id=" + page, showNPCs));
    });
})();
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
            for (var i = 0; i < NPCObject[0].comments.length; i++) {
                if (NPCObject[0].comments[i].user == undefined) {
                    NPCObject[0].comments[i].user = "Anonymous"
                }
            }
            $scope.$apply(function() {
                $scope.NPC = NPCObject[0];
                $scope.comments = NPCObject[0].comments;
            });
        }
        ready(ajaxRequest('GET', apiUrl + "api/NPC/?id=" + page, showNPCs));
    });
})();
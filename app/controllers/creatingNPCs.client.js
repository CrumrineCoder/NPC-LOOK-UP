'use strict'

function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight) + "px";
}
(function() {
    /*    var app = angular.module('npc', []);
        app.config(function($interpolateProvider) {
            $interpolateProvider.startSymbol('{[{');
            $interpolateProvider.endSymbol('}]}');
        });
        app.controller('npcController', function($scope) {
            $scope.NPCs = []; */
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
        var Age = NPCObject.map(function(a) {
            return a.Age;
        });
        var Profession = NPCObject.map(function(a) {
            return a.Profession;
        });
        var Gender = NPCObject.map(function(a) {
            return a.Name;
        });
        var Race = NPCObject.map(function(a) {
            return a.Race;
        });
        var Faction = NPCObject.map(function(a) {
            return a.FactionType;
        });
   /*     var Location = NPCObject.map(function(a) {
            return a.Location;
        }); */
        var AgeList = document.getElementById('AgeList');
        Age.forEach(function(item) {
            var option = document.createElement('option');
            option.value = item;
            AgeList.appendChild(option);
        });
        var ProfessionList = document.getElementById('ProfessionList');
        Profession.forEach(function(item) {
            var option = document.createElement('option');
            option.value = item;
            ProfessionList.appendChild(option);
        });
        var GenderList = document.getElementById('GenderList');
        Gender.forEach(function(item) {
            var option = document.createElement('option');
            option.value = item;
            GenderList.appendChild(option);
        });
        var RaceList = document.getElementById('RaceList');
        Race.forEach(function(item) {
            var option = document.createElement('option');
            option.value = item;
            RaceList.appendChild(option);
        });
        var FactionList = document.getElementById('FactionList');
        Faction.forEach(function(item) {
            var option = document.createElement('option');
            option.value = item;
            FactionList.appendChild(option);
        });
    /*    var LocationList = document.getElementById('LocationList');
        Location.forEach(function(item) {
            var option = document.createElement('option');
            option.value = item;
            LocationList.appendChild(option);
        }); */
    }
    ready(ajaxRequest('GET', apiUrl + "api/listings", showNPCs));
})();
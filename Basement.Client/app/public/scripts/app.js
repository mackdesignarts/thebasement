/*************************
The Basement
app.js
==========================
Auth: TmAck.072 <tonymclaughlin72@gmail.com> 
Date: 5/28/15
*************************/

'use strict';


var app = angular.module('basement', ['ui.router', 'ui.bootstrap']);

app.config(['$urlRouterProvider', '$stateProvider', '$locationProvider', '$httpProvider', function ($urlRouterProvider, $stateProvider, $locationProvider, $httpProvider) {
            
    // Handle unmatched routes
    $urlRouterProvider
        .when('', '/')
        .when('index.html', '/');
                        
    // State config
    $stateProvider
                
        // Catalog
        .state('main', {
            url: "/",
            views: {
                content: {
                    templateUrl: 'Content/views/game.html',
                    controller: 'gameCtrl'
                }
            }
        })        
                                       
    $locationProvider.html5Mode(true);
    
}]).run(['$rootScope', '$http', '$state', '$location',
function ($rootScope, $http, $state, $location) { 

}]);

/**
 * Created by MAO on 9/9/2015.
 */
(function(){
    'use strict';
    var app=angular.module('app',['ngRoute','angularUtils.directives.dirPagination']);
    app.directive('modal', function () {
        return {
            templateUrl:"app/partials/signUp.html",
            restrict: 'E',
            scope:true,
            link: function postLink(scope, element, attrs) {


            }
        };
    });

    app.directive('signInModal', function () {
        return {
            templateUrl:"app/partials/signIn.html",
            restrict: 'E',
            scope:true,
            link: function postLink(scope, element, attrs) {


            }
        };
    });
    
    app.directive('resetPasswordModal', function () {
        return {
            templateUrl:"app/partials/resetPassword.html",
            restrict: 'E',
            scope:true,
            link: function postLink(scope, element, attrs) {


            }
        };
    });

    app.directive('comment', ["$compile", '$http', '$templateCache', '$parse', function ($compile, $http, $templateCache, $parse) {
        return {
            restrict: 'E',
            link: function(scope , element, attrs) {


            },
            templateUrl:"app/partials/comment.html"
        }
    }]);
    //app.config(function($routeProvider) {
    //    $routeProvider
    //        .when("/", {
    //            controller: "mainCtrl",
    //            templateUrl: "app/templates/home.html"
    //
    //
    //        })
    //        .when("/home", {
    //            controller: "mainCtrl",
    //            templateUrl: "app/templates/home.html"
    //
    //
    //        })
    //        .when("/cv", {
    //            controller: 'mainCtrl',
    //            templateUrl: "app/templates/cv.html"
    //
    //
    //        })
    //        .when("/projects", {
    //            controller: 'mainCtrl',
    //            templateUrl: "app/templates/projects.html"
    //
    //
    //        })
    //        .when("/contacts", {
    //            controller: "mainCtrl",
    //            templateUrl: "app/templates/contacts.html"
    //
    //
    //        })
    //        .when("/contacts/send", {
    //            controller: "mainCtrl",
    //            templateUrl: "app/templates/contacts.html"
    //
    //
    //        })
    //
    //        .otherwise({redirectTo: "/"})
    //});

})();

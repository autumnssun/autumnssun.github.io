"use strict";angular.module("kaseWebsiteApp",["ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).when("/sandbox",{templateUrl:"views/sandbox.html",controller:"SandboxCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("kaseWebsiteApp").controller("MainCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("kaseWebsiteApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("kaseWebsiteApp").controller("SandboxCtrl",["$scope",function(){}]),angular.module("kaseWebsiteApp").service("skrollrService",["$document","$q","$rootScope","$window",function(a,b,c,d){function e(){c.$apply(function(){var a=d.skrollr.init({forceHeight:!1});f.resolve(a)})}var f=b.defer(),g=a[0].createElement("script");g.type="text/javascript",g.async=!0,g.src="bower_components/skrollr/dist/skrollr.min.js",g.onreadystatechange=function(){"complete"===this.readyState&&e()},g.onload=e;var h=a[0].getElementsByTagName("body")[0];return h.appendChild(g),{skrollr:function(){return f.promise}}}]),angular.module("kaseWebsiteApp").directive("skrollrTag",["skrollrService",function(a){return{link:function(b,c){a.skrollr().then(function(a){a.refresh()}),$scope.$watch(function(){return c[0].childNodes.length},function(b,c){b!==c&&a.skrollr().then(function(a){a.refresh()})})}}}]);
"use strict";angular.module("animationProjectApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","nvd3ChartDirectives","angular.filter","ui.select"]).config(["$routeProvider","uiSelectConfig",function(a,b){b.theme="select2",a.when("/",{templateUrl:"views/main.html",controller:"PaitentslistCtrl"}).when("/paitentsList",{templateUrl:"views/paitentslist.html",controller:"PaitentslistCtrl"}).when("/sandbox",{templateUrl:"views/sandbox.html",controller:"SandboxCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("animationProjectApp").controller("MainCtrl",["$scope",function(a){a.currentPage=0,a.medata=[{key:"Series 1",values:[[10254096e5,0],[1028088e6,-6.3],[10307664e5,-5.4],[10333584e5,-11.5],[10360404e5,-5.2],[10386324e5,.42]]},{key:"Series 2",values:[[10254096e5,0],[1028088e6,6.42],[10307664e5,5.31],[10333584e5,11.32],[10360404e5,5.4],[10386324e5,42.53]]}],a.cardAnimation="classSlideFromTop",a.animationClass="pagePushRight",a.hideMain=!1,a.patientList={};var b="assets/patients.json";$http.get(b).success(function(b){a.patientList=b.users,a.patientList.selected=a.patientList[0]}),a.toogle=function(){a.hideMain=!a.hideMain,console.log(a.hideMain)},a.previousConsultation=function(){a.cardAnimation="my-element",console.log(a.hideMain),a.hideMain=!a.hideMain},a.loadPaitent=function(b){a.currentPage=0,a.hideMain=!1,a.patientList.selected=b},a.xAxisTickFormatFunction=function(){return function(a){return d3.time.format("%b")(new Date(a))}},a.$on("ngRepeatFinished",function(){PageTransitions.init()})}]),angular.module("animationProjectApp").controller("IndexcontrollerCtrl",function(){}),angular.module("animationProjectApp").controller("PaitentslistCtrl",["$scope","$http",function(a,b){a.time_animation_in="flipInTop",a.time_animnation_out="flipOutTop",a.currentPage=0,a.medata=[{key:"Series 1",values:[[10254096e5,0],[1028088e6,-6.3],[10307664e5,-5.4],[10333584e5,-11.5],[10360404e5,-5.2],[10386324e5,.42]]},{key:"Series 2",values:[[10254096e5,0],[1028088e6,6.42],[10307664e5,5.31],[10333584e5,11.32],[10360404e5,5.4],[10386324e5,42.53]]}],a.cardAnimation="classSlideFromTop",a.animationClass="pagePushRight",a.hideMain=!1,a.patientList={};var c="assets/patients.json";b.get(c).success(function(b){a.patientList=b.users,a.patientList.selected=a.patientList[0]}),a.toogle=function(){a.hideMain=!a.hideMain,console.log(a.hideMain)},a.previousConsultation=function(){a.cardAnimation="my-element",console.log(a.hideMain),a.hideMain=!a.hideMain},a.loadPaitent=function(b){a.currentPage=0,a.hideMain=!1,a.patientList.selected=b},a.xAxisTickFormatFunction=function(){return function(a){return d3.time.format("%b")(new Date(a))}},a.$on("ngRepeatFinished",function(){PageTransitions.init()})}]),angular.module("animationProjectApp").controller("SandboxCtrl",["$scope","$http",function(a,b){a.currentPage=0,a.cardAnimation="classSlideFromTop",a.animationClass="pagePushRight",a.hideMain=!1,a.patientList={};var c="assets/patients.json";b.get(c).success(function(b){a.patientList=b.users,a.patientList.selected=a.patientList[0]}),a.toogle=function(){a.hideMain=!a.hideMain,console.log(a.hideMain)},a.previousConsultation=function(){a.cardAnimation="my-element",console.log(a.hideMain),a.hideMain=!a.hideMain},a.loadPaitent=function(b){a.currentPage=0,a.hideMain=!1,a.patientList.selected=b},a.$on("ngRepeatFinished",function(){})}]),angular.module("animationProjectApp").directive("consultation",function(){return{template:"<div></div>",restrict:"E",link:function(a,b,c){b.text("this is the consultation directive"),console.log(c)}}}),angular.module("animationProjectApp").directive("onFinishRender",["$timeout",function(a){return{restrict:"A",link:function(b){b.$last===!0&&a(function(){b.$emit("ngRepeatFinished")})}}}]);
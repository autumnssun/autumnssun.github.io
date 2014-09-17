"use strict";angular.module("restaurantApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","google-maps","FBAngular","angular-gestures","angular-loading-bar","mobile-angular-ui","restangular","ui.router","ui.select","ngToast","LocalStorageModule"]).config(["$routeProvider","cfpLoadingBarProvider","RestangularProvider","uiSelectConfig",function(a,b,c,d){b.includeSpinner=!1,d.theme="selectize",c.setBaseUrl("https://api.parse.com/1/"),c.setDefaultHeaders({"X-Parse-Application-Id":"dCmrudTKTJFxZAZNMoFjolAutEpwrCDMX91tzGLg","X-Parse-REST-API-Key":"MgOlryPflpjonYxpj2DvK9OPbbGc4xeFbQ4Np2o0","Content-Type":"application/json"}),c.setFullResponse(!0),c.setResponseExtractor(function(a,b){var c;switch(b){case"getList":c=a.results;break;case"get":c=a;break;case"getRequestedUrl":console.log(a);break;default:c=a}return c}),a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/dining",{templateUrl:"views/map.html",controller:"MapCtrl"}).when("/store",{templateUrl:"views/store.html",controller:"StoreCtrl"}).when("/store/:dta",{templateUrl:"views/store.html",controller:"StoreCtrl"}).when("/cooker",{templateUrl:"views/cooking.html",controller:"CookingCtrl"}).when("/sandbox",{templateUrl:"views/sandbox.html",controller:"SandboxCtrl"}).when("/login",{templateUrl:"views/login.html",controller:"LoginCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("restaurantApp").controller("MainCtrl",["$scope","$cookieStore","userService",function(a,b,c){console.log(b),a.userName=c.getUserName(),console.log(c.getUserName())}]),angular.module("restaurantApp").controller("MapCtrl",["$scope","$http","$location","Restangular",function(a,b,c,d){d.all("classes/food").getList().then(function(b){for(var c=b.data,d=0;d<c.length;d++)c[d].id=d,c[d].title=c[d].name,c[d].latitude=c[d].location.latitude,c[d].longitude=c[d].location.longitude;a.markers=c}),a.map={control:{},center:{latitude:-27.5000427,longitude:153.00654570000006},zoom:14,draggable:!0,options:{disableDefaultUI:!0}},a.markersEvents={click:function(b,d,e){e.$id&&(e=e.coords),c.path("/store/"+e.objectId),a.$apply()}},a.myRot=function(b){console.log(a.map.control.getGMap()),a.map.control.getGMap().setHeading(b.gesture.angle)}}]),angular.module("restaurantApp").controller("StoreCtrl",["$scope","$routeParams","Restangular","$location","userService","$rootScope","ngToast",function(a,b,c,d,e,f,g){a.photoList=[],a.transaction={},a.transaction.selectOptions=[],a.transaction.selectOptions.selected=[],a.transaction.selectOptions.selected.amount=1,a.thisFood={};var h=function(b){var e=c.one("classes/food",b);e.get().then(function(b){a.thisFood=b.data,console.log(a.thisFood);for(var d=1;d<a.thisFood.numberOfServe+1;d++)a.transaction.selectOptions.push({amount:d,total:d*a.thisFood.price});a.thisFood.photos&&angular.forEach(a.thisFood.photos,function(b){c.one("classes/photo",b).get().then(function(b){a.photoList.push(b.data)})}),console.log(a.thisFood.cooker),a.thisFood.cooker&&c.one("users",a.thisFood.cooker.objectId).get().then(function(b){a.cooker=b.data},function(a){console.log(a)}),a.billTotal=function(){return a.transaction.selectOptions.selected.amount*a.thisFood.price}},function(){g.create({"class":"danger",content:"This foood is not available"}),d.path("dining")})},i=b.dta,j=c.all("classes/order");a.thisFood=h(i);var k=function(a,b){var c={__type:"Pointer",className:a,objectId:b};return c};a.buy=function(){f.toggle("myOverlay","on")},a.confirm=function(){var b=c.one("classes/food",a.thisFood.objectId);b.numberOfServe=a.thisFood.numberOfServe-a.transaction.selectOptions.selected.amount,console.log(b.numberOfServe),b.numberOfServe>=0&&e.isLogin()&&null!==e.getUserID()?(a.transaction.food=k("food",a.thisFood.objectId),a.transaction.customer=k("_User",e.getUserID()),a.transaction.serve=a.transaction.selectOptions.selected.amount,j.post(angular.toJson(a.transaction)).then(function(){g.create({content:"<p>Order placed</p>"}),f.toggle("myOverlay","off")},function(){g.create({"class":"danger",content:"Cannot place order at the moment"})}),b.put().then(function(a){console.log(a),g.create({content:"Order place sucessfully"}),d.path("dining"),f.toggle("myOverlay","off")},function(){g.create({content:"Problem with order"}),f.toggle("myOverlay","off")})):g.create({"class":"danger",content:"Can not place order now"})}}]),angular.module("restaurantApp").controller("CookingCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("restaurantApp").controller("SandboxCtrl",["$scope","Restangular",function(a,b){var c=b.one("classes/food","d73VcdrWs0");console.log(c),c.put().then(function(a){console.log(a)})}]),angular.module("restaurantApp").controller("LoginCtrl",["$scope","Restangular","$location","userService","ngToast",function(a,b,c,d,e){a.user={username:"nano",password:"123"},a.getSession=function(){console.log(d.getSessionToken())},a.doLogOut=function(){d.logout(),d.setSessionToken(null)},a.doSubmit=function(){d.login(a.user.username,a.user.password).then(function(a){console.log(a.data),d.setSessionToken(a.data.sessionToken),d.setUserName(a.data.username),d.setUserID(a.data.objectId),console.log("Yay!!"),e.create({content:"<label>Login Succesfull</label><br><span>Going back to home page</span>"}),c.path("#/")},function(){})}}]),angular.module("restaurantApp").factory("userService",["Restangular","localStorageService",function(a,b){function c(){return b.get("token")}function d(a){b.set("token",a)}function e(){return b.get("username")}function f(a){b.set("username",a)}function g(a){b.set("userID",a)}function h(){return b.get("userID")}function i(){return null!==b.get("token")?!0:!1}function j(){b.clearAll()}function k(a,b){return l.get("?username="+a+"&password="+b)}var l=a.all("login"),m={isLogin:i,logout:j,login:k,getSessionToken:c,setSessionToken:d,getUserID:h,setUserID:g,getUserName:e,setUserName:f};return m}]);
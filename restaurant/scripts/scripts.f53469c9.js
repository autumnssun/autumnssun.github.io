"use strict";angular.module("restaurantApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","google-maps","FBAngular","angular-gestures","angular-loading-bar","mobile-angular-ui","restangular","ui.router","ui.select","ngToast","LocalStorageModule","angularFileUpload"]).config(["$routeProvider","cfpLoadingBarProvider","RestangularProvider","uiSelectConfig",function(a,b,c,d){b.includeSpinner=!1,d.theme="selectize",c.setBaseUrl("https://api.parse.com/1/"),c.setDefaultHeaders({"X-Parse-Application-Id":"dCmrudTKTJFxZAZNMoFjolAutEpwrCDMX91tzGLg","X-Parse-REST-API-Key":"MgOlryPflpjonYxpj2DvK9OPbbGc4xeFbQ4Np2o0","Content-Type":"application/json"}),c.setRestangularFields({id:"objectId"}),c.setFullResponse(!0),c.setResponseExtractor(function(a,b){var c;switch(b){case"getList":c=a.results;break;default:c=a}return c}),a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/dining",{templateUrl:"views/map.html",controller:"MapCtrl"}).when("/store",{templateUrl:"views/store.html",controller:"StoreCtrl"}).when("/store/:dta",{templateUrl:"views/store.html",controller:"StoreCtrl"}).when("/cooker",{templateUrl:"views/cooking.html",controller:"CookingCtrl"}).when("/sandbox",{templateUrl:"views/sandbox.html",controller:"SandboxCtrl"}).when("/login",{templateUrl:"views/login.html",controller:"LoginCtrl"}).when("/sandbox",{templateUrl:"views/sandbox.html",controller:"SandboxCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("restaurantApp").controller("MainCtrl",["$scope","$cookieStore","userService",function(a,b,c){console.log(b),a.userName=c.getUserName(),console.log(c.getUserName())}]),angular.module("restaurantApp").controller("MapCtrl",["$scope","$http","$location","foodService",function(a,b,c,d){d.getAllFood().then(function(b){a.markers=b,console.log(a.markers)}),a.map={control:{},center:{latitude:-27.5000427,longitude:153.00654570000006},zoom:14,draggable:!0,options:{disableDefaultUI:!0}},a.markersEvents={click:function(b,d,e){e.$id&&(e=e.coords),c.path("/store/"+e.objectId),a.$apply()}}}]),angular.module("restaurantApp").controller("StoreCtrl",["$scope","$routeParams","$location","userService","$rootScope","foodService","Restangular","ngToast",function(a,b,c,d,e,f,g,h){var i=g.all("classes/order"),j=b.dta;f.buildCompledFood(j).then(function(b){a.thisFood=b,console.log(a.thisFood)}),a.buy=function(){e.toggle("myOverlay","on")},a.billTotal=function(){return a.thisFood.serveList&&a.thisFood.serveList.selected&&a.thisFood.serveList.selected.amount?a.thisFood.serveList.selected.amount*a.thisFood.price:0},a.total=function(a,b){return a*b};var k=function(a,b){var c={__type:"Pointer",className:a,objectId:b};return c};a.confirm=function(){var b=g.one("classes/food",a.thisFood.objectId);b.numberOfServe=a.thisFood.numberOfServe-a.thisFood.serveList.selected.amount,console.log(b.numberOfServe),console.log(d.isLogin()),b.numberOfServe>=0&&d.isLogin()&&null!==d.getUserID()?(a.transaction.food=k("food",a.thisFood.objectId),a.transaction.customer=k("_User",d.getUserID()),a.transaction.serve=a.transaction.selectOptions.selected.amount,i.post(angular.toJson(a.transaction)).then(function(){h.create({content:"<p>Order placed</p>"}),e.toggle("myOverlay","off")},function(){h.create({"class":"danger",content:"Cannot place order at the moment"})}),b.put().then(function(a){console.log(a),h.create({content:"Order place sucessfully"}),c.path("dining"),e.toggle("myOverlay","off")},function(){h.create({content:"Problem with order"}),e.toggle("myOverlay","off")})):h.create({"class":"danger",content:"Can not place order now"})}}]),angular.module("restaurantApp").controller("CookingCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("restaurantApp").controller("SandboxCtrl",["$scope","foodService",function(a,b){b.getAllFood().then(function(a){console.log(a)})}]),angular.module("restaurantApp").controller("LoginCtrl",["$scope","Restangular","$location","userService","ngToast",function(a,b,c,d,e){a.user={username:"",password:""},a.getSession=function(){console.log(d.getSessionToken())},a.doLogOut=function(){d.logout(),d.setSessionToken(null)},a.doSubmit=function(){d.login(a.user.username,a.user.password).then(function(a){console.log(a.data),d.setSessionToken(a.data.sessionToken),d.setUserName(a.data.username),d.setUserID(a.data.objectId),console.log("Yay!!"),e.create({content:"<label>Login Succesfull</label><br><span>Going back to home page</span>"}),c.path("#/")},function(){})}}]),angular.module("restaurantApp").factory("userService",["Restangular","localStorageService",function(a,b){function c(){return b.get("token")}function d(a){b.set("token",a)}function e(){return b.get("username")}function f(a){b.set("username",a)}function g(a){b.set("userID",a)}function h(){return b.get("userID")}function i(){return null!==b.get("token")?!0:!1}function j(){b.clearAll()}function k(a,b){return l.get("?username="+a+"&password="+b)}var l=a.all("login"),m={isLogin:i,logout:j,login:k,getSessionToken:c,setSessionToken:d,getUserID:h,setUserID:g,getUserName:e,setUserName:f};return m}]),angular.module("restaurantApp").service("foodService",["Restangular","$q",function(a,b){var c=a.all("classes/food"),d=a.all("users"),e=a.all("classes/photo"),f=function(a){return c.get(a)},g=function(a){return d.get(a)},h=function(a){var c=[];return angular.forEach(a,function(a){c.push(i(a))}),b.all(c)},i=function(a){return e.get(a).then(function(a){return a.data})},j=function(a){return e.get(a).then(function(a){return a.data.img.url})},k=function(a){return f(a).then(function(a){return n=a.data,i(a.data.photos[0]).then(function(a){n.thumb=a}),n})},l=function(){return a.all("classes/food").getList().then(function(a){var b=a.data,c=0;return angular.forEach(b,function(a){a.id=c,a.title=a.name,a.latitude=a.location.latitude,a.longitude=a.location.longitude,j(a.photos[0]).then(function(b){a.thumb=b,a.options={}}),c++}),b})},m=function(a){return f(a).then(function(a){n=a.data,n.photoList=[],n.cookerinfo={},n.serveList=[];for(var b=1;b<n.numberOfServe+1;b++)n.serveList.push({amount:b,total:b*n.price});return g(a.data.cooker.objectId).then(function(a){n.cookerinfo=a.data}),h(a.data.photos).then(function(a){n.photoList=a}),n})},n={buildCompledFood:m,getFoodAndThumbnail:k,getAllFood:l};return n}]);
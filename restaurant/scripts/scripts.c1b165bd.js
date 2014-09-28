"use strict";angular.module("restaurantApp",["ngRoute","ngAnimate","ngCookies","ngResource","ngSanitize","ngTouch","google-maps","FBAngular","angular-gestures","angular-loading-bar","mobile-angular-ui","restangular","ui.router","ui.select","ngToast","LocalStorageModule","angularFileUpload","timer","geolocation","ui.bootstrap","ui.bootstrap.datetimepicker"]).config(["$routeProvider","cfpLoadingBarProvider","RestangularProvider","uiSelectConfig",function(a,b,c,d){b.includeSpinner=!1,d.theme="selectize",c.setBaseUrl("https://api.parse.com/1/"),c.setDefaultHeaders({"X-Parse-Application-Id":"dCmrudTKTJFxZAZNMoFjolAutEpwrCDMX91tzGLg","X-Parse-REST-API-Key":"MgOlryPflpjonYxpj2DvK9OPbbGc4xeFbQ4Np2o0","Content-Type":"application/json"}),c.setRestangularFields({}),c.setFullResponse(!0),c.setResponseExtractor(function(a,b){var c;switch(b){case"getList":c=a.results;break;default:c=a}return c}),a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/dining",{templateUrl:"views/map.html",controller:"MapCtrl"}).when("/store",{templateUrl:"views/store.html",controller:"StoreCtrl"}).when("/store/:dta",{templateUrl:"views/store.html",controller:"StoreCtrl"}).when("/cooker",{templateUrl:"views/cooking.html",controller:"CookingCtrl"}).when("/sandbox",{templateUrl:"views/sandbox.html",controller:"SandboxCtrl"}).when("/login",{templateUrl:"views/login.html",controller:"LoginCtrl"}).when("/sandbox",{templateUrl:"views/sandbox.html",controller:"SandboxCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("restaurantApp").controller("MainCtrl",["$scope","$cookieStore","userService",function(a,b,c){console.log(b),a.userName=c.getUserName(),console.log(c.getUserName())}]),angular.module("restaurantApp").controller("MapCtrl",["$scope","$http","$location","foodService","geolocation",function(a,b,c,d,e){e.getLocation().then(function(b){console.log(b),a.map.center.latitude=b.coords.latitude,a.map.center.longitude=b.coords.longitude}),d.getAllFood().then(function(b){a.markers=b,console.log(a.markers)}),a.map={control:{},center:{latitude:-27.5000427,longitude:153.00654570000006},zoom:14,draggable:!0,options:{disableDefaultUI:!0}},a.zoomToFood=function(b,c){console.log("zoming"),a.map.zoom=17,a.map.center.latitude=b,a.map.center.longitude=c},a.markersEvents={click:function(b,d,e){e.$id&&(e=e.coords),c.path("/store/"+e.objectId),a.$apply()}}}]),angular.module("restaurantApp").controller("StoreCtrl",["$scope","$routeParams","$location","userService","$rootScope","foodService","Restangular","ngToast",function(a,b,c,d,e,f,g,h){var i=g.all("classes/order"),j=b.dta;f.buildCompledFood(j).then(function(b){a.thisFood=b}),a.buy=function(){e.toggle("myOverlay","on")},a.total=function(a,b){return a*b};var k=function(a,b){var c={__type:"Pointer",className:a,objectId:b};return c};a.confirm=function(){var b=g.one("classes/food",a.thisFood.objectId);b.numberOfServe=a.thisFood.numberOfServe-a.thisFood.serveList.selected.amount,console.log(b.numberOfServe),console.log(d.isLogin()),b.numberOfServe>=0&&d.isLogin()&&null!==d.getUserID()?(a.transaction.food=k("food",a.thisFood.objectId),a.transaction.customer=k("_User",d.getUserID()),a.transaction.serve=a.transaction.selectOptions.selected.amount,i.post(angular.toJson(a.transaction)).then(function(){h.create({content:"<p>Order placed</p>"}),e.toggle("myOverlay","off")},function(){h.create({"class":"danger",content:"Cannot place order at the moment"})}),b.put().then(function(a){console.log(a),h.create({content:"Order place sucessfully"}),c.path("dining"),e.toggle("myOverlay","off")},function(){h.create({content:"Problem with order"}),e.toggle("myOverlay","off")})):h.create({"class":"danger",content:"Can not place order now"})}}]),angular.module("restaurantApp").controller("CookingCtrl",["$scope","userService","foodService","addressService",function(a,b,c,d){a.food={},a.food.numberOfServe=20,a.food.cooker=b.getUserPointer(),d.getCurrentAddress().then(function(b){console.log(b.decodeAddress),console.log(b),a.food.location=e(b.coords.latitude,b.coords.longitude),b.decodeAddress&&(a.food.address=b.decodeAddress[0].formatted_address)});var e=function(a,b){return{__type:"GeoPoint",latitude:a,longitude:b}};a.onTimeSet=function(b){var c={__type:"Date",iso:b};console.log(c),a.food.readyTime=c},a.selling=function(b){a.food.photos=a.fileLinks,console.log(b),c.saleFood(b)}}]),angular.module("restaurantApp").controller("SandboxCtrl",["$scope","addressService",function(a,b){b.getCurrentAddress().then(function(b){console.log(b),a.data=b})}]),angular.module("restaurantApp").controller("LoginCtrl",["$scope","Restangular","$location","userService","ngToast",function(a,b,c,d,e){a.user={username:"",password:""},a.getSession=function(){console.log(d.getSessionToken())},a.doLogOut=function(){d.logout(),d.setSessionToken(null)},a.doSubmit=function(){d.login(a.user.username,a.user.password).then(function(a){console.log(a.data),d.setSessionToken(a.data.sessionToken),d.setUserName(a.data.username),d.setUserID(a.data.objectId),e.create({content:"<label>Login Succesfull</label><br><span>Going back to home page</span>"}),c.path("#/")},function(){})}}]),angular.module("restaurantApp").factory("userService",["Restangular","localStorageService",function(a,b){function c(){return b.get("token")}function d(a){b.set("token",a)}function e(){return b.get("username")}function f(a){b.set("username",a)}function g(a){b.set("userID",a)}function h(){return b.get("userID")}function i(){return{__type:"Pointer",className:"_User",objectId:b.get("userID")}}function j(){return null!==b.get("token")?!0:!1}function k(){b.clearAll()}function l(a,b){return m.get("?username="+a+"&password="+b)}var m=a.all("login"),n={isLogin:j,logout:k,login:l,getSessionToken:c,setSessionToken:d,getUserID:h,setUserID:g,getUserName:e,setUserName:f,getUserPointer:i};return n}]),angular.module("restaurantApp").service("foodService",["Restangular","$q",function(a,b){var c=a.all("classes/food"),d=a.all("users"),e=a.all("classes/photo"),f=function(a){return c.get(a)},g=function(a){return d.get(a)},h=function(a){var c=[];return angular.forEach(a,function(a){c.push(i(a))}),b.all(c)},i=function(a){return e.get(a).then(function(a){return a.data})},j=function(a){return f(a).then(function(a){return n=a.data,a.data.photos[0]&&i(a.data.photos[0]).then(function(a){n.thumb=a}),n})},k=function(){return a.all("classes/food").getList().then(function(a){var b=a.data,c=0;return angular.forEach(b,function(a){console.log(a),a.id=c,a.title=a.name,a.latitude=a.location.latitude,a.longitude=a.location.longitude,a.thumb=a.photos[0],a.options={icon:"images/tip-01.png",labelContent:a.name,labelClass:"labels-icon",labelAnchor:"6 31"},c++}),b})},l=function(a){return f(a).then(function(a){n=a.data,n.photoList=[],n.cookerinfo={},n.serveList=[];for(var b=1;b<n.numberOfServe+1;b++)n.serveList.push({amount:b,total:b*n.price});return g(a.data.cooker.objectId).then(function(a){n.cookerinfo=a.data}),n})},m=function(a){c.post(a).then(function(a){console.log(a)})},n={queryPhoto:i,queryPhotos:h,buildCompledFood:l,getFoodAndThumbnail:j,getAllFood:k,saleFood:m};return n}]),angular.module("restaurantApp").directive("fileUpload",["$http",function(a){return{template:"<div></div>",restrict:"EA",link:function(b,c){b.fileLinks=[],b.status="ready",c.html('<input type="file" class="custom-file-input" name="file" ng-model="scope.fileLinks" onchange="angular.element(this).scope().uploadFile(this.files)" />'),b.uploadFile=function(c){b.status="uploading",a.post("https://api.parse.com/1/files/"+c[0].name,c[0],{withCredentials:!1,headers:{"X-Parse-Application-Id":"dCmrudTKTJFxZAZNMoFjolAutEpwrCDMX91tzGLg","X-Parse-REST-API-Key":"MgOlryPflpjonYxpj2DvK9OPbbGc4xeFbQ4Np2o0","Content-Type":"image/jpeg"},transformRequest:angular.identity}).then(function(a){console.log(a),b.fileLinks.push(a.data.url),console.log(b.fileLinks)})}}}}]),angular.module("restaurantApp").service("addressService",["$http","$q","geolocation",function(a,b,c){var d="http://maps.googleapis.com/maps/api/geocode/json?latlng=",e=function(){return c.getLocation().then(function(a){return a})},f=function(b,c){return a.get(d+b+","+c).then(function(a){return a.data.results})},g=function(){return e().then(function(a){return h=a,f(a.coords.latitude,a.coords.longitude).then(function(a){return h.decodeAddress=a,h})})},h={addressFromLatLng:f,getCurrentAddress:g,getCurrentLocation:e};return h}]);
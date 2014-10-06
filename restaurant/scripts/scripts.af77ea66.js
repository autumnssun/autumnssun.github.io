"use strict";angular.module("restaurantApp",["ngRoute","ngAnimate","ngCookies","ngResource","ngSanitize","ngTouch","google-maps","FBAngular","angular-gestures","angular-loading-bar","mobile-angular-ui","restangular","ui.router","ui.select","ngToast","LocalStorageModule","angularFileUpload","timer","geolocation","ui.bootstrap","ui.bootstrap.datetimepicker","mgcrea.ngStrap","pageslide-directive"]).config(["$routeProvider","cfpLoadingBarProvider","RestangularProvider","uiSelectConfig",function(a,b,c,d){b.includeSpinner=!1,d.theme="selectize",c.setBaseUrl("https://api.parse.com/1/"),c.setDefaultHeaders({"X-Parse-Application-Id":"dCmrudTKTJFxZAZNMoFjolAutEpwrCDMX91tzGLg","X-Parse-REST-API-Key":"MgOlryPflpjonYxpj2DvK9OPbbGc4xeFbQ4Np2o0","Content-Type":"application/json"}),c.setRestangularFields({}),c.setFullResponse(!0),c.setResponseExtractor(function(a,b){var c;switch(b){case"getList":c=a.results;break;default:c=a}return c}),a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/dining",{templateUrl:"views/map.html",controller:"MapCtrl"}).when("/store",{templateUrl:"views/store.html",controller:"StoreCtrl"}).when("/store/:dta",{templateUrl:"views/store.html",controller:"StoreCtrl"}).when("/cooker",{templateUrl:"views/cooking.html",controller:"CookingCtrl"}).when("/sandbox",{templateUrl:"views/sandbox.html",controller:"SandboxCtrl"}).when("/login",{templateUrl:"views/login.html",controller:"LoginCtrl"}).when("/sandbox",{templateUrl:"views/sandbox.html",controller:"SandboxCtrl"}).when("/userProfile",{templateUrl:"views/userprofile.html",controller:"UserprofileCtrl"}).when("/register",{templateUrl:"views/register.html",controller:"RegisterCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("restaurantApp").controller("MainCtrl",["$scope","$cookieStore","userService",function(a,b,c){console.log(b),a.userName=c.getUserName(),console.log(c.getUserName())}]),angular.module("restaurantApp").controller("MapCtrl",["$scope","$http","$location","foodService","geolocation",function(a,b,c,d,e){a.foodNotAvailable=!0,e.getLocation().then(function(b){a.map.center.latitude=b.coords.latitude,a.map.center.longitude=b.coords.longitude}),d.getAllFood().then(function(b){a.markers=b,a.predicate="-longitude",a.foodNotAvailable=!1,console.log(a.markers)}),a.map={control:{},center:{latitude:-27.5000427,longitude:153.00654570000006},zoom:14,draggable:!0,options:{disableDefaultUI:!0}},a.zoomToFood=function(b,c){console.log("zoming"),a.map.zoom=17,a.map.center.latitude=b,a.map.center.longitude=c},a.markersEvents={click:function(b,d,e){e.$id&&(e=e.coords),c.path("/store/"+e.objectId),a.$apply()}}}]),angular.module("restaurantApp").controller("StoreCtrl",["$scope","$routeParams","$location","userService","$rootScope","foodService","Restangular","ngToast",function(a,b,c,d,e,f,g,h){var i=g.all("classes/order"),j=b.dta;a.transaction={},a.thisFood={},a.thisFood.readyTime={},a.thisFood.readyTime.iso="34123",a.showCashier=!0,f.buildCompledFood(j).then(function(b){a.thisFood=b,console.log(b)}),a.gotoCashier=function(){a.showCashier=!a.showCashier},a.billTotal=function(){return a.thisFood.serveList&&a.thisFood.serveList.selected&&a.thisFood.serveList.selected.amount?a.thisFood.serveList.selected.amount*a.thisFood.price:0},a.total=function(a,b){return a*b};var k=function(a,b){var c={__type:"Pointer",className:a,objectId:b};return console.log(c),c};a.confirm=function(){var b=g.one("classes/food",a.thisFood.objectId);b.numberOfServe=a.thisFood.numberOfServe-a.thisFood.serveList.selected.amount,console.log(b.numberOfServe),console.log(d.isLogin()),b.numberOfServe>=0&&d.isLogin()&&null!==d.getUserID()?(a.transaction.food=k("food",a.thisFood.objectId),a.transaction.customer=k("_User",d.getUserID()),a.transaction.serve=a.thisFood.serveList.selected.amount,i.post(angular.toJson(a.transaction)).then(function(){h.create({content:"<p>Thank you for odering the food</p>"}),e.toggle("myOverlay","off")},function(){h.create({"class":"danger",content:"Cannot place order at the moment"})}),b.put().then(function(a){console.log(a),h.create({content:"Order place sucessfully"}),c.path("dining"),e.toggle("myOverlay","off")},function(){h.create({content:"Problem with order"}),e.toggle("myOverlay","off")})):h.create({"class":"danger",content:"Can not place order now"})}}]),angular.module("restaurantApp").controller("CookingCtrl",["$scope","userService","foodService","addressService","$location",function(a,b,c,d,e){b.isLogin()||e.path("login"),a.food={},a.food.cooker=b.getUserPointer(),d.getCurrentAddress().then(function(b){console.log(b.decodeAddress[0].formatted_address),a.food.location=f(b.coords.latitude,b.coords.longitude),a.food.address=b.decodeAddress[0].formatted_address});var f=function(a,b){return{__type:"GeoPoint",latitude:a,longitude:b}},g=function(a){return{__type:"Date",iso:a}};a.selling=function(b){a.food.photos=a.fileLinks,a.food.readyTime=g(a.sharedDate),null!==a.food.photos&&null!==a.food.readyTime&&null!==a.food.location&&a.food.numberOfServe>0?(c.saleFood(b),e.path("dining")):console.log("can not sell missing information")}}]),angular.module("restaurantApp").controller("SandboxCtrl",function(){}),angular.module("restaurantApp").controller("LoginCtrl",["$scope","Restangular","$location","userService","ngToast",function(a,b,c,d,e){d.isLogin()&&c.path("userProfile"),a.user={username:"",password:""},a.getSession=function(){console.log(d.getSessionToken())},a.doLogOut=function(){d.logout(),d.setSessionToken(null)},a.doSubmit=function(){d.login(a.user.username,a.user.password).then(function(a){console.log(a.data),d.setSessionToken(a.data.sessionToken),d.setUserName(a.data.username),d.setUserID(a.data.objectId),e.create({content:"<label>Login Succesfull</label><br><span>Going back to home page</span>"}),c.path("#/")},function(){})}}]),angular.module("restaurantApp").factory("userService",["Restangular","localStorageService",function(a,b){function c(a){b.set("time",a)}function d(){return b.get("time")}function e(){return b.get("token")}function f(a){b.set("token",a)}function g(){return b.get("username")}function h(a){b.set("username",a)}function i(a){b.set("userID",a)}function j(){return b.get("userID")}function k(){return{__type:"Pointer",className:"_User",objectId:b.get("userID")}}function l(){return null!==b.get("token")?!0:!1}function m(){return r.get(j()).then(function(a){return console.log(a),a.data})}function n(){b.clearAll()}function o(a,b){return q.get("?username="+a+"&password="+b)}function p(a){return n(),r.post(a)}var q=a.all("login"),r=a.all("users"),s={setTimeCache:c,getTimeCache:d,registerUser:p,getCurrentUserData:m,isLogin:l,logout:n,login:o,getSessionToken:e,setSessionToken:f,getUserID:j,setUserID:i,getUserName:g,setUserName:h,getUserPointer:k};return s}]),angular.module("restaurantApp").service("foodService",["Restangular","$q","addressService","$location",function(a,b,c,d){var e,f=a.all("classes/food"),g=a.all("users"),h=a.all("classes/photo");c.getCurrentLocation().then(function(a){console.log(a),e=a});var i=function(a){return f.get(a)},j=function(a){return g.get(a)},k=function(a){var c=[];return angular.forEach(a,function(a){c.push(l(a))}),b.all(c)},l=function(a){return h.get(a).then(function(a){return a.data})},m=function(a){return i(a).then(function(a){return q=a.data,q.thumb=a.data.photos[0],q})},n=function(){return a.all("classes/food").getList().then(function(a){var b=a.data,c=0;return angular.forEach(b,function(a){a.id=c,a.title=a.name,a.latitude=a.location.latitude,a.longitude=a.location.longitude,a.thumb=a.photos[0],a.options={icon:"images/tip-01.png",labelContent:a.name,labelClass:"labels-icon",labelAnchor:"6 31"},c++}),b.sortbyKey="longitude",b})},o=function(a){return i(a).then(function(a){q=a.data,q.photoList=[],q.cookerinfo={},q.serveList=[];for(var b=1;b<q.numberOfServe+1;b++)q.serveList.push({amount:b,total:b*q.price});return j(a.data.cooker.objectId).then(function(a){q.cookerinfo=a.data}),0!==a.data.photos.length&&(q.photoList=a.data.photos),q},function(){d.path("dining")})},p=function(a){f.post(a).then(function(a){console.log(a)})},q={queryPhotos:k,buildCompledFood:o,getFoodAndThumbnail:m,getAllFood:n,saleFood:p};return q}]),angular.module("restaurantApp").service("addressService",["$http","$q","geolocation",function(a,b,c){var d="http://maps.googleapis.com/maps/api/geocode/json?latlng=",e=function(){return c.getLocation().then(function(a){return a})},f=function(b,c){return a.get(d+b+","+c).then(function(a){return a.data.results})},g=function(){return e().then(function(a){return h=a,f(a.coords.latitude,a.coords.longitude).then(function(a){return h.decodeAddress=a,h})})},h={addressFromLatLng:f,getCurrentAddress:g,getCurrentLocation:e};return h}]),angular.module("restaurantApp").directive("fileUpload",["$http",function(a){var b='<div class="fileUpload"><span><i class="glyphicon glyphicon-camera"/><br/>Add Photo</span><input type="file"  class="upload" name="file" ng-model="scope.fileLinks" onchange="angular.element(this).scope().uploadFile(this.files)" /></div>';return{template:"<div></div>",restrict:"EA",link:function(c,d){c.fileLinks=[],c.overLayOn=!1,d.html(b),c.uploadFile=function(b){c.overLayOn=!0,a.post("https://api.parse.com/1/files/"+b[0].name,b[0],{withCredentials:!1,headers:{"X-Parse-Application-Id":"dCmrudTKTJFxZAZNMoFjolAutEpwrCDMX91tzGLg","X-Parse-REST-API-Key":"MgOlryPflpjonYxpj2DvK9OPbbGc4xeFbQ4Np2o0","Content-Type":"image/jpeg"}}).then(function(a){c.overLayOn=!1,c.fileLinks.push(a.data.url)})}}}}]),angular.module("restaurantApp").controller("UserprofileCtrl",["$scope","$location","userService",function(a,b,c){c.isLogin()?c.getCurrentUserData().then(function(b){a.userInfo=b,console.log(b)}):b.path("login"),a.doLogOut=function(){c.logout(),c.setSessionToken(null),b.path("login")}}]),angular.module("restaurantApp").controller("RegisterCtrl",["$scope","ngToast","userService","$location",function(a,b,c,d){a.doSubmit=function(a){console.log(a),c.registerUser(a).then(function(e){console.log(e),b.create({content:"<label> User created</label><br><span>Going back to your profile page</span>"}),c.setSessionToken(e.data.sessionToken),c.setUserName(a.username),c.setUserID(e.data.objectId),d.path("userprofile")})}}]);
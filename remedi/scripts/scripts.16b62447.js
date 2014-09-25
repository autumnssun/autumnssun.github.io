"use strict";angular.module("newRemediApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","angular-loading-bar","duParallax","ui.calendar","restangular","LocalStorageModule","ngToast","ui.bootstrap.datetimepicker"]).config(["$routeProvider","RestangularProvider",function(a,b){b.setBaseUrl("https://api.parse.com/1/"),b.setDefaultHeaders({"X-Parse-Application-Id":"DRhAeaJerM56gyGw0Xd6COyMUUIb82NEL0wTWWR3","X-Parse-REST-API-Key":"wfTXU85OSRi2kIb54VEjxv190R9i3vRweMm1GLF4","Content-Type":"application/json"}),b.setRestangularFields({}),b.setFullResponse(!0),b.setResponseExtractor(function(a,b){var c;switch(b){case"getList":c=a.results;break;default:c=a}return c}),a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).when("/login",{templateUrl:"views/login.html",controller:"LoginCtrl"}).when("/bookings",{templateUrl:"views/bookings.html",controller:"BookingsCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("newRemediApp").controller("MainCtrl",["$scope","parallaxHelper","userService",function(a,b,c){a.background=b.createAnimator(-.5),a.foreground=b.createAnimator(-.1,-50),a.userData=c.getUserName()}]),angular.module("newRemediApp").controller("AboutCtrl",["$scope","userService","bookingService",function(a,b,c){b.getUserPointer(),a.appointment={},a.appointment.booker=b.getUserPointer(),a.onTimeSet=function(b){var c={__type:"Date",iso:b};a.appointment.bookingTime=c},a.book=function(a){c.bookAppointment(a),console.log(a)}}]),angular.module("newRemediApp").service("bookingService",["Restangular","ngToast","$location",function(a,b,c){var d=a.all("classes/appointments"),e=function(a){console.log(a),d.post(a).then(function(){b.create({content:"<label>Booking Succesfull</label><br><span>Going to booking pages</span>"}),c.path("bookings")})},f=function(){return d.getList().then(function(a){var b=a.data;return b})},g={getAlBooking:f,bookAppointment:e};return g}]),angular.module("newRemediApp").service("userService",["Restangular","localStorageService",function(a,b){function c(){return b.get("token")}function d(a){b.set("token",a)}function e(){return b.get("username")}function f(a){b.set("username",a)}function g(a){b.set("userID",a)}function h(){return b.get("userID")}function i(){return{__type:"Pointer",className:"_User",objectId:b.get("userID")}}function j(){return null!==b.get("token")?!0:!1}function k(){b.clearAll()}function l(a,b){return n.get("?username="+a+"&password="+b)}function m(a){return o.get(a).then(function(a){return console.log(a),a.data.username})}var n=a.all("login"),o=a.all("users"),p={getUserInfoWithID:m,isLogin:j,logout:k,login:l,getSessionToken:c,setSessionToken:d,getUserID:h,setUserID:g,getUserName:e,setUserName:f,getUserPointer:i};return p}]),angular.module("newRemediApp").controller("LoginCtrl",["$scope","userService","$location","ngToast",function(a,b,c,d){a.user={username:"",password:""},a.doSubmit=function(){b.login(a.user.username,a.user.password).then(function(a){console.log(a.data),b.setSessionToken(a.data.sessionToken),b.setUserName(a.data.username),b.setUserID(a.data.objectId),d.create({content:"<label>Login Succesfull</label><br><span>Going back to making an appintment page</span>"}),c.path("about")},function(){})}}]),angular.module("newRemediApp").controller("BookingsCtrl",["$scope","bookingService","userService",function(a,b,c){a.currentuser=c.getUserName(),a.currentuserID=c.getUserID(),b.getAlBooking().then(function(b){a.bookinglist=b,angular.forEach(b,function(b,d){c.getUserInfoWithID(b.booker.objectId).then(function(b){a.bookinglist[d].bookerName=b,a.bookinglist[d].booker.objectId===a.currentuserID?(console.log("find"),a.bookinglist[d].hideme=!0):a.bookinglist[d].hideme=!1})})})}]);
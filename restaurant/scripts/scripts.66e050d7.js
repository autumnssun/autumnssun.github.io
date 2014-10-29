"use strict";angular.module("restaurantApp",["ngRoute","ngAnimate","ngCookies","ngResource","ngSanitize","ngTouch","google-maps","FBAngular","angular-gestures","angular-loading-bar","mobile-angular-ui","restangular","ui.router","ui.select","ngToast","LocalStorageModule","angularFileUpload","timer","geolocation","ui.bootstrap","ui.bootstrap.datetimepicker","mgcrea.ngStrap","pageslide-directive","angulartics","angulartics.google.analytics","angular.filter"]).config(["$routeProvider","cfpLoadingBarProvider","RestangularProvider","uiSelectConfig",function(a,b,c,d){b.includeSpinner=!1,d.theme="selectize",c.setBaseUrl("https://api.parse.com/1/"),c.setDefaultHeaders({"X-Parse-Application-Id":"dCmrudTKTJFxZAZNMoFjolAutEpwrCDMX91tzGLg","X-Parse-REST-API-Key":"MgOlryPflpjonYxpj2DvK9OPbbGc4xeFbQ4Np2o0","Content-Type":"application/json"}),c.setRestangularFields({id:"objectId"}),c.setFullResponse(!0),c.setResponseExtractor(function(a,b){var c;switch(b){case"getList":c=a.results;break;default:c=a}return c}),a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/dining",{templateUrl:"views/map.html",controller:"MapCtrl"}).when("/store",{templateUrl:"views/store.html",controller:"StoreCtrl"}).when("/store/:dta",{templateUrl:"views/store.html",controller:"StoreCtrl"}).when("/cooker",{templateUrl:"views/cooking.html",controller:"CookingCtrl"}).when("/sandbox",{templateUrl:"views/sandbox.html",controller:"SandboxCtrl"}).when("/login",{templateUrl:"views/login.html",controller:"LoginCtrl"}).when("/sandbox",{templateUrl:"views/sandbox.html",controller:"SandboxCtrl"}).when("/userProfile",{templateUrl:"views/userprofile.html",controller:"UserprofileCtrl"}).when("/register",{templateUrl:"views/register.html",controller:"RegisterCtrl"}).when("/diningHistory",{templateUrl:"views/dininghistory.html",controller:"DininghistoryCtrl"}).when("/foodPortfolio",{templateUrl:"views/foodportfolio.html",controller:"FoodportfolioCtrl"}).when("/foodPortfolioDetail",{templateUrl:"views/foodportfoliodetail.html",controller:"FoodportfoliodetailCtrl"}).when("/foodPortfolioDetail/:dta",{templateUrl:"views/foodportfoliodetail.html",controller:"FoodportfoliodetailCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("restaurantApp").controller("MainCtrl",["$scope","$cookieStore","userService",function(a,b,c){console.log(b),a.userName=c.getUserName(),console.log(c.getUserName())}]),angular.module("restaurantApp").controller("MapCtrl",["$scope","$http","$location","foodService","geolocation",function(a,b,c,d,e){a.sortbylist=[{display:"Cheap 1st",model:"price"},{display:"Cheap lasst",model:"price"}],a.orderBy_tag={display:"Cheap 1st",model:"price"},a.foodNotAvailable=!0,e.getLocation().then(function(b){a.map.center.latitude=b.coords.latitude,a.map.center.longitude=b.coords.longitude,a.myloc={id:0,coords:{latitude:a.map.center.latitude,longitude:a.map.center.longitude}},console.log(a.myloc)}),d.getAllFood().then(function(b){a.markers=b,a.foodNotAvailable=!1,console.log(a.markers)}),a.map={control:{},center:{latitude:-27.5000427,longitude:153.00654570000006},zoom:14,draggable:!0,options:{disableDefaultUI:!0}},a.changeOder=function(b){a.orderBy_tag=b},a.zoomToFood=function(b,c){console.log("zoming"),a.map.zoom=17,a.map.center.latitude=b,a.map.center.longitude=c},a.markersEvents={click:function(b,d,e){e.$id&&(e=e.coords),c.path("/store/"+e.objectId),a.$apply()}}}]),angular.module("restaurantApp").controller("StoreCtrl",["$scope","$routeParams","$location","userService","$rootScope","foodService","Restangular","ngToast",function(a,b,c,d,e,f,g,h){var i=g.all("classes/order"),j=b.dta;a.transaction={},a.thisFood={},a.thisFood.readyTime={},a.thisFood.readyTime.iso="34123083",a.showCashier=!1,f.buildCompledFood(j).then(function(b){a.thisFood=b,console.log(b)}),a.gotoCashier=function(){a.showCashier=!a.showCashier},a.billTotal=function(){return a.thisFood.serveList&&a.thisFood.serveList.selected&&a.thisFood.serveList.selected.amount?a.thisFood.serveList.selected.amount*a.thisFood.price:0},a.total=function(a,b){return a*b};var k=function(a,b){var c={__type:"Pointer",className:a,objectId:b};return console.log(c),c};a.confirm=function(){var b=g.one("classes/food",a.thisFood.objectId);b.numberOfServe=a.thisFood.numberOfServe-a.thisFood.serveList.selected.amount,b.numberOfServe>=0&&d.isLogin()&&null!==d.getUserID()?(a.transaction.food=k("food",a.thisFood.objectId),a.transaction.customer=k("_User",d.getUserID()),a.transaction.serve=a.thisFood.serveList.selected.amount,i.post(angular.toJson(a.transaction)).then(function(){h.create({content:"<p>Thank you for odering the food</p>"}),e.toggle("myOverlay","off")},function(){h.create({"class":"danger",content:"Cannot place order at the moment"})}),b.put().then(function(a){console.log(a),h.create({content:"Order place sucessfully"}),c.path("dining"),e.toggle("myOverlay","off")},function(){h.create({content:"Problem with order"}),e.toggle("myOverlay","off")})):h.create({"class":"danger",content:"Can not place order now"})}}]),angular.module("restaurantApp").controller("CookingCtrl",["$scope","userService","foodService","addressService","$location","ngToast",function(a,b,c,d,e,f){b.isLogin()||e.path("login"),a.food={},a.food.cooker=b.getUserPointer(),d.getCurrentAddress().then(function(b){console.log(b.decodeAddress[0].formatted_address),a.food.location=g(b.coords.latitude,b.coords.longitude),a.food.address=b.decodeAddress[0].formatted_address});var g=function(a,b){return{__type:"GeoPoint",latitude:a,longitude:b}},h=function(a){return{__type:"Date",iso:a}};a.selling=function(b){a.food.photos=a.fileLinks,a.food.readyTime=h(a.sharedDate),a.food.active=!0,a.sellingFood.$valid?(c.saleFood(b),e.path("foodPortfolio")):f.create({content:"<label> Missing information </label>","class":"danger"})}}]),angular.module("restaurantApp").controller("SandboxCtrl",["$scope",function(a){a.country={},a.countries=[{name:"Afghanistan",code:"AF"},{name:"Åland Islands",code:"AX"},{name:"Albania",code:"AL"},{name:"Algeria",code:"DZ"},{name:"American Samoa",code:"AS"},{name:"Andorra",code:"AD"},{name:"Angola",code:"AO"},{name:"Anguilla",code:"AI"},{name:"Antarctica",code:"AQ"},{name:"Antigua and Barbuda",code:"AG"},{name:"Argentina",code:"AR"},{name:"Armenia",code:"AM"},{name:"Aruba",code:"AW"},{name:"Australia",code:"AU"},{name:"Austria",code:"AT"},{name:"Azerbaijan",code:"AZ"},{name:"Bahamas",code:"BS"},{name:"Bahrain",code:"BH"},{name:"Bangladesh",code:"BD"},{name:"Barbados",code:"BB"},{name:"Belarus",code:"BY"},{name:"Belgium",code:"BE"},{name:"Belize",code:"BZ"},{name:"Benin",code:"BJ"},{name:"Bermuda",code:"BM"},{name:"Bhutan",code:"BT"},{name:"Bolivia",code:"BO"},{name:"Bosnia and Herzegovina",code:"BA"},{name:"Botswana",code:"BW"},{name:"Bouvet Island",code:"BV"},{name:"Brazil",code:"BR"},{name:"British Indian Ocean Territory",code:"IO"},{name:"Brunei Darussalam",code:"BN"},{name:"Bulgaria",code:"BG"},{name:"Burkina Faso",code:"BF"},{name:"Burundi",code:"BI"},{name:"Cambodia",code:"KH"},{name:"Cameroon",code:"CM"},{name:"Canada",code:"CA"},{name:"Cape Verde",code:"CV"},{name:"Cayman Islands",code:"KY"},{name:"Central African Republic",code:"CF"},{name:"Chad",code:"TD"},{name:"Chile",code:"CL"},{name:"China",code:"CN"},{name:"Christmas Island",code:"CX"},{name:"Cocos (Keeling) Islands",code:"CC"},{name:"Colombia",code:"CO"},{name:"Comoros",code:"KM"},{name:"Congo",code:"CG"},{name:"Congo, The Democratic Republic of the",code:"CD"},{name:"Cook Islands",code:"CK"},{name:"Costa Rica",code:"CR"},{name:"Cote D'Ivoire",code:"CI"},{name:"Croatia",code:"HR"},{name:"Cuba",code:"CU"},{name:"Cyprus",code:"CY"},{name:"Czech Republic",code:"CZ"},{name:"Denmark",code:"DK"},{name:"Djibouti",code:"DJ"},{name:"Dominica",code:"DM"},{name:"Dominican Republic",code:"DO"},{name:"Ecuador",code:"EC"},{name:"Egypt",code:"EG"},{name:"El Salvador",code:"SV"},{name:"Equatorial Guinea",code:"GQ"},{name:"Eritrea",code:"ER"},{name:"Estonia",code:"EE"},{name:"Ethiopia",code:"ET"},{name:"Falkland Islands (Malvinas)",code:"FK"},{name:"Faroe Islands",code:"FO"},{name:"Fiji",code:"FJ"},{name:"Finland",code:"FI"},{name:"France",code:"FR"},{name:"French Guiana",code:"GF"},{name:"French Polynesia",code:"PF"},{name:"French Southern Territories",code:"TF"},{name:"Gabon",code:"GA"},{name:"Gambia",code:"GM"},{name:"Georgia",code:"GE"},{name:"Germany",code:"DE"},{name:"Ghana",code:"GH"},{name:"Gibraltar",code:"GI"},{name:"Greece",code:"GR"},{name:"Greenland",code:"GL"},{name:"Grenada",code:"GD"},{name:"Guadeloupe",code:"GP"},{name:"Guam",code:"GU"},{name:"Guatemala",code:"GT"},{name:"Guernsey",code:"GG"},{name:"Guinea",code:"GN"},{name:"Guinea-Bissau",code:"GW"},{name:"Guyana",code:"GY"},{name:"Haiti",code:"HT"},{name:"Heard Island and Mcdonald Islands",code:"HM"},{name:"Holy See (Vatican City State)",code:"VA"},{name:"Honduras",code:"HN"},{name:"Hong Kong",code:"HK"},{name:"Hungary",code:"HU"},{name:"Iceland",code:"IS"},{name:"India",code:"IN"},{name:"Indonesia",code:"ID"},{name:"Iran, Islamic Republic Of",code:"IR"},{name:"Iraq",code:"IQ"},{name:"Ireland",code:"IE"},{name:"Isle of Man",code:"IM"},{name:"Israel",code:"IL"},{name:"Italy",code:"IT"},{name:"Jamaica",code:"JM"},{name:"Japan",code:"JP"},{name:"Jersey",code:"JE"},{name:"Jordan",code:"JO"},{name:"Kazakhstan",code:"KZ"},{name:"Kenya",code:"KE"},{name:"Kiribati",code:"KI"},{name:"Korea, Democratic People's Republic of",code:"KP"},{name:"Korea, Republic of",code:"KR"},{name:"Kuwait",code:"KW"},{name:"Kyrgyzstan",code:"KG"},{name:"Lao People's Democratic Republic",code:"LA"},{name:"Latvia",code:"LV"},{name:"Lebanon",code:"LB"},{name:"Lesotho",code:"LS"},{name:"Liberia",code:"LR"},{name:"Libyan Arab Jamahiriya",code:"LY"},{name:"Liechtenstein",code:"LI"},{name:"Lithuania",code:"LT"},{name:"Luxembourg",code:"LU"},{name:"Macao",code:"MO"},{name:"Macedonia, The Former Yugoslav Republic of",code:"MK"},{name:"Madagascar",code:"MG"},{name:"Malawi",code:"MW"},{name:"Malaysia",code:"MY"},{name:"Maldives",code:"MV"},{name:"Mali",code:"ML"},{name:"Malta",code:"MT"},{name:"Marshall Islands",code:"MH"},{name:"Martinique",code:"MQ"},{name:"Mauritania",code:"MR"},{name:"Mauritius",code:"MU"},{name:"Mayotte",code:"YT"},{name:"Mexico",code:"MX"},{name:"Micronesia, Federated States of",code:"FM"},{name:"Moldova, Republic of",code:"MD"},{name:"Monaco",code:"MC"},{name:"Mongolia",code:"MN"},{name:"Montserrat",code:"MS"},{name:"Morocco",code:"MA"},{name:"Mozambique",code:"MZ"},{name:"Myanmar",code:"MM"},{name:"Namibia",code:"NA"},{name:"Nauru",code:"NR"},{name:"Nepal",code:"NP"},{name:"Netherlands",code:"NL"},{name:"Netherlands Antilles",code:"AN"},{name:"New Caledonia",code:"NC"},{name:"New Zealand",code:"NZ"},{name:"Nicaragua",code:"NI"},{name:"Niger",code:"NE"},{name:"Nigeria",code:"NG"},{name:"Niue",code:"NU"},{name:"Norfolk Island",code:"NF"},{name:"Northern Mariana Islands",code:"MP"},{name:"Norway",code:"NO"},{name:"Oman",code:"OM"},{name:"Pakistan",code:"PK"},{name:"Palau",code:"PW"},{name:"Palestinian Territory, Occupied",code:"PS"},{name:"Panama",code:"PA"},{name:"Papua New Guinea",code:"PG"},{name:"Paraguay",code:"PY"},{name:"Peru",code:"PE"},{name:"Philippines",code:"PH"},{name:"Pitcairn",code:"PN"},{name:"Poland",code:"PL"},{name:"Portugal",code:"PT"},{name:"Puerto Rico",code:"PR"},{name:"Qatar",code:"QA"},{name:"Reunion",code:"RE"},{name:"Romania",code:"RO"},{name:"Russian Federation",code:"RU"},{name:"Rwanda",code:"RW"},{name:"Saint Helena",code:"SH"},{name:"Saint Kitts and Nevis",code:"KN"},{name:"Saint Lucia",code:"LC"},{name:"Saint Pierre and Miquelon",code:"PM"},{name:"Saint Vincent and the Grenadines",code:"VC"},{name:"Samoa",code:"WS"},{name:"San Marino",code:"SM"},{name:"Sao Tome and Principe",code:"ST"},{name:"Saudi Arabia",code:"SA"},{name:"Senegal",code:"SN"},{name:"Serbia and Montenegro",code:"CS"},{name:"Seychelles",code:"SC"},{name:"Sierra Leone",code:"SL"},{name:"Singapore",code:"SG"},{name:"Slovakia",code:"SK"},{name:"Slovenia",code:"SI"},{name:"Solomon Islands",code:"SB"},{name:"Somalia",code:"SO"},{name:"South Africa",code:"ZA"},{name:"South Georgia and the South Sandwich Islands",code:"GS"},{name:"Spain",code:"ES"},{name:"Sri Lanka",code:"LK"},{name:"Sudan",code:"SD"},{name:"Suriname",code:"SR"},{name:"Svalbard and Jan Mayen",code:"SJ"},{name:"Swaziland",code:"SZ"},{name:"Sweden",code:"SE"},{name:"Switzerland",code:"CH"},{name:"Syrian Arab Republic",code:"SY"},{name:"Taiwan, Province of China",code:"TW"},{name:"Tajikistan",code:"TJ"},{name:"Tanzania, United Republic of",code:"TZ"},{name:"Thailand",code:"TH"},{name:"Timor-Leste",code:"TL"},{name:"Togo",code:"TG"},{name:"Tokelau",code:"TK"},{name:"Tonga",code:"TO"},{name:"Trinidad and Tobago",code:"TT"},{name:"Tunisia",code:"TN"},{name:"Turkey",code:"TR"},{name:"Turkmenistan",code:"TM"},{name:"Turks and Caicos Islands",code:"TC"},{name:"Tuvalu",code:"TV"},{name:"Uganda",code:"UG"},{name:"Ukraine",code:"UA"},{name:"United Arab Emirates",code:"AE"},{name:"United Kingdom",code:"GB"},{name:"United States",code:"US"},{name:"United States Minor Outlying Islands",code:"UM"},{name:"Uruguay",code:"UY"},{name:"Uzbekistan",code:"UZ"},{name:"Vanuatu",code:"VU"},{name:"Venezuela",code:"VE"},{name:"Vietnam",code:"VN"},{name:"Virgin Islands, British",code:"VG"},{name:"Virgin Islands, U.S.",code:"VI"},{name:"Wallis and Futuna",code:"WF"},{name:"Western Sahara",code:"EH"},{name:"Yemen",code:"YE"},{name:"Zambia",code:"ZM"},{name:"Zimbabwe",code:"ZW"}]}]),angular.module("restaurantApp").controller("LoginCtrl",["$scope","Restangular","$location","userService","ngToast",function(a,b,c,d,e){d.isLogin()&&c.path("userProfile"),a.user={username:"",password:""},a.getSession=function(){console.log(d.getSessionToken())},a.doLogOut=function(){d.logout(),d.setSessionToken(null)},a.doSubmit=function(){d.login(a.user.username,a.user.password).then(function(a){console.log(a.data),d.setSessionToken(a.data.sessionToken),d.setUserName(a.data.username),d.setUserID(a.data.objectId),e.create({content:"<label>Login Succesfull</label><br><span>Going back to home page</span>"}),c.path("#/")},function(){})}}]),angular.module("restaurantApp").factory("userService",["Restangular","localStorageService",function(a,b){function c(a){b.set("time",a)}function d(){return b.get("time")}function e(){return b.get("token")}function f(a){b.set("token",a)}function g(){return b.get("username")}function h(a){b.set("username",a)}function i(a){b.set("userID",a)}function j(){return b.get("userID")}function k(){return{__type:"Pointer",className:"_User",objectId:b.get("userID")}}function l(){return null!==b.get("token")?!0:!1}function m(){return s.get(j()).then(function(a){return a.data})}function n(a){return s.get(a).then(function(a){return a.data})}function o(){b.clearAll()}function p(a,b){return r.get("?username="+a+"&password="+b)}function q(a){return o(),s.post(a)}var r=a.all("login"),s=a.all("users"),t={getUserData:n,setTimeCache:c,getTimeCache:d,registerUser:q,getCurrentUserData:m,isLogin:l,logout:o,login:p,getSessionToken:e,setSessionToken:f,getUserID:j,setUserID:i,getUserName:g,setUserName:h,getUserPointer:k};return t}]),angular.module("restaurantApp").service("foodService",["Restangular","$q","addressService","$location",function(a,b,c,d){var e,f=a.all("classes/food"),g=a.all("users"),h=a.all("classes/photo");c.getCurrentLocation().then(function(a){console.log(a),e=a});var i=function(a){return f.get(a)},j=function(a){return g.get(a)},k=function(a){var c=[];return angular.forEach(a,function(a){c.push(l(a))}),b.all(c)},l=function(a){return h.get(a).then(function(a){return a.data})},m=function(a){return i(a).then(function(a){return q=a.data,q.thumb=a.data.photos[0],q})},n=function(){return a.all("classes/food").getList().then(function(a){var b=a.data,c=[],d=0;return angular.forEach(b,function(a){a.active&&(a.id=d,a.title=a.name,a.latitude=a.location.latitude,a.longitude=a.location.longitude,a.thumb=a.photos[0],a.options={icon:"images/tip-01.png",labelContent:a.name,labelClass:"labels-icon",labelAnchor:"6 31"},d++,c.push(a))}),c.sortbyKey="longitude",c})},o=function(a){return i(a).then(function(a){q=a.data,q.photoList=[],q.cookerinfo={},q.serveList=[];for(var b=1;b<q.numberOfServe+1;b++)q.serveList.push({amount:b,total:b*q.price});return j(a.data.cooker.objectId).then(function(a){q.cookerinfo=a.data}),0!==a.data.photos.length&&(q.photoList=a.data.photos),q},function(){d.path("foodPortfolio")})},p=function(a){f.post(a).then(function(a){console.log(a)})},q={queryFood:i,queryPhotos:k,buildCompledFood:o,getFoodAndThumbnail:m,getAllFood:n,saleFood:p};return q}]),angular.module("restaurantApp").service("addressService",["$http","$q","geolocation",function(a,b,c){var d="http://maps.googleapis.com/maps/api/geocode/json?latlng=",e=function(){return c.getLocation().then(function(a){return a})},f=function(b,c){return a.get(d+b+","+c).then(function(a){return a.data.results})},g=function(){return e().then(function(a){return h=a,f(a.coords.latitude,a.coords.longitude).then(function(a){return h.decodeAddress=a,h})})},h={addressFromLatLng:f,getCurrentAddress:g,getCurrentLocation:e};return h}]),angular.module("restaurantApp").directive("fileUpload",["$http",function(a){var b='<div class="fileUpload"><span><i class="glyphicon glyphicon-camera"/><br/>Add Photo</span><input type="file"  class="upload" name="file" ng-model="scope.fileLinks" onchange="angular.element(this).scope().uploadFile(this.files)" /></div>';return{template:"<div></div>",restrict:"EA",link:function(c,d){c.fileLinks=[],c.overLayOn=!1,d.html(b),c.uploadFile=function(b){c.overLayOn=!0,a.post("https://api.parse.com/1/files/"+b[0].name,b[0],{withCredentials:!1,headers:{"X-Parse-Application-Id":"dCmrudTKTJFxZAZNMoFjolAutEpwrCDMX91tzGLg","X-Parse-REST-API-Key":"MgOlryPflpjonYxpj2DvK9OPbbGc4xeFbQ4Np2o0","Content-Type":"image/jpeg"}}).then(function(a){c.overLayOn=!1,c.fileLinks.push(a.data.url)})}}}}]),angular.module("restaurantApp").controller("UserprofileCtrl",["$scope","$location","userService",function(a,b,c){c.isLogin()?c.getCurrentUserData().then(function(b){a.userInfo=b,console.log(b)}):b.path("login"),a.doLogOut=function(){c.logout(),c.setSessionToken(null),b.path("login")}}]),angular.module("restaurantApp").controller("RegisterCtrl",["$scope","ngToast","userService","$location",function(a,b,c,d){a.doSubmit=function(a){console.log(a),c.registerUser(a).then(function(e){console.log(e),b.create({content:"<label> User created</label><br><span>Going back to your profile page</span>"}),c.setSessionToken(e.data.sessionToken),c.setUserName(a.username),c.setUserID(e.data.objectId),d.path("userprofile")})}}]),angular.module("restaurantApp").controller("DininghistoryCtrl",["$scope","transactionServices","userService","foodService",function(a,b,c,d){b.getAllOrder().then(function(b){a.data=b,angular.forEach(b,function(a){d.queryFood(a.food.objectId).then(function(b){a.foodData=b.data,c.getUserData(b.data.cooker.objectId).then(function(b){a.cookerData=b})}),c.getUserData(a.customer.objectId).then(function(b){a.customerData=b})})})}]),angular.module("restaurantApp").service("transactionServices",["Restangular",function(a){var b=a.all("classes/order"),c=function(){return b.getList().then(function(a){var b=a.data;return b})},d={getAllOrder:c};return d}]),angular.module("restaurantApp").controller("FoodportfolioCtrl",["$scope","foodService","userService","dataBouncer","$location","Restangular",function(a,b,c,d,e,f){a.selectMe=function(a){console.log("fasdas"),d.setTempData(a),e.path("foodPortfolioDetail")},b.getAllFood().then(function(b){a.allfood=b,console.log(b),angular.forEach(b,function(a){a.showme=a.cooker.objectId===c.getUserID()?!0:!1})}),a.deleteMe=function(a){console.log(a),a.showme=!1;var b=f.one("classes/food",a.objectId);b.active=!1,b.put().then(function(){})}}]),angular.module("restaurantApp").controller("FoodportfoliodetailCtrl",["$scope","dataBouncer","$rootScope","Restangular","$location",function(a,b,c,d,e){a.thisFood=b.getTempData(),console.log(b.getTempData()),a.showMod=function(){c.toggle("modOverlay","on")},a.showDele=function(){c.toggle("deleteOverlay","on")},a.cancel=function(){c.toggle("deleteOverlay","off"),c.toggle("modOverlay","off")},a.deleteMe=function(a){console.log(a),a.showme=!1;var b=d.one("classes/food",a.objectId);b.active=!1,b.put().then(function(a){console.log(a),c.toggle("deleteOverlay","off"),e.path("foodPortfolio")})}}]),angular.module("restaurantApp").service("dataBouncer",["localStorageService",function(a){var b=function(b){a.set("temptData",b)},c=function(){return a.get("temptData")},d={setTempData:b,getTempData:c};return d}]);
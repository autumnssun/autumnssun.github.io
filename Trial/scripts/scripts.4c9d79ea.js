"use strict";angular.module("clinicalTrialReportApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","ngMaterial","angular.filter","ngWebAudio","chroma.angularChroma","picardy.fontawesome","pang","chart.js","ngStorage","angular-loading-bar"]).run(["pang",function(a){a.initialize("DRhAeaJerM56gyGw0Xd6COyMUUIb82NEL0wTWWR3","7SnNfFEamjlpEgSrJsdeXJ18hVeLs4A1y2b3TI78")}]).config(["$routeProvider","$mdThemingProvider",function(a,b){b.theme("default").primaryPalette("light-blue").accentPalette("red"),a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/show/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/signIn/:username/:key/",{controller:"MainCtrl",templateUrl:"views/main.html"}).when("/sound",{templateUrl:"views/sound.html",controller:"SoundCtrl",controllerAs:"sound"}).otherwise({redirectTo:"/"})}]),angular.module("clinicalTrialReportApp").controller("MainCtrl",["$scope","$localStorage","$location",function(a,b,c){b.$reset(),a.user={username:"",password:""},a.signin=function(){b.user=a.user,c.url("/sound")}}]),angular.module("clinicalTrialReportApp").filter("getById",function(){return function(a,b){for(var c=a.length,d=0;c>d;d++)if(a[d].objectId===b)return a[d];return null}}),angular.module("clinicalTrialReportApp").controller("SoundCtrl",["$scope","WebAudio","$log","$http","$filter","$location","$routeParams","$mdToast","$timeout","$mdSidenav","$localStorage",function(a,b,c,d,e,f,g,h,i,j,k){function l(b,c,d){var e;return function(){var d=a,f=Array.prototype.slice.call(arguments);i.cancel(e),e=i(function(){e=void 0,b.apply(d,f)},c||10)}}function m(a){return l(function(){j(a).toggle().then(function(){c.debug("toggle "+a+" is done")})},200)}var n={username:"superUser",key:"whamwham99"};null==k.user?f.url("/"):k.user.userName==n.username&&k.user.password==n.key?(console.log("yasd"),a.superUser=!0):"Kuraby"==k.user.userName||"m3dicine"==k.user.password||f.url("/"),d.get("combinedData.json").then(function(b){a.soundLibary=b.data,g.aduioKey&&a.sideMemuItemClicked(g.aduioKey)}),a.play=!1,a.hideComment=!1;var o,p,q,r,s,t=0;a.cb1=!0;var u=new chroma.ColorScale({colors:["#989898","#ff0000","#ffff00","#ffffff"],positions:[0,.25,.75,1],mode:"rgb",limits:[0,350]});a.toggleLeft=m("left"),a.close=function(){j("left").close().then(function(){c.debug("close LEFT is done")})};var v,w=Parse.Object.extend("comment");a.clearCmt=function(){a.cmt=""},a.sideMemuItemClicked=function(a){x(a),g.aduioKey=a};var x=function(c){function d(a){var b=angular.element("#wave").get()[0].getContext("2d");b.fillStyle="#fff",b.clearRect(0,0,830,100);for(var c=830/a.length,d=0;d<a.length;d++){var e=a[d];b.fillRect(d*c,50-100*e,.2,.2),b.fillRect(d*c,50+100*e,.2,.2)}}function f(a){var b=angular.element("#spectrogram").get()[0].getContext("2d");t++;var c=document.createElement("canvas");c.width=830,c.height=100;var d=c.getContext("2d"),e=document.getElementById("spectrogram");d.drawImage(e,0,0,830,100);for(var f=0;f<a.length;f++){var g=a[f];b.fillStyle=u.getColor(g).hex(),b.fillRect(2*t,100-2*f,2,2)}b.drawImage(spectrogram,0,0,830,100,0,0,830,100),b.setTransform(1,0,0,1,0,0)}o&&(o.stop(),a.play=!1),a.foundData=!0,v=null,a.cmt="";var g=e("getById")(a.soundLibary,c),h=g.url;a.chartData=[g.dia,g.sys],a.chartLabel=["Diastolic","Systolic"];var i=new Parse.Query(w);i.equalTo("soundID",c),i.first().then(function(b){b?(a.cmtData=b,a.cmt=a.cmtData.attributes.cmt,v=b,a.commented=!0,a.$apply()):a.commented=!1}),a.found=g,o=new b(h,{buffer:!0,loop:!1,gain:0}),o.onPlay=function(){a.play=!1;var b=o.audioSrc.buffer.getChannelData(0);p=o.audioSrc.context,q=p.createAnalyser(),r=p.createScriptProcessor(2048,1,1),s=p.createBiquadFilter(),o.audioSrc.connect(s),o.audioSrc.disconnect(p.destination),s.connect(q),s.connect(p.destination),q.connect(r),r.connect(p.destination),r.onaudioprocess=function(){var a=new Uint8Array(q.frequencyBinCount);q.getByteFrequencyData(a),f(a);var b=new Uint8Array(q.frequencyBinCount);q.getByteTimeDomainData(b)},d(b)},o.onEnd=function(){console.log("stop drawing"),r.disconnect(p.destination),t=0,a.play=!0},o.onBuffered=function(){a.play=!0;var b=angular.element("#wave").get()[0].getContext("2d");b.clearRect(0,0,830,100),b=angular.element("#spectrogram").get()[0].getContext("2d"),b.clearRect(0,0,830,100),console.log(o)},a.startAudio=function(){o.play(),p&&r.connect(p.destination)},a.pause=function(){o.pause()},a.stopAudio=function(){o.stop()}};a.saveCmt=function(){v?(v.set("cmt",a.cmt),v.save(null,{success:function(a){h.show({position:"bottom right",template:"<md-toast>Comment Updated</md-toast>"})}})):(v=new w,v.set("cmt",a.cmt),v.set("soundID",a.found.objectId),v.save(null,{success:function(a){h.show({position:"bottom right",template:"<md-toast>Comment Saved</md-toast>"})}}))},a.enableFilter=function(a){s&&(a?s.type="allpass":(s.type="lowpass",s.frequency.value=750,s.Q.value=0,s.gain.value=0))},a.min=function(a){return e("min")(e("map")(a,"id"))}}]),angular.module("clinicalTrialReportApp").run(["$templateCache",function(a){a.put("views/main.html",'<md-card class="signin"> <form name="userForm"> <md-card-content> <md-content layout-padding> <h2 class="md-title">Sign in</h2> <md-input-container required class="md-block"> <label>User name</label> <input ng-model="user.userName"> </md-input-container> <md-input-container required class="md-block"> <label>password</label> <input ng-model="user.password" type="password"> </md-input-container> </md-content> </md-card-content> <div class="md-actions" layout="row" layout-align="end center"> <md-button ng-click="signin()">Sign in</md-button> </div> </form> </md-card> <style type="text/css">.signin {\n    width: 400px;\n    margin: 0 auto\n}</style>'),a.put("views/sound.html",'<section layout="row" flex style="overflow-y: hidden; height:100vh"> <md-sidenav class="md-sidenav-left md-whiteframe-z2" md-component-id="left" md-is-locked-open="$mdMedia(\'gt-md\')"> <md-toolbar style="height:5vh"> <div md-toolbar-tools layout="row"> <div class="md-toolbar-tools"> <h1>Paitent List</h1> <md-button ng-click="close()" class="md-primary" hide-gt-md> Close </md-button> </div> </div> </md-toolbar> <md-input-container style="height:10vh"> <label>Search for patient</label> <input type="text" ng-model="search"> </md-input-container> <md-content role="navigation" style="overflow-y: scroll; height:85vh"> <md-list role="list"> <md-menu ng-repeat="sounds in soundLibary| filterBy: [\'patient\']: search | orderBy:\'patient\' | groupBy: \'patient\' " md-offset="200 0"> <md-list-item class="md-1-line" aria-label="Open demo menu" class="md-button" ng-click="$mdOpenMenu($event)"> <p ng-class="{hightlight: sounds[0].patient==found.patient}">Patient: {{sounds[0].patient}} - {{sounds.length}}sounds </p> </md-list-item> <md-menu-content width="4"> <md-menu-item ng-repeat="s in sounds" ng-class="{hightlight: s.objectId==found.objectId}"> <md-button ng-click="sideMemuItemClicked(\'{{s.objectId}}\')"> SoundID: {{s.objectId}} </md-button> </md-menu-item> </md-menu-content> </md-menu> </md-list> </md-content> </md-sidenav> <md-content layout-padding flex layout-align="center start"> <md-button ng-click="toggleLeft()" flex class="md-primary" hide-gt-md> Open Patient List </md-button> <md-card flex ng-hide="!foundData"> <md-toolbar class="md-accent" layout="row"> <div class="md-toolbar-tools" flex> <h1>Patient Number: <b>{{found.patient}}</b></h1> </div> <div class="md-toolbar-tools" flex layout-align="end center"> <h2>SoundId: <b>{{found.objectId}}</b></h2> </div> </md-toolbar> <md-content layout-padding flex layout="row" layout-align="center center"> <md-content flex="25"> <md-card flex> <md-card-content class="md-accent"> <p class="redingTitle">Average Stytole: <i class="unit">ms</i> </p> <h1 class="reading"> {{found.sys}}</h1> </md-card-content> </md-card> </md-content> <md-content flex="50" layout-align="center center" layout-fill layout="row"> <canvas id="doughnut" class="chart chart-doughnut" chart-data="chartData" chart-labels="chartLabel"> </canvas> </md-content> <md-content flex="25"> <md-card flex> <md-card-content class="md-accent"> <p class="redingTitle">Average Diastole: <i class="unit">ms</i> </p> <h1 class="reading"> {{found.dia}} </h1> </md-card-content> </md-card> </md-content> </md-content> <md-card-content layout-padding flex layout="row"> <!--                 <md-content flex>\n --> <md-card flex> <md-card-content> <p class="redingTitle">Heart rate: <i class="unit"> bmp</i> </p> <h1 class="reading"> {{found.hr}} </h1> </md-card-content> </md-card> <md-card flex> <md-card-content> <p class="redingTitle">Respiratory Rate: <i class="unit">breath/minute</i> </p> <h1 class="reading"> {{found.rr}}</h1> </md-card-content> </md-card> <!-- </md-content>\n                <md-content flex> --> <md-card flex> <md-card-content class="md-accent"> <p class="redingTitle" style="color:#E63567">Systolic Murmur: <i class="unit">...</i> </p> <h1 class="reading"> {{found.sm}}</h1> </md-card-content> </md-card> <md-card flex> <md-card-content class="md-accent"> <p class="redingTitle" style="color:#E63567">Diastolic Murmur: <i class="unit">...</i> </p> <h1 class="reading"> {{found.dm}} </h1> </md-card-content> </md-card> <!--                 </md-content>\n --> </md-card-content> <md-card-content flex layout-margin layout-align="center center" style="background-color:#989898 ; margin:0"> <canvas id="wave" width="830" height="100" style="display: block; background-color:#989898; margin:0 auto"></canvas> <canvas id="spectrogram" width="830" height="100" style="display: block; background-color: #989898; margin:0 auto"></canvas> <div layout="row" layout-align="center center"> <md-checkbox ng-disabled="play" ng-model="cb1" aria-label="Checkbox 1" ng-click="enableFilter(cb1)"> Enable filter </md-checkbox> <md-button class="md-raised md-accent" ng-click="stopAudio()">Stop</md-button> <md-button class="md-raised" ng-click="startAudio()" ng-disabled="!play">Play</md-button> </div> </md-card-content> <md-card flex ng-show="superUser"> <md-toolbar> <div class="md-toolbar-tools" flex> <h4>Comment</h4> </div> </md-toolbar> <textarea class="myTxtArea" ng-model="cmt">\n                </textarea> <div class="md-actions" style="margin-right:2em" layout="row" layout-align="end center"> <md-button class="md-raised md-accent" ng-click="clearCmt()">Clear</md-button> <md-button class="md-raised" ng-click="saveCmt()">Save</md-button> </div> </md-card> <md-card flex ng-show=" commented"> <md-toolbar layout="row"> <div class="md-toolbar-tools" flex> <h4>Comment</h4> </div> </md-toolbar> <md-card-content> {{cmt}} </md-card-content> </md-card> </md-card> </md-content> </section> <style type="text/css">.myTxtArea {\n    border: none;\n    overflow: auto;\n    outline: none;\n    -webkit-box-shadow: none;\n    -moz-box-shadow: none;\n    box-shadow: none;\n    width: auto;\n    border: solid thin #CACAC4;\n    background-color: #F3F3F3;\n    resize: none;\n    margin: 2em;\n    height: 15vh;\n    min-height: 80px;\n    max-height: 300px;\n}</style>')}]);
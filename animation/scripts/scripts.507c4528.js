"use strict";angular.module("animationProjectApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","nvd3ChartDirectives","angular.filter","ui.select"]).config(["$routeProvider","uiSelectConfig",function(a,b){b.theme="select2",a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/paitentsList",{templateUrl:"views/paitentslist.html",controller:"PaitentslistCtrl"}).when("/sandbox",{templateUrl:"views/sandbox.html",controller:"SandboxCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("animationProjectApp").controller("MainCtrl",["$scope",function(a){a.person={},a.people=[{name:"Adam",email:"adam@email.com",age:10},{name:"Amalie",email:"amalie@email.com",age:12},{name:"Wladimir",email:"wladimir@email.com",age:30},{name:"Samantha",email:"samantha@email.com",age:31},{name:"Estefanía",email:"estefanía@email.com",age:16},{name:"Natasha",email:"natasha@email.com",age:54},{name:"Nicole",email:"nicole@email.com",age:43},{name:"Adrian",email:"adrian@email.com",age:21}],a.users=[{id:1,user:{first_name:"Rob",last_name:"John",mobile:4444}},{id:2,user:{first_name:"John",last_name:"Wayne",mobile:3333}},{id:3,user:{first_name:"Rob",last_name:"Johansson",mobile:2222}},{id:4,user:{first_name:"Mike",last_name:"Terry",mobile:1111}}],a.country={},a.countries=[{name:"Afghanistan",code:"AF"},{name:"Åland Islands",code:"AX"},{name:"Albania",code:"AL"},{name:"Algeria",code:"DZ"},{name:"American Samoa",code:"AS"},{name:"Andorra",code:"AD"},{name:"Angola",code:"AO"},{name:"Anguilla",code:"AI"},{name:"Antarctica",code:"AQ"},{name:"Antigua and Barbuda",code:"AG"},{name:"Argentina",code:"AR"},{name:"Armenia",code:"AM"},{name:"Aruba",code:"AW"},{name:"Australia",code:"AU"},{name:"Austria",code:"AT"},{name:"Azerbaijan",code:"AZ"},{name:"Bahamas",code:"BS"},{name:"Bahrain",code:"BH"},{name:"Bangladesh",code:"BD"},{name:"Barbados",code:"BB"},{name:"Belarus",code:"BY"},{name:"Belgium",code:"BE"},{name:"Belize",code:"BZ"},{name:"Benin",code:"BJ"},{name:"Bermuda",code:"BM"},{name:"Bhutan",code:"BT"},{name:"Bolivia",code:"BO"},{name:"Bosnia and Herzegovina",code:"BA"},{name:"Botswana",code:"BW"},{name:"Bouvet Island",code:"BV"},{name:"Brazil",code:"BR"},{name:"British Indian Ocean Territory",code:"IO"},{name:"Brunei Darussalam",code:"BN"},{name:"Bulgaria",code:"BG"},{name:"Burkina Faso",code:"BF"},{name:"Burundi",code:"BI"},{name:"Cambodia",code:"KH"},{name:"Cameroon",code:"CM"},{name:"Canada",code:"CA"},{name:"Cape Verde",code:"CV"},{name:"Cayman Islands",code:"KY"},{name:"Central African Republic",code:"CF"},{name:"Chad",code:"TD"},{name:"Chile",code:"CL"},{name:"China",code:"CN"},{name:"Christmas Island",code:"CX"},{name:"Cocos (Keeling) Islands",code:"CC"},{name:"Colombia",code:"CO"},{name:"Comoros",code:"KM"},{name:"Congo",code:"CG"},{name:"Congo, The Democratic Republic of the",code:"CD"},{name:"Cook Islands",code:"CK"},{name:"Costa Rica",code:"CR"},{name:"Cote D'Ivoire",code:"CI"},{name:"Croatia",code:"HR"},{name:"Cuba",code:"CU"},{name:"Cyprus",code:"CY"},{name:"Czech Republic",code:"CZ"},{name:"Denmark",code:"DK"},{name:"Djibouti",code:"DJ"},{name:"Dominica",code:"DM"},{name:"Dominican Republic",code:"DO"},{name:"Ecuador",code:"EC"},{name:"Egypt",code:"EG"},{name:"El Salvador",code:"SV"},{name:"Equatorial Guinea",code:"GQ"},{name:"Eritrea",code:"ER"},{name:"Estonia",code:"EE"},{name:"Ethiopia",code:"ET"},{name:"Falkland Islands (Malvinas)",code:"FK"},{name:"Faroe Islands",code:"FO"},{name:"Fiji",code:"FJ"},{name:"Finland",code:"FI"},{name:"France",code:"FR"},{name:"French Guiana",code:"GF"},{name:"French Polynesia",code:"PF"},{name:"French Southern Territories",code:"TF"},{name:"Gabon",code:"GA"},{name:"Gambia",code:"GM"},{name:"Georgia",code:"GE"},{name:"Germany",code:"DE"},{name:"Ghana",code:"GH"},{name:"Gibraltar",code:"GI"},{name:"Greece",code:"GR"},{name:"Greenland",code:"GL"},{name:"Grenada",code:"GD"},{name:"Guadeloupe",code:"GP"},{name:"Guam",code:"GU"},{name:"Guatemala",code:"GT"},{name:"Guernsey",code:"GG"},{name:"Guinea",code:"GN"},{name:"Guinea-Bissau",code:"GW"},{name:"Guyana",code:"GY"},{name:"Haiti",code:"HT"},{name:"Heard Island and Mcdonald Islands",code:"HM"},{name:"Holy See (Vatican City State)",code:"VA"},{name:"Honduras",code:"HN"},{name:"Hong Kong",code:"HK"},{name:"Hungary",code:"HU"},{name:"Iceland",code:"IS"},{name:"India",code:"IN"},{name:"Indonesia",code:"ID"},{name:"Iran, Islamic Republic Of",code:"IR"},{name:"Iraq",code:"IQ"},{name:"Ireland",code:"IE"},{name:"Isle of Man",code:"IM"},{name:"Israel",code:"IL"},{name:"Italy",code:"IT"},{name:"Jamaica",code:"JM"},{name:"Japan",code:"JP"},{name:"Jersey",code:"JE"},{name:"Jordan",code:"JO"},{name:"Kazakhstan",code:"KZ"},{name:"Kenya",code:"KE"},{name:"Kiribati",code:"KI"},{name:"Korea, Democratic People's Republic of",code:"KP"},{name:"Korea, Republic of",code:"KR"},{name:"Kuwait",code:"KW"},{name:"Kyrgyzstan",code:"KG"},{name:"Lao People's Democratic Republic",code:"LA"},{name:"Latvia",code:"LV"},{name:"Lebanon",code:"LB"},{name:"Lesotho",code:"LS"},{name:"Liberia",code:"LR"},{name:"Libyan Arab Jamahiriya",code:"LY"},{name:"Liechtenstein",code:"LI"},{name:"Lithuania",code:"LT"},{name:"Luxembourg",code:"LU"},{name:"Macao",code:"MO"},{name:"Macedonia, The Former Yugoslav Republic of",code:"MK"},{name:"Madagascar",code:"MG"},{name:"Malawi",code:"MW"},{name:"Malaysia",code:"MY"},{name:"Maldives",code:"MV"},{name:"Mali",code:"ML"},{name:"Malta",code:"MT"},{name:"Marshall Islands",code:"MH"},{name:"Martinique",code:"MQ"},{name:"Mauritania",code:"MR"},{name:"Mauritius",code:"MU"},{name:"Mayotte",code:"YT"},{name:"Mexico",code:"MX"},{name:"Micronesia, Federated States of",code:"FM"},{name:"Moldova, Republic of",code:"MD"},{name:"Monaco",code:"MC"},{name:"Mongolia",code:"MN"},{name:"Montserrat",code:"MS"},{name:"Morocco",code:"MA"},{name:"Mozambique",code:"MZ"},{name:"Myanmar",code:"MM"},{name:"Namibia",code:"NA"},{name:"Nauru",code:"NR"},{name:"Nepal",code:"NP"},{name:"Netherlands",code:"NL"},{name:"Netherlands Antilles",code:"AN"},{name:"New Caledonia",code:"NC"},{name:"New Zealand",code:"NZ"},{name:"Nicaragua",code:"NI"},{name:"Niger",code:"NE"},{name:"Nigeria",code:"NG"},{name:"Niue",code:"NU"},{name:"Norfolk Island",code:"NF"},{name:"Northern Mariana Islands",code:"MP"},{name:"Norway",code:"NO"},{name:"Oman",code:"OM"},{name:"Pakistan",code:"PK"},{name:"Palau",code:"PW"},{name:"Palestinian Territory, Occupied",code:"PS"},{name:"Panama",code:"PA"},{name:"Papua New Guinea",code:"PG"},{name:"Paraguay",code:"PY"},{name:"Peru",code:"PE"},{name:"Philippines",code:"PH"},{name:"Pitcairn",code:"PN"},{name:"Poland",code:"PL"},{name:"Portugal",code:"PT"},{name:"Puerto Rico",code:"PR"},{name:"Qatar",code:"QA"},{name:"Reunion",code:"RE"},{name:"Romania",code:"RO"},{name:"Russian Federation",code:"RU"},{name:"Rwanda",code:"RW"},{name:"Saint Helena",code:"SH"},{name:"Saint Kitts and Nevis",code:"KN"},{name:"Saint Lucia",code:"LC"},{name:"Saint Pierre and Miquelon",code:"PM"},{name:"Saint Vincent and the Grenadines",code:"VC"},{name:"Samoa",code:"WS"},{name:"San Marino",code:"SM"},{name:"Sao Tome and Principe",code:"ST"},{name:"Saudi Arabia",code:"SA"},{name:"Senegal",code:"SN"},{name:"Serbia and Montenegro",code:"CS"},{name:"Seychelles",code:"SC"},{name:"Sierra Leone",code:"SL"},{name:"Singapore",code:"SG"},{name:"Slovakia",code:"SK"},{name:"Slovenia",code:"SI"},{name:"Solomon Islands",code:"SB"},{name:"Somalia",code:"SO"},{name:"South Africa",code:"ZA"},{name:"South Georgia and the South Sandwich Islands",code:"GS"},{name:"Spain",code:"ES"},{name:"Sri Lanka",code:"LK"},{name:"Sudan",code:"SD"},{name:"Suriname",code:"SR"},{name:"Svalbard and Jan Mayen",code:"SJ"},{name:"Swaziland",code:"SZ"},{name:"Sweden",code:"SE"},{name:"Switzerland",code:"CH"},{name:"Syrian Arab Republic",code:"SY"},{name:"Taiwan, Province of China",code:"TW"},{name:"Tajikistan",code:"TJ"},{name:"Tanzania, United Republic of",code:"TZ"},{name:"Thailand",code:"TH"},{name:"Timor-Leste",code:"TL"},{name:"Togo",code:"TG"},{name:"Tokelau",code:"TK"},{name:"Tonga",code:"TO"},{name:"Trinidad and Tobago",code:"TT"},{name:"Tunisia",code:"TN"},{name:"Turkey",code:"TR"},{name:"Turkmenistan",code:"TM"},{name:"Turks and Caicos Islands",code:"TC"},{name:"Tuvalu",code:"TV"},{name:"Uganda",code:"UG"},{name:"Ukraine",code:"UA"},{name:"United Arab Emirates",code:"AE"},{name:"United Kingdom",code:"GB"},{name:"United States",code:"US"},{name:"United States Minor Outlying Islands",code:"UM"},{name:"Uruguay",code:"UY"},{name:"Uzbekistan",code:"UZ"},{name:"Vanuatu",code:"VU"},{name:"Venezuela",code:"VE"},{name:"Vietnam",code:"VN"},{name:"Virgin Islands, British",code:"VG"},{name:"Virgin Islands, U.S.",code:"VI"},{name:"Wallis and Futuna",code:"WF"},{name:"Western Sahara",code:"EH"},{name:"Yemen",code:"YE"},{name:"Zambia",code:"ZM"},{name:"Zimbabwe",code:"ZW"}],console.log(a.users),a.exampleData=[{values:[[10254096e5,0],[1028088e6,-6.3382185140371],[10307664e5,-5.9507873460847],[10333584e5,-11.569146943813],[10360404e5,-5.4767332317425],[10386324e5,.50794682203014],[10413108e5,-5.5310285460542],[10439892e5,-5.7838296963382],[10464084e5,-7.3249341615649],[10490868e5,-6.7078630712489],[10516752e5,.44227126150934],[10543536e5,7.2481659343222],[10569456e5,9.2512381306992],[1059624e6,11.341210982529],[10623024e5,14.73482040902],[10648944e5,12.387148007542],[10675764e5,18.436471461827],[10701684e5,19.830742266977],[10728468e5,22.643205829887],[10755252e5,26.743156781239],[10780308e5,29.597478802228],[10807092e5,30.831697585341],[10832976e5,28.054068024708],[1085976e6,29.294079423832],[1088568e6,30.269264061274],[10912464e5,24.934526898906],[10939248e5,24.265982759406],[10965168e5,27.217794897473],[10991952e5,30.802601992077],[11017908e5,36.331003758254],[11044692e5,43.14249870006],[11071476e5,40.558263931958],[11095668e5,42.5436223858],[11122452e5,41.683584710331],[11148336e5,36.375367302328],[1117512e6,40.71968898073],[1120104e6,43.897963036919],[11227824e5,49.797033975368],[11254608e5,47.085993935989],[11280528e5,46.601972859745],[11307348e5,41.567784572762],[11333268e5,47.296923737245],[11360052e5,47.64296961208],[11386836e5,50.781515820954],[11411028e5,52.600229204305],[11437812e5,55.599684490628],[11463696e5,57.920388436633],[1149048e6,53.503593218971],[115164e7,53.522973979964],[11543184e5,49.846822298548],[11569968e5,54.72134161465],[11595888e5,58.186236223191],[11622708e5,63.908065540997],[11648628e5,69.767285129367],[11675412e5,72.534013373592],[11702196e5,77.991819436573],[11726388e5,78.14358440499],[11753136e5,83.702398665233],[11779056e5,91.140859312418],[1180584e6,98.590960607028],[1183176e6,96.245634754228],[11858544e5,92.326364432615],[11885328e5,97.06876533223],[11911248e5,105.8102555626],[11938032e5,114.38348777791],[11963988e5,103.5960494981],[11990772e5,101.72488429307],[12017556e5,89.840147735028],[12042612e5,86.963597532664],[1206936e6,84.075505208491],[1209528e6,93.170105645831],[12122064e5,103.62838083121],[12147984e5,87.458241365091],[12174768e5,85.808374141319],[12201552e5,93.158054469193],[12227472e5,65.97325238236],[12254256e5,44.580686638224],[12280212e5,36.418977140128],[12306996e5,38.727678144761],[1233378e6,36.692674173387],[12357972e5,30.03302280948],[1238472e6,36.707532162718],[1241064e6,52.191457688389],[12437424e5,56.357883979735],[12463344e5,57.629002180305],[12490128e5,66.650985790166],[12516912e5,70.839243432186],[12542832e5,78.731998491499],[12569616e5,72.375528540349],[12595572e5,81.73838788163],[12622356e5,87.539792394232],[1264914e6,84.320762662273],[12673332e5,90.621278391889],[1270008e6,102.47144881651],[12726e8,102.79320353429],[12752784e5,90.529736050479],[12778704e5,76.580859994531],[12805488e5,86.548979376972],[12832272e5,81.879653334089],[12858192e5,101.72550015956],[12884976e5,107.9796485226],[12910932e5,106.16240630785],[12937716e5,114.84268599533],[129645e7,121.60793322282],[12988692e5,133.41437346605],[1301544e6,125.46646042904],[1304136e6,129.76784954301],[13068144e5,128.15798861044],[13094064e5,121.92388706072],[13120848e5,116.7003610087],[13147632e5,88.367701837033],[13173552e5,59.159665765725],[13200336e5,79.793568139753],[13226292e5,75.903834028417],[13253076e5,72.704218209157],[1327986e6,84.936990804097],[13304916e5,93.388148670744]]}]}]),angular.module("animationProjectApp").controller("IndexcontrollerCtrl",function(){}),angular.module("animationProjectApp").controller("PaitentslistCtrl",["$scope","$http",function(a,b){a.currentPage=0,a.medata=[{key:"Series 1",values:[[10254096e5,0],[1028088e6,-6.3],[10307664e5,-5.4],[10333584e5,-11.5],[10360404e5,-5.2],[10386324e5,.42]]},{key:"Series 2",values:[[10254096e5,0],[1028088e6,6.42],[10307664e5,5.31],[10333584e5,11.32],[10360404e5,5.4],[10386324e5,42.53]]}],a.cardAnimation="classSlideFromTop",a.animationClass="pagePushRight",a.hideMain=!1,a.patientList={};var c="assets/patients.json";b.get(c).success(function(b){a.patientList=b.users,a.patientList.selected=a.patientList[0]}),a.toogle=function(){a.hideMain=!a.hideMain,console.log(a.hideMain)},a.previousConsultation=function(){a.cardAnimation="my-element",console.log(a.hideMain),a.hideMain=!a.hideMain},a.loadPaitent=function(b){a.currentPage=0,a.hideMain=!1,a.patientList.selected=b},a.xAxisTickFormatFunction=function(){return function(a){return d3.time.format("%b")(new Date(a))}},a.$on("ngRepeatFinished",function(){PageTransitions.init()})}]),angular.module("animationProjectApp").controller("SandboxCtrl",["$scope","$http",function(a,b){a.currentPage=0,a.cardAnimation="classSlideFromTop",a.animationClass="pagePushRight",a.hideMain=!1,a.patientList={};var c="assets/patients.json";b.get(c).success(function(b){a.patientList=b.users,a.patientList.selected=a.patientList[0]}),a.toogle=function(){a.hideMain=!a.hideMain,console.log(a.hideMain)},a.previousConsultation=function(){a.cardAnimation="my-element",console.log(a.hideMain),a.hideMain=!a.hideMain},a.loadPaitent=function(b){a.currentPage=0,a.hideMain=!1,a.patientList.selected=b},a.$on("ngRepeatFinished",function(){})}]),angular.module("animationProjectApp").directive("consultation",function(){return{template:"<div></div>",restrict:"E",link:function(a,b,c){b.text("this is the consultation directive"),console.log(c)}}}),angular.module("animationProjectApp").directive("onFinishRender",["$timeout",function(a){return{restrict:"A",link:function(b){b.$last===!0&&a(function(){b.$emit("ngRepeatFinished")})}}}]);
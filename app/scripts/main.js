
var app = angular.module("application",["firebase", "ui.router","zingchart-angularjs"])

/* this block config all the application states. */
.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise("/suggestions");

  $stateProvider
    .state("home", {
      url: "/home",
      templateUrl: "home.html"
    })

    .state("register", {
      url: "/register",
      templateUrl: "register.html"
    })

    .state("login", {
      url: "/login",
      templateUrl: "login.html"
    })

    .state("suggestions", {
      url: "/suggestions",
      templateUrl: "suggestions.html",
      controller: "suggestionsCtrl"
    })

    .state("stats", {
      url: "/stats",
      templateUrl: "stats.html"
    })

    .state("solutions", {
      url: "/solutions",
      templateUrl: "solutions.html"
    })
}])

/*This controller is responsible for generating the charts.*/

.controller("graphController",["$scope", function($scope){
      $scope.myData = [1,4,5,5,10];
}])

.controller("graphControllerSol1",["$scope", function($scope){

    $scope.myObj = {


  "type": "bar3d",
  "title": {
    "text": "Confidence in Police to Control Crime"
  },
  "subtitle": {
    "text": "Year - 2010 (11,155 Participants)"
  },
  "scaleX": {
    "values":["Antigua & Barbuda","Barbados","Guyana","Jamaica","St. Lucia",
        "Suriname","Trinidad & Tobago"],
    "items-overlap":true,
    "item":{
        "font-angle":-45,
        "auto-align":true
    }
  },
  "scaleY": {
    "label": {
      "text": "Percent"
    }
  },
  "legend": {},
  "series": [
    {
      "text": "Some Confidence",
      "lineColor": "#9e9e9e",
      "backgroundColor": "#9e9e9e",
      "borderColor": "#9e9e9e",
      "marker": {
        "borderWidth": 0,
        "backgroundColor": "#9e9e9e"
      },
      "values": [
        57.3,
        65.4,
        62.5,
        59.4,
        62.1,
        52.7,
        59.1
      ]
    },
    {
      "text": "Great Confidence",
      "lineColor": "#2196F3",
      "backgroundColor": "#2196F3",
      "borderColor": "#2196F3",
      "marker": {
        "borderWidth": 0,
        "backgroundColor": "#2196F3"
      },
      "values": [
        14.3,
        16.7,
        14.3,
        11.6,
        15.5,
        4.6,
        11.9
      ]
    }
  ]


    };
}])

.controller("graphControllerSol2",["$scope", function($scope){

    $scope.myObj2 = {

  "type": "line",
  "title": {
    "font-size":"18px",
    "text": "Social Intervention as a Means of Crime Control"
  },
  "subtitle": {
    "font-size":"16px",
    "text": "Year - 2010 (11,155 Participants)"
  },
  "scaleX": {
    "values":["Education","Youth<br>Programmes","Job<br>Creation","Urban<br>Areas",
        "Reducing<br>Poverty"],
    "items-overlap":true,
    "item":{
        "font-size":"14px",
        "auto-align":true
    },
    "guide":{
    "line-color":"red",
    "line-width":2
    }
  },
  "scaleY": {
    "values":"80:100:2",
    "label": {
      "text": "Percent",
      "padding-left":"25px",
      "font-size":"16px"
    },
    "item":{
        "font-size":"14px",
        "auto-align":true
    },
    "guide":{
    "line-color":"red",
    "line-width":2
    }
  },
  "tooltip":{ 
      "text":"%v %",
      "font-size":"16px"  
  },
  "legend": {},
  "series": [
    {
      "text": "Gov't Investment",
      "lineColor": "#4caf50",
      "backgroundColor": "#4caf50",
      "borderColor": "#4caf50",
      "marker": {
        "borderWidth": 0,
        "backgroundColor": "#4caf50"
      },
      "values": [
        87.1,
        91.7,
        92.5,
        87.7,
        88.8
      ]
    },

  ]
  };

  $scope.myRender = {
      width:  "100%", 
      height: 'auto'
  };
}])


/* this controller will allow a user to register an account using an email and password. */

.controller("registerCtrl",["$scope", function($scope){

  $scope.user = {};

  /* this function will call on firebase to register a user account. */
  $scope.registerUser = function(){
    var ref = new Firebase("https://comp3550a1.firebaseio.com");

    ref.createUser($scope.user,function(error, userData){
      if(error){
        console.log("Error creating a user: " + error);
      }
      else{
        console.log("Created a new user: " + userData.uid);
      }
    });
  };

}])

/* this controller will log a user into an account using firebase authenication */

.controller("loginCtrl",["$scope", "AuthService", function($scope, AuthService){

  $scope.user = {};

  /* this function will call on firebase on authenicate a user using a custom service. */
  $scope.loginUser = function(){
    AuthService.setAuth($scope.user);
  };


}])

.controller("logoutCtrl", ["$scope", "AuthService", function($scope, AuthService){

  $scope.logoutUser = function(){
    AuthService.unAuth();
  };


}])

.controller("suggestionsCtrl", ["$scope", "$firebaseObject", "AuthService" , function($scope, $firebaseObject, AuthService){

  /* initalize some variables. */
  $scope.location = {};
  $scope.users = {};
  $scope.area = null;

  $scope.initSuggestions = function(){

    /* create a reference object to the firebase database.*/
    var ref = new Firebase("https://comp3550a1.firebaseio.com");

    /* create a reference object to firebase users. */
    var usersRef = new Firebase("https://comp3550a1.firebaseio.com/users");
    $scope.users = $firebaseObject(usersRef);

    /* use the HTML5 geolocation feature to get the users lat/long coords. */
    navigator.geolocation.getCurrentPosition(function(position){
      $scope.location.lng = position.coords.longitude;
      $scope.location.lat = position.coords.latitude;

      /* we need to convert the lat/long value to a city/ town using google's reverse geocoding. */
      var geocoder = new google.maps.Geocoder();
      var latlng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);

      geocoder.geocode({'latLng': $scope.location}, function(results, status) {
	       if (status == google.maps.GeocoderStatus.OK) {
           /* decode city/town here to organize vendors. */
           $scope.area = results[0].address_components[1].short_name;
           /* update the city list. */
           ref.child("areas").child($scope.area).set(true);
         }

         /* if area was not detected, display alert accordingly. */
         if($scope.area == null){
           $scope.area_alert = "Sorry, Your Area Could Not Be Identified, Loading Suggestions From All Areas.";

           /* since we could not find an area, load all suggestions. */
           var suggestionsRef = new Firebase("https://comp3550a1.firebaseio.com/suggestions");
           $scope.suggestions = $firebaseObject(suggestionsRef);
         }
         else{
           $scope.area_alert = "Loading Suggestions From " + $scope.area + " And Surrounding Areas.";

           /* now that we have an area, we can load suggestions for this area. */
           var suggestionsRef = new Firebase("https://comp3550a1.firebaseio.com/suggestions/" + $scope.area);
           $scope.suggestions = $firebaseObject(suggestionsRef);

         }



       }); /* end geocode block */
    }); /* end navigation block. */

  };

  $scope.postSuggestion = function(){
    /* make a refernce to the firebase database.. */
    var ref = new Firebase("https://comp3550a1.firebaseio.com");
    /* retrieve the user id, of the person posting this suggestion. */
    var auth = AuthService.getAuth();
    var id = null;
    /* valid id. */
    if(auth != null){
      id = auth.uid;
      if($scope.area == null){
        var temp  = "unknown";
        ref.child("suggestions").child(temp).push({text : $scope.suggestion, name : id});
      }
      else
      {
        ref.child("suggestions").child($scope.area).push({text : $scope.suggestion, name : id});
      }
    }
    else{
      console.log("You cant post because you aren't logged in.");
    }

  };

}])


/* this is an authenication service, that will make the auth info available to all pages that request it. */

.service("AuthService",["$state", function($state){

  var ref = null

  return {

    setAuth : function(user){

      ref = new Firebase("https://comp3550a1.firebaseio.com");

      ref.authWithPassword(user,function(error, authData){
        if(error){
          console.log("Failed to login user: " + error);
        }
        else{
          console.log("Successfully logged in user");

          /* store some data about the user to display back for suggestion box. */
          ref.child("users").child(authData.uid).set({
            provider: authData.provider,
            name: authData.password.email,
            profileImageURL : authData.password.profileImageURL
          });

          /* redirect user after successfully logging in.*/
          $state.go("home");

        }

      });

    },

    getAuth : function(){
      return ref.getAuth();
    },

    unAuth : function(){
      ref.unauth();
    }

  };
}])

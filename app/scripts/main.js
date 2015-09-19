(function(){
  "use strict";

/* this line of code creates the main module for the application and adds the required dependencies. */
var app = angular.module("application",["firebase", "ui.router","zingchart-angularjs"])

/*
  this block of code, creates the routes (links) to allow the user to navigate the application.
  Anyone that needs to add a new page to the application, can follow the below template and add
  a new route for their page.
*/
.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider){

  /* launch on the home page automatically. */
  $urlRouterProvider.otherwise("/home");

  $stateProvider
    .state("home", {
      url: "/home",
      templateUrl: "home.html"
    })

    .state("register", {
      url: "/register",
      templateUrl: "register.html",
      controller: "registerCtrl"
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

    .state("contact", {
      url: "/contact",
      templateUrl: "contact.html"
    });


}])

/*This controller is responsible for generating the charts.*/

.controller("graphController",["$scope", function($scope){
      $scope.myData = [1,4,5,5,10];
}])

.controller("graphControllerSol1",["$scope", function($scope){

    $scope.myObj = {


  "type": "bar3d",
  "title": {
  	"font-size":"18px",
    "text": "Confidence in Police to Control Crime"
  },
  "subtitle": {
  	"font-size":"16px",
    "text": "Year - 2010 (11,155 Participants)"
  },
  "scaleX": {
    "values":["Antigua &<br>Barbuda","Barbados","Guyana","Jamaica","St. Lucia",
        "Suriname","Trinidad &<br>Tobago"],
    "items-overlap":true,
    "item":{
    	"font-size":"14px",
        "font-angle":-45,
        "auto-align":true
    },
    "guide":{
    "line-color":"red",
    "line-width":2
    }
  },
  "scaleY": {
    "label": {
      "text": "Percent",
      "font-size":"16px"
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

   $scope.myRender = {
      width:  "100%",
      height: 'auto'
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


/*
  this controller will be placed on the registration page. It will allow a visitor
  to register for an account on the website.
*/

.controller("registerCtrl",["$scope", function($scope){

  $scope.user = {};

  /* this function uses firebase simple email and password method to create a user account. */
  $scope.registerUser = function(){

    var ref = new Firebase("https://comp3550a1.firebaseio.com");

    ref.createUser($scope.user,function(error, userData){
      if(error){
        alert(error);
      }
      else{
        alert("Successfully created user account. You may now login.");
      }
    });

  };

}])

/*
  this controller will be placed on the login page and allow a user to signin into
  an already existant account.

  You'll be sent to the home page unpon successfully logging in.
 */

.controller("loginCtrl",["$scope", "AuthService", function($scope, AuthService){

  $scope.user = {};

  /* this function will call on firebase to authenicate a user using a custom service. */
  $scope.loginUser = function(){
    AuthService.setAuth($scope.user);
  };


}])

/*
  this controller will be used to logout a currently authenicated user.

 */
.controller("logoutCtrl", ["$scope", "AuthService", function($scope, AuthService){

  $scope.logoutUser = function(){
    /* if there is a user, log him out. */
    if(AuthService.getAuth() !== null){
      AuthService.unAuth();
    }
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

      geocoder.geocode({latLng: $scope.location}, function(results, status) {
	       if (status === google.maps.GeocoderStatus.OK) {
           /* decode city/town here to organize vendors. */
           $scope.area = results[0].address_components[1].short_name;
           /* update the city list. */
           ref.child("areas").child($scope.area).set(true);
         }

         /* an area was found. */
         if($scope.area != null){

           /* now that we have an area, we can load suggestions for this area. */
           var suggestionsRef = new Firebase("https://comp3550a1.firebaseio.com/suggestions/" + $scope.area);
           $scope.suggestions = $firebaseObject(suggestionsRef);

         }



       }); /* end geocode block */
    }, function(error){
        alert("There was an error retrieving your location, you may have blocked the location feature.");
        var suggestionsRef = new Firebase("https://comp3550a1.firebaseio.com/suggestions");
        $scope.suggestions = $firebaseObject(suggestionsRef);
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


/*
  this is an authenication service that will be used to handle user authenication.
  The login function will use this service to allow a user to signin.
  The logout function will use this service to signout a user.
  Any page that is password protected must use getAuth(), if its set, a user is signed in,
  if it is null no one is signed in, and you can block the page.
 */

.service("AuthService",["$state", function($state){

  var ref = new Firebase("https://comp3550a1.firebaseio.com");

  return {

    setAuth : function(user){

      ref.authWithPassword(user,function(error, authData){
        if(error){
          alert(error);
        }
        else{

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
    /* use this function to return details about the currently authenicated user. */
    getAuth : function(){
      return ref.getAuth();
    },

    /* logout the current user. */
    unAuth : function(){
      ref.unauth();
    }

  };
}])
}());

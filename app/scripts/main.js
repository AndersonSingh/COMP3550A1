
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
      templateUrl: "suggestions.html"
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


/* this controller will allow a user to register an account using an email and password. */

.controller("registerCtrl",["$scope", function($scope){

  $scope.user = {};

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

/* this controller will be used to log a user into an account. */

.controller("loginCtrl",["$scope", "AuthService", function($scope, AuthService){

  $scope.user = {};

  $scope.loginUser = function(){

    AuthService.setAuth($scope.user);

  };

}])

.controller("suggestionsCtrl", ["$scope", "$firebaseObject", "AuthService" , function($scope, $firebaseObject, AuthService){

  $scope.location = {};
  $scope.users = {};


  $scope.initSuggestions = function(){

    var ref = new Firebase("https://comp3550a1.firebaseio.com");

    navigator.geolocation.getCurrentPosition(function(position){

      $scope.location.lng = position.coords.longitude;
      $scope.location.lat = position.coords.latitude;

      console.log($scope.location);

      var geocoder = new google.maps.Geocoder();
      var latlng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);


      geocoder.geocode({'latLng': $scope.location}, function(results, status) {
	       if (status == google.maps.GeocoderStatus.OK) {

           /* decode city/town here to organize vendors. */

           $scope.area = results[0].address_components[1].short_name;

           /* update the city list. */
           ref.child("areas").child($scope.area).set(true);

         }
       });
    });

  };

  $scope.getSuggestions = function(){

    var ref = new Firebase("https://comp3550a1.firebaseio.com/suggestions/Tunapuna/");
    $scope.suggestions = $firebaseObject(ref);
    console.log($scope.suggestions);

  };

  /* this function will pull all the data for each user from firebase. */
  $scope.getUsers = function(){

    var ref = new Firebase("https://comp3550a1.firebaseio.com/users");
    $scope.users = $firebaseObject(ref);
  }

  $scope.postSuggestion = function(){

    /* make a refernce to the firebase database.. */
    var ref = new Firebase("https://comp3550a1.firebaseio.com");

    /* retrieve the user id, of the person posting this suggestion. */
    var id = AuthService.getAuth().uid;

    ref.child("suggestions").child($scope.area).push({text : $scope.suggestion, name : id});

  };

}])


/* this is an authenication service, that will make the auth info available to all pages that request it. */

.service("AuthService",[function(){

  var auth = null;

  return {

    setAuth : function(user){

      var ref = new Firebase("https://comp3550a1.firebaseio.com");

      ref.authWithPassword(user,function(error, authData){
        if(error){
          console.log("Failed to login user: " + error);
        }
        else{
          console.log("Successfully logged in user");
          console.log(authData);
          auth = authData;

          /* store some data about the user to display back for suggestion box. */
          ref.child("users").child(authData.uid).set({
            provider: authData.provider,
            name: authData.password.email,
            profileImageURL : authData.password.profileImageURL
          });

        }
      });

    },

    getAuth : function(){
      return auth;
    }

  };
}])

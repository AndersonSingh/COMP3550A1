
var app = angular.module("application",["firebase", "ui.router"])

/* this block config all the application states. */
.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise("/register");

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

.controller("loginCtrl",["$scope", function($scope){

  $scope.user = {};

  $scope.loginUser = function(){

    var ref = new Firebase("https://comp3550a1.firebaseio.com");

    ref.authWithPassword($scope.user,function(error, authData){
      if(error){
        console.log("Failed to login user: " + error);
      }
      else{
        console.log("Successfully logged in user");
        console.log(authData);
      }
    });

  };

}])

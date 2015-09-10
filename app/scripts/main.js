
var app = angular.module("application",["firebase", "ui.router"])

/* this block config all the application states. */
.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise("/register");

  $stateProvider
    .state('home', {
      url: "/home",
      templateUrl: "home.html"
    })
    .state('register', {
      url: "/register",
      templateUrl: "register.html"
    })
}])

.controller("registerCtrl",['$scope', function($scope){


}])

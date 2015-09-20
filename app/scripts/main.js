(function () {
    "use strict";

/* this line of code creates the main module for the application and adds the required dependencies. */
    angular.module("application",["firebase", "ui.router","zingchart-angularjs"])

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

.controller("graphControllerSol1",["$scope", function($scope){
  $scope.myValues = [[57.3,65.4,62.5,59.4,62.1,52.7,59.1],[14.3,16.7,14.3,11.6,15.5,4.6,11.9]];
  $scope.myObj = {
  type: "bar3d",
  title:{
  	fontSize:18,
    text: "Confidence in Police to Control Crime"
  },
  subtitle: {
  	fontSize:16,
    text: "Year - 2010 (11,155 Participants)"
  },
  scaleX: {
    values:["Antigua &<br>Barbuda","Barbados","Guyana","Jamaica","St. Lucia",
        "Suriname","Trinidad &<br>Tobago"],
    itemsOverlap:true,
    item:{
    	fontSize:14,
        fontAngle:-45,
        autoAlign:true
    },
    guide:{
    lineColor:"red",
    lineWidth:2
    }
  },
  scaleY: {
    label: {
      text: "Percent",
      fontSize:16
    },
    item:{
        fontSize:16,
        autoAlign:true
    }
  },
  tooltip:{
      text:"%v %",
      fontSize:20
  },
  legend:{
        minimize:1,
        header : {
            text: 'Confidence Levels',
            backgroundCcolor: 'silver'
         }
  },
  series: [
    {
      text: "Some Confidence",
      lineColor: "#9e9e9e",
      backgroundColor: "#9e9e9e",
      borderColor: "#9e9e9e",
      marker: {
        borderWidth: 0,
        backgroundColor: "#9e9e9e"
      }
    },
    {
      text: "Great Confidence",
      lineColor: "#2196F3",
      backgroundColor: "#2196F3",
      borderColor: "#2196F3",
      marker: {
        borderWidth: 0,
        backgroundColor: "#2196F3"
      }
    }
  ]
  };

  $scope.myRender = {
    width:"100%",
    height:'100%',
    autoResize: true
  };

}])

.controller("graphControllerSol2",["$scope", function($scope){
  $scope.myValues=[87.1,91.7,92.5,87.7,88.8];

  $scope.myObj2 = {
  type: "line",
  title: {
    fontSize:18,
    text: "Social Intervention as a Means of Crime Control"
  },
  subtitle: {
    fontSize:16,
    text: "Year - 2010 (11,155 Participants)"
  },
  scaleX: {
    values:["Education","Youth<br>Programmes","Job<br>Creation","Urban<br>Areas",
        "Reducing<br>Poverty"],
    itemsOverlap:true,
    item:{
        fontSize:14,
        autoAlign:true
    },
    guide:{
      lineColor:"red",
      lineWidth:2
    }
  },
  scaleY: {
    values:"80:100:2",
    label: {
      text: "Percent",
      paddingLeft:17,
      fontSize:16
    },
    item:{
        fontSize:14,
        autoAlign:true
    },
    guide:{
    lineColor:"red",
    lineWidth:2
    }
  },
  tooltip:{
      text:"%v %",
      fontSize:20
  },
  legend: {
        minimize:1,
        marginTop :60,
        header : {
            text: 'Government Investment',
            backgroundCcolor: 'silver'
         }
       },
  series: [
    {
      text: "Gov't Investment",
      lineColor: "#4caf50",
      backgroundColor: "#4caf50",
      borderColor: "#4caf50",
      marker: {
        borderWidth: 0,
        backgroundColor: "#4caf50"
    }
  }
  ]
  };

  $scope.myRender = {
      width:  "100%",
      height: 'auto',
      autoResize: true
  };
}])


/*
  this controller will be placed on the registration page. It will allow a visitor
  to register for an account on the website.
*/

.controller("registerCtrl",["$scope", function($scope){

  $scope.user = {};

  $scope.isNumber = function(str) {
    return !(isNaN(parseInt(str)));
  };

  $scope.isLetter = function(str) {
    return str.match(/[a-z]/i) !== null;
  };

  $scope.isCapital = function(str) {
    if($scope.isLetter(str) && str.toUpperCase() === str) {
                  return true;
    }
      return false;
  };

  $scope.isEmpty = function(str) {
    return (!str || 0 === str.length);
  };

  $scope.validatePassword = function(user){
      var pass1 = user.password;
      var pass2 = user.passwordrepeat;

      if(!$scope.isEmpty(pass1) || !$scope.isEmpty(pass2)){

        var pass1Len = user.password.length;
        var pass2Len = user.passwordrepeat.length;


        if(pass1Len === pass2Len){
          var i = 0;
          var char1 = "";
          var char2 = "";
          for(i = 0; i < pass1Len; i += 1){
            char1 = pass1.charAt(i);
            char2 = pass2.charAt(i);
            if(char1 !== char2){
              return false;
            }
          }
        }
        else{
          return false;
        }
        return true;

      }
      else{
        return false;
      }

    };


    $scope.passwordStrength =  function(password) {    // Checks is password entered is strong i.e has a length of 10 and atleast one capital and common letter, a number and a symbol

        if(!$scope.isEmpty(password)){


         var hasCapital = false;
         var hasCommon = false;
         var hasNumber = false;
         var hasSymbol = false;
         var minLength = 10;
         var passwordLen = password.length;
       var character = "";
       var idx;
         if(passwordLen >= minLength){
                  for(idx = 0; idx < passwordLen; idx += 1){
                         character = password.charAt(idx);
                         if($scope.isLetter(character)){
                                if($scope.isCapital(character)){
                                        hasCapital = true;
                                  }else{
                                         hasCommon = true;
                                  }
                         }else if($scope.isNumber(character)){
                                hasNumber = true;
                         }
                         else{
                                hasSymbol = true;
                         }
                  }

                return hasCommon && hasCapital && hasNumber && hasSymbol;
        }
        return false;
      }

      return false;

    };


    $scope.emailValidation = function(email){

        if($scope.isEmpty(email)){
          return false;
        }
          var hasSymbol = false;
          var emailLen = email.length;
          var i;
          var character = "";
          for(i = 0; i < emailLen; i += 1){
            character = email.charAt(i);
            if(character === "@"){
              hasSymbol = true;
            }
          }
          return hasSymbol;

        };

  /* this function uses firebase simple email and password method to create a user account. */
  $scope.registerUser = function(){

    console.log($scope.validatePassword($scope.user));
    console.log($scope.passwordStrength($scope.user.password));
    console.log($scope.emailValidation($scope.user.email));
    if($scope.validatePassword($scope.user) === true && $scope.passwordStrength($scope.user.password) === true && $scope.emailValidation($scope.user.email) === true){

      var ref = new Firebase("https://comp3550a1.firebaseio.com");
      ref.createUser($scope.user,function(error, userData){
        if(error){
          alert(error);
        }
        else{
          alert("Successfully created user account. You may now login.");
                                console.log(userData);
        }
      });

    }
    else{
      alert("An error occurred.");
    }
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

      geocoder.geocode({latLng: $scope.location}, function(results, status) {
	       if (status === google.maps.GeocoderStatus.OK) {
           /* decode city/town here to organize vendors. */
           $scope.area = results[0].address_components[1].short_name;
           /* update the city list. */
           ref.child("areas").child($scope.area).set(true);
         }

         /* an area was found. */
         if($scope.area !== null){

           /* now that we have an area, we can load suggestions for this area. */
           var suggestionsRef = new Firebase("https://comp3550a1.firebaseio.com/suggestions/" + $scope.area);
           $scope.suggestions = $firebaseObject(suggestionsRef);

         }



       }); /* end geocode block */
    }, function(error){
        alert("There was an error retrieving your location, you may have blocked the location feature.");
				console.log(error);
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
    if(auth !== null){
      id = auth.uid;
      if($scope.area === null){
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
}]);



}());

function changeContent(){
"use strict";
var xmlhttp;

xmlhttp=new XMLHttpRequest();

xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState===4 && xmlhttp.status===200)
    {
    document.getElementById("ajax_use").innerHTML=xmlhttp.responseText;
    }
  };
xmlhttp.open("GET","ajax/ajax_here.txt",true);
xmlhttp.send();
}
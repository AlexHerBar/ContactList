// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBxuKeFRMDtsA_JXEJ-x6piuxHoU5HqkxY",
    authDomain: "contactlist-c51f2.firebaseapp.com",
    databaseURL: "https://contactlist-c51f2.firebaseio.com",
    storageBucket: "contactlist-c51f2.appspot.com",
    messagingSenderId: "1066228972294"
  };
  firebase.initializeApp(config);

var app = angular.module("app", ["ngRoute", "firebase"]);

app.config(function($routeProvider) {
  $routeProvider
  .when("/", {
    templateUrl : "views/contacts.html"
  })
  .when("/new-contact", {
  	templateUrl : "views/new-contact.html"
  })
  .when("/:id/view", {
  	templateUrl : "views/view-contact.html"
  })
  .when("/:id/edit", {
  	templateUrl : "views/edit.html"
  });
});

app.controller("ctrl", function($scope, $firebaseArray, $routeParams, $firebaseObject,$location){
	$scope.params = $routeParams;
	var ref = firebase.database().ref("contacts");
  	$scope.data = $firebaseArray(ref);
  	$scope.dataObj = $firebaseObject(ref);

	$scope.createContact = function(name, email, phone, notes){
		if(notes == undefined){
			notes="";
		}
		$scope.data.$add({
			name : name,
			email : email,
			phone : phone,
			notes : notes
		});
		$location.path("/");
	}

	$scope.deleteContact = function(id){
		swal({   
			title: "Delete Contact",   
			text: "Are you sure?",   
			type: "warning",   	
			showCancelButton: true,   
			confirmButtonColor: "#DD6B55",   
			confirmButtonText: "Yes, delete it!",   
			cancelButtonText: "No, cancel it!",   
			closeOnConfirm: false,   
			closeOnCancel: false 
		}, function(isConfirm){   
			if (isConfirm) {     
				swal("Deleted!", "Your contact file has been deleted.", "success");   
				ref.child(id).remove();
				$location.path("/");
			} else {     
				swal("Cancelled", "Your contact is safe!", "error");   
			} 
		});
		
	}

	$scope.editContact = function(id){
		$scope.dataObj.$save(2);
		$location.path("/");
	}
});
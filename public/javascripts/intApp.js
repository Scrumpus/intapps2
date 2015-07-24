angular.module('intApp', ['ngRoute', 'ngResource', 'ngStorage'])
.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'main.html',
			controller: 'enterCtrl'
		})
		.when('/login', {
			templateUrl: 'login.html',
			controller: 'loginCtrl'
		})
		.when('/postentry', {
			templateUrl: 'postentry.html',
			controller: 'enterCtrl'
		})
})
//service for adding user to database
.factory('postService', function($resource) {
	return $resource('/entry/posts');
})
.factory('tweetService', function($resource) {
	return $resource('/entry/tweet');
})

.controller('enterCtrl', function(postService, $sessionStorage, 
									$scope, $rootScope, $location) {
	$scope.newUser = {};
	$scope.newUser.signup = false;
	$scope.currentUser = $sessionStorage.currentUser;
	$scope.addUser = function(form) {
		console.log($scope.newUser.signup);
		if (form.$invalid) {
			return;
		}
		postService.save($scope.newUser, function() {
			$sessionStorage.currentUser = $scope.newUser;
			$scope.currentUser = $sessionStorage.currentUser;
			$location.path('/postentry');
		})
	}

})
.controller('tweetCtrl', function($scope, tweetService, $window) {
	tweetService.get(function(tweet) {
		$scope.tweet = tweet;
	})
})
.controller('loginCtrl', function($scope, $http, $location, $window) {
	$scope.user = {username: '', password: ''};
	$scope.login = function(user) {
		return $http.post('/auth/login', $scope.user).success(function(data){
		      if(data.state == 'failure'){
		      	$scope.error_message = data.message;
		      }
		      else {
		      	$window.location.href = '/admin';
		      }
		});

	}
})


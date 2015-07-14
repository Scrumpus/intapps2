var app = angular.module('intApp', ['ngRoute', 'ngResource', 'ngStorage']);
app.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'main.html',
			controller: 'mainCtrl'
		})
		.when('/entries', {
			templateUrl: 'postentry.html',
			controller: 'mainCtrl'
		});
});

//service for adding user to database
app.factory('postService', function($resource) {
	return $resource('/api/posts');
});

app.controller('mainCtrl', function(postService, $sessionStorage, $scope, $rootScope, $location) {
	$scope.users = postService.query();
	$scope.currentUser = $sessionStorage.currentUser;
	$scope.addUser = function(form) {
		if (form.$invalid) {
			return;
		}
		postService.save($scope.newUser, function() {
			$sessionStorage.currentUser = $scope.newUser;
			$scope.users = postService.query();
			$scope.currentUser = $sessionStorage.currentUser;
			$location.path('/entries');
		})
	}
});


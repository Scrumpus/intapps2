var app = angular.module('intApp', ['ngRoute', 'ngResource']);
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

app.controller('mainCtrl', function(postService, $scope, $rootScope, $location) {
	$scope.users = postService.query();
	$scope.addUser = function() {
		$rootScope.currentUser = $scope.newUser;
		postService.save($scope.newUser, function() {
			$scope.users = postService.query();
			$location.path('/entries');
		})
	}
});


console.log('yep');
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
})
app.controller('mainCtrl', function(postService, $scope, $location) {
	$scope.users = postService.query();
	$scope.newUser = {
		firstname: '',
		lastname: '',
		email: '',
		zipcode: ''
	}
	$scope.addUser = function() {
		postService.save($scope.newUser, function() {
			$scope.users = postService.query();
			$scope.newUser = {
				firstname: '',
				lastname: '',
				email: '',
				zipcode: ''
			}
			$location.path('/entries');
		})
	}
});


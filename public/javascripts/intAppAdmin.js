angular.module('intAppAdmin', ['ngResource'])
.factory('adminService', function($resource, $http) {
	var entries = $resource('/admin/entries/:id', null, {
		edit: {method: 'PUT'}
	});
	var tweet = $resource('/admin/tweet', null, {
		edit: {method: 'PUT'}
	});

	return {
		edit: function(entry) {
			entry.editable = true;
		},
		save: function(entry) {
			entry.editable = false;
			entries.edit(entry);
		},
		delete: function(entry) {
			entries.delete(entry);
		},
		editTweet: function(content) {
			content.editable = true;
		},
		saveTweet: function(content) {
			content.editable = false;
			tweet.edit(content);
		},
		email: function(content) {
			console.log(content);
			if (content) {
				$http.post('/admin/sendmail', {email: content})
				.success(function(data, status) {

				})
				.error(function(data, status) {

				});
			}
		}
	}
})
.factory('authService', function($http) {
	return {
		logout: function() {
			return $http.get('/auth/logout');
		}
	}
})
.factory('tweetService', function($resource) {
	return $resource('/admin/tweet');
})
.factory('entryService', function($resource) {
	return $resource('/admin/posts');
})
.controller('adminCtrl', function(adminService, entryService, tweetService, $scope) {
	$scope.users = entryService.query();
	$scope.tweet = tweetService.get();
	console.log($scope.tweet)

	$scope.edit = function(entry) {
		adminService.edit(entry);
	}
	$scope.delete = function(entry) {
		adminService.delete(entry);
		var entryIndex = $scope.users.indexOf(entry);
		$scope.users.splice(entryIndex,1);
	}
	$scope.save = function(entry) {
		adminService.save(entry);
	}
	$scope.editTweet = function() {
		adminService.editTweet($scope.tweet);
	}
	$scope.saveTweet = function() {
		adminService.saveTweet($scope.tweet);
	}
	$scope.email = function() {
		adminService.email($scope.emailContent);
	}
})
.factory('downloadService', function($resource) {
	return $resource('/entry/download');
})

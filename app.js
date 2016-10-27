'use strict';

angular.module('sampleApp', [
  'ngRoute',
  'sampleApp.error',
  'sampleApp.home',
  'sampleApp.profile',
])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {

	$locationProvider.html5Mode(true);
	$routeProvider
	.when('/another', {
		templateUrl:'views/another/another.html',
		controller: 'anotherController',
		activetab: 'another',
	})
	.when('/profile', {
		templateUrl:'views/profile/profile.html',
		controller: 'profileController',
		activetab: 'profile',
	})
	.when('/', {
		templateUrl:'views/home/home.html',
		controller: 'homeController',
		activetab: 'home',
	})
	.otherwise({
		templateUrl:'views/error/error.html',
		controller: 'errorController',
		activetab: 'error',
	});
}])

.service('metadataService',['$rootScope', '$http', '$filter', function($rootScope, $http, $filter){

	var self = this;
 
	// Set custom options or use provided fallback (default) options
	self.loadMetadata = function(newRoute) {
		var data = $http({url: 'views/metadata.json', method: 'GET'})
		.success(function(data,status){
			var metadata = data.views[newRoute.activetab].metadata;
			self.title = document.title = metadata.title || 'title here';
	   		self.description = metadata.description || 'description here';
	   		self.keywords = metadata.keywords || 'keywords here';
	   		self.pragma = metadata.pragma || 'cache';
	   		self.robots = metadata.robots || 'index,follow';
		}).error(function(data,status){
			console.error("failed to load metadata json");
		})
	};
	 
	// Route change handler
	$rootScope.$on('$routeChangeSuccess', function (event, newRoute) {
		//console.log(newRoute.activetab);
		self.loadMetadata(newRoute);
	});
}])

.directive('metaproperty', function(metadataService){
	return {
	  restrict: 'A',
	  scope: {
	    metaproperty: '@'
	  },
	  link: function postLink(scope, element, attrs) {
	    scope.default = element.attr('content');
	    scope.metadata = metadataService;
	 
	    // Watch for metadata changes and set content
	    scope.$watch('metadata', function (newVal, oldVal) {
	      setContent(newVal);
	    }, true);
	 
	    // Set the content attribute with new metadataService value or back to the default
	    function setContent(metadata) {
	      var content = metadata[scope.metaproperty] || scope.default;
	      element.attr('content', content);
	    }
	 
	    setContent(scope.metadata);
	  }
	};
})

.controller('mainController', function($scope, $route, $location, metadataService){
  	console.log("main controller");

  	$scope.$route = $route;
  	$scope.$on("$routeChangeSuccess", function(event, current, previous){
    	$scope.activeTab = $route.current.activetab;
  	});
  	$scope.isCollapsed;
  	$scope.NavBarCtrl = function(){
    	$scope.isCollapsed = true;
  	};
})

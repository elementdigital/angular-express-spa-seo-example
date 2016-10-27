'use strict';

angular.module('sampleApp.profile', ['ngRoute'])

.controller('profileController', function($scope, $route, $routeParams, $location) {
  $scope.name = 'ProfileController';
  console.log('profileController');
});
'use strict';

angular.module('sampleApp.another', ['ngRoute'])

.controller('anotherController', function($scope, $route, $routeParams, $location) {
  $scope.name = 'anotherController';
  console.log('anotherController');
});
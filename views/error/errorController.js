'use strict';

angular.module('sampleApp.error', ['ngRoute'])

.controller('errorController', function($scope, $route, $routeParams, $location) {
  console.log('errorController');
});
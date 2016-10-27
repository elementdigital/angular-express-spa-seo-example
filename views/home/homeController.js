'use strict';

angular.module('sampleApp.home', ['ngRoute'])

.controller('homeController', function($scope, $route, $routeParams, $location) {
  console.log('homeController');
});
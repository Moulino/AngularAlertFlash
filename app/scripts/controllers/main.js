'use strict';

/**
 * @ngdoc function
 * @name angularAlertFlashApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularAlertFlashApp
 */
angular.module('angularAlertFlashApp')
  .controller('MainCtrl', function ($scope, alertService, $interval) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

        $interval(function() {alertService.info("Some information regarding bla bla bla");}, 1000, 2);

        $interval(function() {alertService.success("success message regarding bla bla bla");}, 1200, 4);

        $interval(function() {alertService.error("error message regarding bla bla bla");}, 1500, 3);
  });

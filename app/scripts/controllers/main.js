'use strict';

/**
 * @ngdoc function
 * @name angularAlertFlashApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularAlertFlashApp
 */
angular.module('angularAlertFlashApp')
  .controller('MainCtrl', function ($scope, flashAlert, $interval) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

        $interval(function() {flashAlert.info("Some information regarding bla bla bla");}, 1000, 2);

        $interval(function() {flashAlert.success("success message regarding bla bla bla");}, 1200, 4);

        $interval(function() {flashAlert.error("error message regarding bla bla bla");}, 1500, 3);
  });

/**
 * Created by nishith.modi on 24/11/14.
 */

'use strict';
angular.module('alert', [])
    .constant('alertConfig', {
        success: 'alert-success',
        error: 'alert-danger',
        info: 'alert-info'
    })
    .provider('alertService', function(){
        var message = [];
        var flashTime = 5000;

        return {
            setAlertTime: function(value) {
              flashTime = value;
            },
            $get: ['$timeout', 'alertConfig', function ($timeout,alertConfig) {
                return {
                    success: function (msg) {
                        this.add('success', msg);
                    },
                    error: function (msg) {
                        this.add('error', msg);
                    },
                    info: function (msg) {
                        this.add('info', msg);
                    },
                    getAlert: function () {
                        return message;
                    },
                    add: function (type, msg) {
                        var alertPack = {
                            typeOfAlert: alertConfig[type],
                            msg: msg
                        };

                        message.push(alertPack);
                        this.hideAlert(alertPack);
                    },
                    hideAlert: function () {
                        $timeout(function () {
                            message.shift();
                        }, flashTime);
                    }
                }
        }]
    }
    })
    .directive('alertFlash', ['alertService', function(alertService) {
        return {
            restrict: 'E',
            template: "<div class='alert-container'><div class='repeat-animation' ng-repeat='alert in alerts'><div class='alert' ng-class='alert.typeOfAlert' ng-bind='alert.msg'></div></div></div>",
            scope: {},
            link: function($scope) {
                $scope.$watch(alertService.getAlert, function(){
                    $scope.alerts = alertService.getAlert();
                });
            }
        }
    }]);

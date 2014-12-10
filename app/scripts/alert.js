/**
 * Created by nishith.modi on 24/11/14.
 */

/**
 * @ngDoc
 * @author nishith modi
 * @name alert module
 * @module
 *
 * @description creats stack of alerts based on calls.
 * It provides one service(configurable) and directive
 * alert.js and alert.css file is required to use this module in your application
 *
 * How to use it:
 * inject module 'alert' at your application root.
 * Use alertServiceProvider to config the following:
 *      (1) alertServiceProvider.setAlertTime(millis) : Up to what millisecond time, alert is to be shown
 *
 * <alert-flash></alert-flash> - use this element in your body and within the scope of angular
 * inject 'alertService' in controller and use the following methods:
 *       (1) alertService.success(message) - success message to be shown
 *       (2) alertService.error(message) - error message to be shown
 *       (3) alertService.info(message) - info message to be shown
 *
 * Animation is also added, will work if ngAnimate is included
 */
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
                        }

                        message.push(alertPack);
                        this.hideAlert(alertPack);
                    },
                    hideAlert: function (which) {
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
            link: function($scope, $element, $attrs) {
                $scope.$watch(alertService.getAlert, function(){
                    $scope.alerts = alertService.getAlert();
                });
            }
        }
    }]);

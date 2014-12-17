/**
 * Created by nishith.modi on 16/12/14.
 */

'use strict';
describe('module: alert', function(){

    // inject alert module
    beforeEach(module('alert'));

    // test alert constants
    describe('alert constants', function(){

        // check alert constants
        it('should check constants value', inject(function(alertConfig){
            expect(alertConfig.success).toEqual('alert-success');
            expect(alertConfig.error).toEqual('alert-danger');
            expect(alertConfig.info).toEqual('alert-info');
        }));
    });

    // test alert service provider
    describe('flashAlertProvider', function(){

        var AlertServiceProvider;
        beforeEach(function(){
            // Initialize the service provider by injecting it to a fake module's config block
            angular.module('testApp', function () {})
                .config(function (flashAlertProvider) {
                    AlertServiceProvider = flashAlertProvider;
                });
            // Initialize myApp injector
            module('alert', 'testApp');

            // Kickstart the injectors previously registered with calls to angular.mock.module
            inject(function () {});
        });

        it('should change the flash time', function(){

        });
    });

    // test alert service
    describe('flashAlert', function(){

        var alertConfig, alertService, $timeout;

        beforeEach(inject(function(_alertConfig_, flashAlert,_$timeout_){
            alertConfig = _alertConfig_;
            alertService = flashAlert;
            $timeout = _$timeout_;
        }));

        afterEach(function(){
            $timeout.verifyNoPendingTasks();
        });

        it('should add success message', function(){
            expect(alertService.getAlert().length).toBe(0);
            alertService.success('success message');
            expect(alertService.getAlert().length).toBe(1);
            expect(alertService.getAlert()[0].msg).toEqual('success message');
            expect(alertService.getAlert()[0].typeOfAlert).toEqual(alertConfig.success);
            $timeout.flush();
            expect(alertService.getAlert().length).toBe(0);
        });

        it('should add error message', function(){
            expect(alertService.getAlert().length).toBe(0);
            alertService.error('error message');
            expect(alertService.getAlert().length).toBe(1);
            expect(alertService.getAlert()[0].msg).toEqual('error message');
            expect(alertService.getAlert()[0].typeOfAlert).toEqual(alertConfig.error);
            $timeout.flush();
            expect(alertService.getAlert().length).toBe(0);
        });

        it('should add info message', function(){
            expect(alertService.getAlert().length).toBe(0);
            alertService.info('info message');
            expect(alertService.getAlert().length).toBe(1);
            expect(alertService.getAlert()[0].msg).toEqual('info message');
            expect(alertService.getAlert()[0].typeOfAlert).toEqual(alertConfig.info);
            $timeout.flush();
            expect(alertService.getAlert().length).toBe(0);
        });

        it('should add chain of messages and after sometime it should be flushed', function(){
            alertService.success('message 1');
            alertService.success('message 2');
            alertService.error('message 3');
            alertService.info('message 4');
            alertService.error('message 5');
            expect(alertService.getAlert().length).toBe(5);
            $timeout.flush();
            expect(alertService.getAlert().length).toBe(0);
        });

    });
});
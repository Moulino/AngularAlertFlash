AngularAlertFlash
=================

Alert plugin for angular application

Installation
------------

It is available from bower registry:
```
bower install angular-alertflash
```

Usage
-----

Creats stack of alerts based on calls. It provides one service(configurable) and directive.

Include alert.min.js and alert.min.css in html and declare 'alert-flash' directive within scope of your application.
See below for example:

```html 
  <head>
    <link href="dist/alert.min.css" rel="stylesheet">
  </head>
  <body ng-app="myApp">
    <alert-flash></alert-flash>
    <script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.9/angular.js"></script>
    <script src="bower_componentns/AngularAlertFlash/dist/alert.min.js"></script>
  </body>
```

Inject 'alert' module at application level module. Use provider to configure elapsed time for alerts. Default is 5sec.
See below for example:

```js
angular.module('myApp',['alert']).config(function(flashAlertProvider){
    alertServiceProvider.setAlertTime(millis);
});
```

Inject 'flashAlert' in controller to alert.

```js
angular.controller('myController', function(flashAlert){
    flashAlert.success(message);
    flashAlert.error(message);
    flashAlert.info(message)
});
```

To enable animation of flashing alert, include ngAnimate.

'use strict';

/**
 * @name quoteProjectApp
 * @description
 * # quoteProjectApp
 *
 * Main module of the application.
 */
angular
  .module('quoteProjectApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'ngTable',
    'ngMaterial',
    'facebook',
    'ngMessages',
    'ngFileUpload'

  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/quote.html',
        controller: 'QuoteCtrl as my'
      })
      .when('/item', {
        templateUrl: 'views/item.html',
        controller: 'ItemCtrl as my'
      })
      .otherwise({
        redirectTo: '/'
      });

  })
  .config([
    'FacebookProvider',
    function(FacebookProvider) {
      
     var myAppId = '';
     
     // You can set appId with setApp method
     // FacebookProvider.setAppId('myAppId');
     
     /**
      * After setting appId you need to initialize the module.
      * You can pass the appId on the init method as a shortcut too.
      */
     FacebookProvider.init(myAppId);
     
    }
  ])
  .config(function($mdThemingProvider) {
	  $mdThemingProvider.theme('default')
	  .primaryPalette('grey')
	  .accentPalette('blue-grey');
  })


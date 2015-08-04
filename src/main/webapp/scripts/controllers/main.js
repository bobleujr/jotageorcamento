'use strict';

/**
 * 
 * @name quoteProjectApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the quoteProjectApp
 */
angular.module('quoteProjectApp')
  .controller('MainCtrl', function ($scope, Facebook, UserSrvc) {
	  var my = this;
	  my.user = {};
	  my.botao = true;
      
      // Defining user logged status
      my.logged = false;
      
      // And some fancy flags to display messages upon user status change
      my.byebye = false;
      my.salutation = false;
      
      /**
       * Watch for Facebook to be ready.
       * There's also the event that could be used
       */
      $scope.$watch(
        function() {
          return Facebook.isReady();
        },
        function(newVal) {
          if (newVal)
            my.facebookReady = true;
        }
      );
      
      var userIsConnected = false;
      
      Facebook.getLoginStatus(function(response) {
        if (response.status == 'connected') {
          userIsConnected = true;
          my.logged = true;
          UserSrvc.setId(response.authResponse.userID);
          
        }
      });
      
      /**
       * IntentLogin
       */
      my.IntentLogin = function() {
        if(!userIsConnected) {
        	my.logged = false;
        	my.login();
        }
      };
      
      /**
       * Login
       */
       my.login = function() {
         Facebook.login(function(response) {
          if (response.status == 'connected') {
            my.logged = true;
            my.me();
            UserSrvc.setId(response.authResponse.userID);
          }
        
        });
       };
       
       /**
        * me 
        */
        my.me = function() {
          Facebook.api('/me', function(response) {
            /**
             * Using my.$apply since this happens outside angular framework.
             */
            $scope.$apply(function() {
              my.user = response;
            });
            
          });
        };
      
      /**
       * Logout
       */
      my.logout = function() {
        Facebook.logout(function() {
          $scope.$apply(function() {
            my.user   = {};
            my.logged = false;  
          });
        });
      }
      
      /**
       * Events
       */
      $scope.$on('Facebook:statusChange', function(ev, data) {
        console.log('Status: ', data);
        if (data.status == 'connected') {
          $scope.$apply(function() {
        	UserSrvc.setId(data.authResponse.userID);
            my.salutation = true;
            my.byebye     = false; 
            my.logged = true;
          });
        } else {
          $scope.$apply(function() {
            my.salutation = false;
            my.byebye     = true;
            my.logged = false;
            
            // Dismiss byebye message after two seconds
            $timeout(function() {
              my.byebye = false;
            }, 2000)
          });
        }
        
        
      });
  })


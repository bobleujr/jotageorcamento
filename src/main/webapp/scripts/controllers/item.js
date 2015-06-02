'use strict';

/**
 * 
 * @name quoteProjectApp.controller:ItemCtrl
 * @description
 * # ItemCtrl
 * Controller of the quoteProjectApp
 */
angular.module('quoteProjectApp')
  .controller('ItemCtrl', function ($scope, $http, ngTableParams) {
    $scope.items = [];
    
    
    this.loadItems = function() {
      $http.get('/resources/item/list').
        success(function(data, status, headers, config) {
            $scope.items = data;
        }).
        error(function(data, status, headers, config) {
            return undefined;
        });
    }

    this.loadItems();

  })
  .service('ItemSrvc', function(){
    
  });

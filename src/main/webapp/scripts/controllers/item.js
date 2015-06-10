'use strict';

/**
 * 
 * @name quoteProjectApp.controller:ItemCtrl
 * @description
 * # ItemCtrl
 * Controller of the quoteProjectApp
 */
angular.module('quoteProjectApp')
  .controller('ItemCtrl', function ($scope, $http, ngTableParams, $mdDialog) {
    var my = this;
    $scope.data = [];
    
    my.tableParams = new ngTableParams({
        page: 1,            // show first page
        count: 10           // count per page
    }, {
        total: $scope.data.length, // length of data
        getData: function ($defer, params) {
            $defer.resolve($scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            my.tableParams.total($scope.data.length);
        }
    })

    
    my.loadItems = function() {
      $http.get('/resources/item/list').
        success(function(data, status, headers, config) {
            $scope.data = data;
            my.tableParams.total($scope.data.length);
            my.tableParams.reload();
        }).
        error(function(data, status, headers, config) {
            return undefined;
        });
    }

    my.loadItems();

    my.showAddItem = function(ev){
    	$mdDialog.show({
    	      controller: AddItemCtrl,
    	      templateUrl: 'views/addItem.html',
    	      parent: angular.element(document.body),
    	      targetEvent: ev,
    	    })
    	    .then(function(answer) {
    	    	answer.name = answer.category + answer.code;
    	    	$http.post('/resources/item/add', answer).
    	        success(function(data, status, headers, config) {
    	        	$scope.data.push(answer);
    	        	my.tableParams.reload();
    	        }).
    	        error(function(data, status, headers, config) {
    	            return undefined;
    	        });

    	    }, function() {

    	    });	    
    }

  })

  function AddItemCtrl($scope, $mdDialog) {
	  $scope.item = {};
	  

	  $scope.cancel = function() {
	    $mdDialog.cancel();
	  };
	  $scope.addItem = function() {
	    $mdDialog.hide($scope.item);
	  };
	}

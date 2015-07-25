'use strict';

/**
 * 
 * @name quoteProjectApp.controller:ItemCtrl
 * @description
 * # ItemCtrl
 * Controller of the quoteProjectApp
 */
angular.module('quoteProjectApp')
  .controller('ItemCtrl', function ($scope, $http, ngTableParams, $mdDialog, UserSrvc) {
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
      $http.post('/resources/item/list',{id:UserSrvc.getId()}).
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
    	    	answer.idUser = UserSrvc.getId();
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
  .service('fileUpload', ['$http', '$q', function ($http, $q) {
    
	this.uploadFileToUrl = function(file, uploadUrl){
        var fd = new FormData();
        fd.append('file', file);
        var promise = $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        }).then(function(response){
        	return response.data.id;
        })

        return promise;
    }
  }]);

  function AddItemCtrl($scope, $mdDialog, fileUpload) {
	  $scope.item = {};
	  

	  $scope.cancel = function() {
	    $mdDialog.cancel();
	  };
	  $scope.addItem = function() {
		  $mdDialog.hide($scope.item);
	  };
	  
	  $scope.$watch('files', function () {
	        if($scope.files != undefined){
	        	fileUpload.uploadFileToUrl($scope.files[0], '/upload').then(function(id){ 
	        		$scope.item.idFile = id;
	        	});
	        	
	        }
	    });
	    
	  
	  
	}

'use strict';

/**
 * @name quoteProjectApp.controller:QuoteCtrl
 * @description
 * # QuoteCtrl
  * Controller of the quoteProjectApp
  */
 angular.module('quoteProjectApp')

 .controller('QuoteCtrl', ['$scope', '$http', '$timeout', '$q', '$log', 'UserSrvc', function ($scope, $http, $timeout, $q, $log, UserSrvc) {
	  var my = this;
	  my.data = [];
	  my.empresa = [];
	  my.list = [];
	  
	  	
	  my.addToQuote = function () {
		  if(my.selectedItem == undefined) return;
		  
		  var itemCopy = angular.copy(my.selectedItem,itemCopy);
		  
		  my.list.push(itemCopy);
		  console.log(my.list);
		  my.searchText = '';
		  my.selectedItem.quantity = '';
		  my.selectedItem = undefined;
		  
		  console.log(my.list);
	  }
	  
	  my.removeFromList = function(obj){
		  var index = my.list.indexOf(obj);
		  my.list.splice(index, 1); 
		  console.log("removed "+obj);
	  }
	  
	  
	  	my.simulateQuery = false;
	    my.isDisabled    = false;
	    my.data         = loadAll();
	    my.querySearch   = querySearch;
	    my.selectedItemChange = selectedItemChange;
	    my.searchTextChange   = searchTextChange;
	    // ******************************
	    // Internal methods
	    // ******************************
	    /**
	     * Search for data... use $timeout to simulate
	     * remote dataservice call.
	     */
	    function querySearch (query) {
	      var results = query ? my.data.filter( createFilterFor(query) ) : my.data,
	          deferred;
	      if (my.simulateQuery) {
	        deferred = $q.defer();
	        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
	        return deferred.promise;
	      } else {
	        return results;
	      }
	    }
	    function searchTextChange(text) {
	      $log.info('Text changed to ' +  text);
	    }
	    function selectedItemChange(item) {
	      $log.info('Item changed to ' +  JSON.stringify(item));
	    }
	    /**
	     * Build `components` list of key/value pairs
	     */
	    function loadAll() {
	    	$http.post('/resources/item/list',{id:UserSrvc.getId()}).
	        success(function(data, status, headers, config) {
	            my.data = data;
	            return data.map( function (item) {
	    	        item.value = item.propertyMap.name.toLowerCase();
	    	        return item;
	    	      });
	        }).
	        error(function(data, status, headers, config) {
	            return undefined;
	        });
	    	
	      
	    }
	    /**
	     * Create filter function for a query string
	     */
	    function createFilterFor(query) {
	      var lowercaseQuery = angular.lowercase(query);
	      return function filterFn(item) {
	        return (item.value.indexOf(lowercaseQuery) === 0);
	      };
	    }
  }]);

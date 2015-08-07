'use strict';

/**
 * @name quoteProjectApp.controller:QuoteCtrl
 * @description
 * # QuoteCtrl
  * Controller of the quoteProjectApp
  */
 angular.module('quoteProjectApp')

 .controller('QuoteCtrl', ['$scope', '$http', '$timeout', '$q', '$log', 'UserSrvc', '$window', function ($scope, $http, $timeout, $q, $log, UserSrvc, $window) {
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
	    
	    my.generateReport = function(divName){
	    	if(my.empresa.jotage == true){
	    		
	    	}
	    	var printContents = document.getElementById(divName).innerHTML;
	        var originalContents = document.body.innerHTML;      

	        if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
	            var popupWin = window.open('', '_blank', 'width=1024,height=600,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
	            popupWin.window.focus();
	            popupWin.document.write('<!DOCTYPE html><html><head>' +
	                '<link rel="stylesheet" href="styles/main.css"><link rel="stylesheet" type="text/css" media="print" href="styles/print.css">' +
	                '</head><body onload="window.print()"><div class="reward-body">' + printContents + '</div></html>');
	            popupWin.onbeforeunload = function (event) {
	                popupWin.close();
	                return '.\n';
	            };
	            popupWin.onabort = function (event) {
	                popupWin.document.close();
	                popupWin.close();
	            }
	        } else {
	            var popupWin = window.open('', '_blank', 'width=800,height=600');
	            popupWin.window.focus();
	            popupWin.document.open();
	            popupWin.document.write('<html><head><link rel="stylesheet" href="styles/main.css"><link rel="stylesheet" type="text/css" media="print" href="styles/print.css"></head><body onload="window.print()">' + printContents + '</html>');
	            popupWin.document.close();
	        }
	        popupWin.document.close();

	        return true;
	    	
	    	
	    	
	    	
	    	
	    	
	    	
//	    	var printContents = document.getElementById(divName).innerHTML;
//	    	var popupWin = window.open('', '_blank', 'width=800,height=600');
//	    	popupWin.document.open()
//	    	popupWin.document.write('<html><head><link rel="stylesheet" href="styles/main.css"><link rel="stylesheet" type="text/css" media="print" href="styles/print.css"></head><body onload="window.print()">' + printContents + '</html>');
//	    	popupWin.document.close();
	    }
  }]);

/**
 * Author Paulo Guilherme Tabarro
 */

angular.module('quoteProjectApp')
	.service('UserSrvc', function ($http, $q) {
	    var my = this;
	    
	    my.id = '';
	    
	    my.setId = function(id){
	    	my.id = id;
	    }
	    
	    my.getId = function(){
	    	return my.id;
	    }
	    
	});
	    
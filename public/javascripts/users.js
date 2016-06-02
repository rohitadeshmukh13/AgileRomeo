'use strict';
/**
 * @ngdoc function
 * @name aromeo.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the Agileromeo app
 */
 var app = angular.module('tango',[]);
 // angular.module('tango',[])
 app.factory('Users', function($http){
   return {
    get : function() {
      return $http.get('/api/users');
    }
  }
});


  // angular.module('tango',[])
  app.controller('UsersCtrl', function($scope,$http){
  
  $scope.formData = {};

        // when landing on the page, get all todos and show them
        $http.get('/api/users')
                .success(function(data) {
                        $scope.users = data;
                })
                .error(function(data) {
                        console.log('Error: ' + data);
                });

});
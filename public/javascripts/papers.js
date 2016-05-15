'use strict';
/**
 * @ngdoc function
 * @name aromeo.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the Agileromeo app
 */
 angular.module('paper',[])
 .factory('Papers', function($http){
   return {
    get : function() {
      return $http.get('/api/papers');
    },
    create : function(paperData) {
      return $http.post('/api/papers', paperData);
    },
    delete : function(id) {
      return $http.delete('/api/papers/' + id);
    }
  }
});


  angular.module('paper',[])
  .controller('PapersCtrl', function($scope,$http){
  
  $scope.formData = {};

        // when landing on the page, get all papers and show them
        $http.get('/api/papers')
                .success(function(data) {
                        $scope.papers = data;
                })
                .error(function(data) {
                        console.log('Error: ' + data);
                });

        $scope.createPaper = function() {
                $http.post('/api/papers', $scope.formData)
                        .success(function(data) {
                                $scope.formData = {}; // clear the form so our user is ready to enter another
                                $scope.papers = data;
                        })
                        .error(function(data) {
                                console.log('Error: ' + data);
                        });
        };

        // delete a paper after checking it
        $scope.deletePaper = function(id) {
                $http.delete('/api/papers/' + id)
                        .success(function(data) {
                                $scope.papers = data;
                        })
                        .error(function(data) {
                                console.log('Error: ' + data);
                        });
        };

        


});
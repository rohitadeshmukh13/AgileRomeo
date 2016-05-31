'use strict';
/**
 * @ngdoc function
 * @name aromeo.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the Agileromeo app
 */
angular.module('aromeo',['tango'])
  .controller('MainCtrl', function($scope,$position) {
    $scope.testval='TEST';
  });

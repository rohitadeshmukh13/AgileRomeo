'use strict';
/**
 * @ngdoc function
 * @name aromeo.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the Agileromeo app
 */
 angular.module('aromeo',[])
 .factory('Papers', function($http){
   return {
    get : function() {
      return $http.get('/api/papers');
    },
    create : function(paperData) {
      return $http.post('/api/papers', paperData);
    },
    update : function(id, paperData) {
      return $http.post('/api/papers/' + id, paperData);
    },
    delete : function(id) {
      return $http.delete('/api/papers/' + id);
    }
  }
});


  angular.module('aromeo',['autocomplete','autocomp','tango'])

  .controller('PapersCtrl', ['$scope','$http','$rootScope','ObjectRetriever','Users','auth', 
    function($scope,$http,$rootScope,ObjectRetriever,Users,auth){
  
  //$scope.formData = {};
  var currUserID = auth.currentUserID();

        // when landing on the page, get all papers and show them
        $scope.getAllPapers = function(id) {
        $http.get('/api/papers')
                .success(function(data) {
                        $scope.papers = data;
                })
                .error(function(data) {
                        console.log('Error: ' + data);
                });
        };

        $scope.getMyPapers = function() {
                $http.get('/api/mypapers/' + currUserID)
                        .success(function(data) {
                                $scope.mypapers = data;
                        })
                        .error(function(data) {
                                console.log('Error: ' + data);
                        });
        };

        $scope.createPaper = function() {
                $http.post('/api/papers', $scope.formData)
                        .success(function(data) {
                                //$scope.formData = {}; // clear the form so our user is ready to enter another
                                $scope.papers = data;
                        })
                        .error(function(data) {
                                console.log('Error: ' + data);
                        });
        };

        $scope.updatePaper = function(id) {
                //$scope.formData.updatedAt = Date.now;
                if($scope.formData.title == null || $scope.formData.title ==""){
                    return;
                }
                $http.put('/api/papers/' + id, $scope.formData)
                        .success(function(data) {
                                //$scope.formData = {}; // clear the form so our user is ready to enter another
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

        // --------------------------------------------------------------

        $scope.savePaper = function(paper) {
            paper.status =  "Incomplete";
            if (paper.title != null && paper.title != "" && paper.abstract != null 
                && paper.abstract != "")
            {
                paper.status = "Completed";
            }

            $rootScope.ppr = paper;
        };

        $scope.getPaper = function() {
            //$scope.formData = $rootScope.ppr;
            var temp = JSON.parse(JSON.stringify($rootScope.ppr)); // only return copy of object, not ref
            return temp;
        };

        $scope.usernames = [];
        $scope.formData = new Object();
        var j = 0;
        $scope.formData.authors = [];
        /*if(typeof $scope.formData.authors === 'undefined' || $scope.formData.authors === null){
            $scope.formData.authors = [];
        }
        else{
            j = $scope.formData.authors.length;
        }*/
        $scope.formData.authorIDs = [];

        Users.get()
                .success(function(data) {
                        $scope.users = data;
                        for (var i = 0; i < data.length; i++) {
                             $scope.usernames[i] = $scope.users[i].username;
                        }
                })
                .error(function(data) {
                        console.log('Error: ' + data);
                });

        // gives another object array on change
        $scope.updateObjects = function(){
            // ObjectRetriever could be some service returning a promise
            $scope.newobjects = ObjectRetriever.getobjects($scope.usernames);
            $scope.newobjects.then(function(data){
                $scope.objects = data;
            });

            j = $scope.formData.authors.length;
            if(typeof $scope.formData.authorIDs === 'undefined' || $scope.formData.authorIDs === null){
                $scope.formData.authorIDs = [];
            }
            for (var i = 0; i < $scope.users.length; i++) {
                if($scope.selected == $scope.users[i].username){
                    $scope.formData.authors[j] = $scope.users[i];
                    $scope.formData.authorIDs[j++] = $scope.users[i]._id;
                    $scope.selected = "";
                }
            }
        }

        $scope.deleteAuthor = function(author){
            var index=$scope.formData.authors.indexOf(author);
            j = $scope.formData.authors.length;
            if(typeof $scope.formData.authorIDs === 'undefined' || $scope.formData.authorIDs === null){
                $scope.formData.authorIDs = [];
            }
            $scope.formData.authors.splice(index,1); 
            $scope.formData.authorIDs.splice(index,1);
            j--; 
        }

        $scope.prepCreatePaper = function(){
            if($scope.formData.title == null || $scope.formData.title ==""){
                return;
            }
            Users.searchById(auth.currentUserID())
                .success(function(data) {
                    // $scope.formData.creator = data._id;
                    $scope.formData.creator = data;
                    // creator is also an author; so if the author's list doesn't contain creator as author, add it
                    var indx = $scope.formData.authorIDs.indexOf($scope.formData.creator._id);
                    if(indx == -1)
                        $scope.formData.authors.push($scope.formData.creator);

                    $scope.createPaper();
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        }

        // $scope.mouseHoverIn = function(){
        //     this.flag = true;
        // };

        // $scope.mouseHoverOut = function(){
        //     this.flag = false;
        // };

        $scope.checkInput = function(input){
            if(input == null || input == "")
                this.errflag = true;
            else
                this.errflag = false;
        };

}]);


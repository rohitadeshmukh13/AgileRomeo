'use strict';
/**
 * @ngdoc overview
 * @name aromeo
 * @description
 * # aromeo
 *
 * Main module of the application.
 */
angular.module('aromeo', [
    'oc.lazyLoad',
    'ui.router',
    'ui.bootstrap',
    'angular-loading-bar',
  ])
  .config(['$stateProvider','$urlRouterProvider','$ocLazyLoadProvider',function ($stateProvider,$urlRouterProvider,$ocLazyLoadProvider) {

    $ocLazyLoadProvider.config({
      debug:false,
      events:true,
    });

    $urlRouterProvider.otherwise('/login');

    $stateProvider
      .state('home', {
        url:'/home',
        templateUrl: 'pages/main.html',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'aromeo',
                    files:[
                    'javascripts/header/header.js',
                    'javascripts/header/header-notification/header-notification.js',
                    'javascripts/sidebar/sidebar.js'
                                        ]
                }),
                $ocLazyLoad.load(
                {
                   name:'toggle-switch',
                   files:["bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                          "bower_components/angular-toggle-switch/angular-toggle-switch.css"
                      ]
                }),
                $ocLazyLoad.load(
                {
                  name:'ngAnimate',
                  files:['bower_components/angular-animate/angular-animate.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngCookies',
                  files:['bower_components/angular-cookies/angular-cookies.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngResource',
                  files:['bower_components/angular-resource/angular-resource.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngSanitize',
                  files:['bower_components/angular-sanitize/angular-sanitize.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngTouch',
                  files:['bower_components/angular-touch/angular-touch.js']
                })
            }
        }
    })
      .state('home.dashboard',{
        url:'/dashboard',
        controller: 'MainCtrl',
        templateUrl:'pages/home.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'aromeo',
              files:[
              'javascripts/main.js',
              'javascripts/timeline/timeline.js',
              'javascripts/notifications/notifications.js',
              'javascripts/chat/chat.js',
              'javascripts/dashboard/stats/stats.js'
              ]
            })
          }
        }
      })
      .state('home.startsprint',{
        templateUrl:'pages/startSprint.html',
        url:'/startsprint'

    })
    .state('home.editprofile',{
      templateUrl:'pages/editprofile.html',
      url:'/edituser'

  })
    .state('home.sprinthome',{
      templateUrl:'pages/sprintbacklog.html',
      url:'/sprintbacklog'

  })
  .state('home.project',{
       templateUrl:'pages/project.html',
       url:'/project',
       resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'aromeo',
              files:[
              
              
              'javascripts/notifications/notifications.js',
              'javascripts/timeline/timeline.js',
              'javascripts/dashboard/stats/stats.js'
              ]
            })
          }
        }
   })

     .state('home.productBacklog',{
       templateUrl:'pages/productBacklog.html',
       url:'/productBacklog'
   })
   .state('home.sprintselect',{
     templateUrl:'pages/sprintselect.html',
     url:'/sprintselect'
 })

     .state('home.createProject',{
       templateUrl:'pages/createProject.html',
       url:'/createProject'
   })
      .state('home.createtask',{
        templateUrl:'pages/createTask.html',
        url:'/createTask'
    })
      .state('login',{
        templateUrl:'pages/login.html',
        url:'/login',
        controller:'AuthCtrl',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'aromeo',
              files:[
              
              'javascripts/angularApp.js',
              'javascripts/auth.js'
              ]
            })
          }
        }
    })
    
      .state('home.taskshome',{
        templateUrl:'pages/taskshome.html',
        url:'/taskshome'
    })
     
  }]);

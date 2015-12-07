(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name app.config:cfg
   *
   * @requires ($urlRouterProvider, $locationProvider, $authProvider)
   * @propertyOf app
   *
   * @description
   * Configuration block for the app
   */

  angular
     .module('wsSeed')
     .config(cfg)
     .run(runAuth);

  cfg.$inject = ['$routeProvider', '$authProvider', '$httpProvider'];

  function cfg($routeProvider, $authProvider,  $httpProvider) {

         $routeProvider.otherwise("/");

          $httpProvider.interceptors.push(function() {
                return{
                        'request': function(config) {
                            return config;
                        }
                }
          });

        $authProvider.httpInterceptor = true;

  }


  function runAuth($rootScope, $window, $auth, UserRemoting, UserStateModel, $log){

    if($auth.isAuthenticated()){
          UserRemoting.getProfile().success(function(data) {
             UserStateModel.setUser(data);
          })
          .error(function(error) {
            $log.debug('[app.config.js]---runAuth error', error);
          });
    }else{
         $log.debug('[app.config.js]---runAuth USER IS NOT Authenticated');
         //need to get an accurate response
         //TODO
         $auth.logout()
    }
  }
}());
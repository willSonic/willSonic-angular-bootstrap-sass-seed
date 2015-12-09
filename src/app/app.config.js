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
     .run(runAuth);

  function runAuth($auth, UserRemoting, UserStateModel){

    if($auth.isAuthenticated()){
          UserRemoting.getProfile()
              .success(function(data) {
                 UserStateModel.setUser(data);
              });
    }else{
         $auth.logout();
    }
  }
}());
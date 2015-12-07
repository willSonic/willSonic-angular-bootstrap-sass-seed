
(function () {
  'use strict';
  /**
   * @ngdoc object
   * @name app.account:cfgAccountRoute
   *
   * @requires ($stateProvider)
   * @propertyOf app.account
   *
   * @description
   * State definitions and configuration for the account module
   */

  angular.module('wsSeed.user.module', ['ngRoute'])
  .constant( "routeStates", {
        loginState: {
          name: 'login',
          url: '/login',
          template: null,
          controller: 'LoginCtrl'
        },
        logoutState: {
          name: 'logout',
          url: '/logout',
          template: null,
          controller: 'LogoutCtrl'
        }
      })
  .config(cfgAccountRoute);
  // inject cfgCocfgAccountRoute dependencies
  cfgAccountRoute.$inject = ['$routeProvider', 'routeStates'];

  // route config function configuring the passed $stateProvider
  function cfgAccountRoute($routeProvider, routeStates) {

    $routeProvider.when(routeStates.loginState.url, routeStates.loginState)
                  .when(routeStates.logoutState.url,routeStates.logoutState);
  }


})();

(function() {
  'use strict';

  /* jshint latedef: nofunc */
  /** @ngdoc controller
   * @name app.account.controller:LogoutCtrl
   *
   * @description
   * Logs the user out of the site
  */
  angular
      .module('wsSeed.userMod')
      .controller('LogoutCtrl', LogoutCtrl);

  LogoutCtrl.$inject = ['$auth','$window','$rootScope'];

  /* @ngInject */
  function LogoutCtrl($auth, $window, $rootScope) {
    var vm = this;

    if (!$auth.isAuthenticated()) {
      return;
    }
    $auth.logout()
      .then(function() {
          $window.localStorage.currentUser  = undefined;
          $rootScope.currentUser = null;
          console.log('logged out');
      });
  }
})();

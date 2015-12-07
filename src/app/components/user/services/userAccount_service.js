
(function() {
  'use strict';

  /* jshint latedef: nofunc */
  /** @ngdoc service
   * @name app.account.service:Account
   *
   * @propertyOf app.account
   * @requires
   * $http
   *
   * @description
   * Service for updating user profiles (accounts)
   */

  angular
      .module('wsSeed.userModule')
      .service('UserRemoting', UserRemoting);

  UserRemoting.$inject = ['$http'];

  function UserRemoting($http) {
    return {
      getProfile: function() {
        return $http.get('/api/me');
      }
    };
  }

})();
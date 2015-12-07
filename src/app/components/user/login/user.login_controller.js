(function() {
  'use strict';

  /* jshint latedef: nofunc */
  /** @ngdoc controller
   * @name app.account.controller:LoginCtrl
   *
   * @description
   * Interface to login a registered user
   */
  angular
      .module('wsSeed.userMod')
      .controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['$scope','$window','$location','$rootScope', '$auth'];
  /* @ngInject */
  function LoginCtrl($scope, $window, $location, $rootScope, $auth) {

    var vm = this;
    $scope.login = function() {
      $auth.login({
        email: $scope.email,
        password: $scope.password
      })
      .catch(function(response) {
          console.log(response.data);
        });
    };

    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
          .then(function(response) {
             $window.localStorage.currentUser = JSON.stringify(response.data.user);
             $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
          })
        .catch(function(response) {
          console.log(response);
        });
    };
  }
})();

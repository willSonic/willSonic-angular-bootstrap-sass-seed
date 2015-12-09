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
      .module('wsSeed.user.module')
      .controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['$uibModalInstance', '$auth'];
  /* @ngInject */
  function LoginCtrl($uibModalInstance, $auth) {

    var vm = this;
    vm.modalInstance = $uibModalInstance;
    vm.login = function() {
      $auth.login({
        email: vm.email,
        password: vm.password
      })
      .then(function() {
          vm.modalInstance.close();
      })
      .catch(function() {
          vm.modalInstance.close();
       });
    };


   /*
    *
    * Used with third party authentications like twitter, google+, facebook, etc.
    vm.authenticate = function(provider) {
      $auth.authenticate(provider)
          .then(function(response) {
             $window.localStorage.currentUser = JSON.stringify(response.data.user);
             $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
          })
        .catch(function(response) {
              console.log(response);
        });
    };
    */
  }
})();

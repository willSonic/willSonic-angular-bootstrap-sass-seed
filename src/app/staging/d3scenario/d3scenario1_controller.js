(function() {
  'use strict';

  /* jshint latedef: nofunc */
  /** @ngdoc controller
   * @name wsSeed.coreModule.controller:CoreBaseCtrl
   *
   * @description
   * Interface to login a registered user(
   */
  angular
  .module('wsSeed.mainStage.module')

  .controller('D3scenario1Ctrl', D3scenario1Ctrl);

  D3scenario1Ctrl.$inject = ['$scope'];
      /* @ngInject */
  function D3scenario1Ctrl($scope) {
     var vm  = this;
     vm.viewState ='D3scenario1Ctrl';
   }
})();

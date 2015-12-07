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
  .module('wsSeed.app.core.module')
  .controller('CorebaseCtrl', CorebaseCtrl);

  CorebaseCtrl.$inject = ['$scope', '$auth', '$uibModal', 'PubSub', '$log'];
      /* @ngInject */
      function CorebaseCtrl($scope, $auth, $uibModal, PubSub, $log) {

            var vm = this;
            $scope.animationsEnabled = true;
            $scope.loginLoaded = false;

            function sendNotification(event){
               /*  PubSub.publish({
                       type:PubSub.notifyTypes().MD_DIALOG_COMPLETE,
                       data:event
                 });*/
             }


           /* Global Event handler used for capturing request
            *
            */

            PubSub.subscribe($scope, function publishEvent(event, notifyData) {
                if(notifyData.type == PubSub.notifyTypes().AUTH_REQUEST){
                  $log.debug("[appbase.controller.js --- PubSub.subscribe notifyData.data.event =");
                 showLogin();
                }
            });

            function showLogin() {
                    var modalInstance = $uibModal.open({
                      animation: $scope.animationsEnabled,
                      templateUrl: 'myModalContent.html',
                      controller: 'LoginCtrl',
                      size: 'lg',
                      resolve: {
                        items: function () {
                          return $scope.items;
                        }
                      }
                    });

                    modalInstance.result.then(function (selectedItem) {
                      $scope.selected = selectedItem;
                    }, function () {
                      $log.info('Modal dismissed at: ' + new Date());
                    });
             }
      }
})();

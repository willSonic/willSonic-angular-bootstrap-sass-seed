(function(){
   'use strict';

   angular
    .module('wsSeed.navbar.module')
    .directive('bootstrapNavBar', bootstrapNavBar);

     function bootstrapNavBar(){
            var directive = {
                    restrict: 'EA',
                    templateUrl:'app/components/navbar/navbar.html',
                    scope: {},
                    controller: NavBarCtrl,
                    controllerAs:'vm'
                    /**
                     * if the scope is isolated
                     * bindToController: true
                     * */
            };

            return directive;
     }


     NavBarCtrl.$inject = ['$window', '$rootScope', 'PubSub', '$auth'];

     function NavBarCtrl($window, $rootScope, PubSub, $auth) {

            var vm = this;

            function sendNotification(){
                PubSub.publish({
                       type:PubSub.notifyTypes().AUTH_REQUEST, data:null
                 });
             }

            vm.linkSelected = function(){
                //$log.console("[NavBarCtrl]");
            };

            vm.isAuthenticated = function(){
                 return $auth.isAuthenticated();
            };

            vm.logoutBtnClicked = function(){
                $auth.logout()
                  .then(function() {
                          $window.localStorage.currentUser  = undefined;
                          $rootScope.currentUser = null;
                      });
            };

            vm.loginBtnClicked = function(){
                sendNotification();
            };
}

}());
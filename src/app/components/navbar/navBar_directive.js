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


     NavBarCtrl.$inject = ['$window', '$rootScope', 'PubSub', '$auth','$route'];

     function NavBarCtrl($window, $rootScope, PubSub, $auth, $route) {

           var vm = this;


           if($route.current && $route.current.name){
                 vm.viewState = $route.current.name;
           }

           $rootScope.$on("$routeChangeStart",   function (event, current) {
                 if(current && current.name){
                     vm.viewState = current.name;
                 }
           });

           function sendNotification(){
                PubSub.publish({
                       type:PubSub.notifyTypes().AUTH_REQUEST, data:null
                 });
           }

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
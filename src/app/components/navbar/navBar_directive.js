
'user strict'


angular.module('wsSeed.btNavBar_directive', [])

.controller('NavBarCtrl',['$log', function($log){
    var vm = this;
    var previousClick = null;

    vm.linkSelected = function(){
        $log.console("[NavBarCtrl]")
    }

    vm.isAuthenticated = function(){
         return false;
    }
   }
])

.directive('btNavBar', function(){

        return {
            restrict: 'A',
            scope: {
              loggedIn: '='
            },
            templateUrl:"app/components/navbar/navbar.html",
            transclude:true,
            controllerAs: 'NavBarCtrl',

            link: function (scope) {
              scope.loggedIn.value = 'newValue';
            }
        }
 });
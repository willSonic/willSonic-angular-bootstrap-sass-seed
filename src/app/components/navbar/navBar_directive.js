
(function(){
'user strict'

angular.module('wsSeed.navbarModule')
.directive('btNavBar', btNavBar);

function btNavBar(){
    var directive = {
            restrict: 'EA',
            templateUrl:"app/components/navbar/navbar.html",
            scope: {
              loggedIn: '='
            },
            link: linkFunc,
            controller: NavBarCtrl,
            controllerAs:'vm',
            bindToController: true // because the scope is isolated

    }

    return directive;

    function linkFunc(scope, el, attr, ctrl) {
          scope.loggedIn = false;
    }
 };


NavBarCtrl.$inject = ['$scope','$log', 'PubSub'];

function NavBarCtrl($scope, $log, PubSub) {
    var vm = this;
    vm.authenticated = false;

    function sendNotification(){
        PubSub.publish({
               type:PubSub.notifyTypes().AUTH_REQUEST, data:null
         });
     }

    vm.linkSelected = function(){
        $log.console("[NavBarCtrl]");
    }

    vm.isAuthenticated = function(){
         return false;
    }

    vm.loginBtnClicked = function(){
       $log.debug("[NavBarCtrl] -- calling sendNotification")
       if(!vm.authenticated){
          sendNotification();
       }
    }
}

}());
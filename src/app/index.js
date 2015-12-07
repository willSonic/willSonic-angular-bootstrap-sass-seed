(function() {
  'use strict';
// Declare app level module which depends on views, and components

   angular.element(document).ready(function() {
    angular.bootstrap(document, ['wsSeed']);
  });

  angular.module('wsSeed', [
    'ngRoute',
    'wsSeed.view1',
    'wsSeed.view2',
    'wsSeed.version',
    'satellizer',
    'wsSeed.coreModule',
    'wsSeed.navBarMod',
    'wsSeed.userMod'
  ]);

})();

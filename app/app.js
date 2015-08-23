(function () {
  'use strict';
  angular.module('taximk', ['ui.router', 'taximk.config', 'taximk.data'])
    .run(function ($rootScope, $location, $window) {
      $rootScope.$on('$stateChangeSuccess', function (event) {
        if (!$window.ga)
          return;
        $window.ga('send', 'pageview', {page: $location.path()});
      });
    });
})();
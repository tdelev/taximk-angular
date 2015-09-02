(function () {
  'use strict';
  angular
    .module('taximk')
    .config(States);

  function States($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider.state('index', {
      url: '/',
      templateUrl: 'views/companies.html',
      controller: 'Company',
      controllerAs: 'company',
      resolve: {
        taxi: function (taxi) {
          return taxi;
        },
        place: function () {
          return null;
        }
      }
    }).state('taxi', {
      url: '/taxi/:placeId/:slug?',
      templateUrl: 'views/companies.html',
      controller: 'Company',
      controllerAs: 'company',
      resolve: {
        taxi: function ($stateParams, $filter, taxi) {
          if ($stateParams.placeId) {
            var filtered = $filter('filter')(taxi, function (value, index) {
              var placeId = parseInt($stateParams.placeId, 10);
              return value.place.id === placeId;
            });
            return filtered;
          } else {
            return taxi;
          }
        },
        place: function ($stateParams, $filter, places) {
          if ($stateParams.placeId) {
            var filtered = $filter('filter')(places, function (value, index) {
              var placeId = parseInt($stateParams.placeId, 10);
              return value.id === placeId;
            });
            return filtered[0];
          } else {
            return null;
          }
        }
      }
    });
  }

})();

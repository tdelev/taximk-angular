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
          return taxi.data;
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
            var filtered = $filter('filter')(taxi.data, function (value, index) {
              return value.place.id == $stateParams.placeId;
            });
            return filtered;
          } else {
            return taxi.data;
          }
        },
        place: function ($stateParams, $filter, places) {
          if ($stateParams.placeId) {
            var filtered = $filter('filter')(places.data, function (value, index) {
              return value.id == $stateParams.placeId;
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
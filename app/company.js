(function () {
  'use strict';
  angular
    .module('taximk')
    .controller('Company', Company);

  function Company(taxi, place) {
    var vm = this;
    vm.taxi = taxi;
    vm.place = place;
  }
})();
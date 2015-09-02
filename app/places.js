(function () {
  'use strict';
  angular
    .module('taximk')
    .controller('Places', Places);

  function Places(places) {
    var vm = this;
    vm.places = places;
  }
})();

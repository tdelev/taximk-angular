(function () {
  'use strict';
  angular
    .module('taximk')
    .controller('Main', Main);

  function Main(version) {
    var vm = this;
    vm.version = version;
  }
})();

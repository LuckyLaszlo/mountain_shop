angular.module('mountainShop').controller('productsController', function ($scope, $state, $stateParams, $http, $filter, $timeout, MountainModel) {
  $scope.isLoaded = false;
  $scope.currentPage = 1;
  $scope.pageSize = 6;
  $scope.search = {
    type: '',
    brand: ''
  };
  $scope.search.type = $stateParams.category;

  $scope.resetSearch = function () {
    $scope.search = {};
    $scope.order = "";
  };

  MountainModel.getProducts().then(
    function (res) {
      $scope.products = res.data;
      $scope.isLoaded = true;
    }
  );
});
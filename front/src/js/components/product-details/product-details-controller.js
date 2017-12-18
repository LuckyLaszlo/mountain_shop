angular.module('mountainShop').controller('productDetailsController', function ($scope, $state, $stateParams, $http) {
  $scope.goBack = goBack;

  function goBack(){
    $state.go('products');
  }

  $scope.product = {
    ref: 24653,
    type: 'Jackets-Coats',
    name: 'Benton Parka',
    brand: 'TIMBERLAND',
    price: 250,
    message: "Short Parka. With it 2 in 1 model, it is very fonctional : both levels can be worn together or separatly, according to outside weather.",
    image: 'parka-benton'
  };
});
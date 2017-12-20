angular.module('mountainShop').controller('productDetailsController', function ($scope, $state, $stateParams, $http, MountainModel) {
  $scope.isLoaded = false;
  $scope.token = '';
  $scope.user_email = '';
  $scope.token = localStorage.getItem('auth-token');
  $scope.user_email = localStorage.getItem('user-email');
  $scope.goBack = _goBack;
  $scope.addToCart = _addToCart;
  $scope.initCart = JSON.parse(localStorage.getItem('user_cart'));
  if ($scope.initCart != null) {
    $scope.carts = JSON.parse(localStorage.getItem('user_cart'));
  } else {
    $scope.carts = [];
  }

  MountainModel.getProductDetails($stateParams.productRef).then(
    function (res) {
      $scope.product = res.data;
      $scope.isLoaded = true;
    },
    function (res) {
      swal({
        title: 'Oops...',
        text: res.data.message,
        type: 'error'
      });
    }
  );

  function _goBack(){
    $state.go('products');
  }

  function _addToCart(){
    if ($scope.user_email != '' && $scope.token != '') {
      $state.go('cart', {productRef: $scope.product.ref});
    } else {
      $scope.carts[$scope.carts.length] = $scope.product;
      localStorage.setItem('user_cart', JSON.stringify($scope.carts));
      $state.go('cart');
    }
  }

});
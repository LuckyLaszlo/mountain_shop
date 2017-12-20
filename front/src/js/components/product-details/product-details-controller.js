angular.module('mountainShop').controller('productDetailsController', function ($scope, $state, $stateParams, $http, MountainModel) {
  $scope.isLoaded = false;
  $scope.goBack = _goBack;
  $scope.addToCart = _addToCart;

  function _goBack(){
    $state.go('products');
  }

  function _addToCart(ref){
    $state.go('cart', {productRef: ref});
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
});
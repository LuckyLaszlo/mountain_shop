angular.module('mountainShop').controller('productDetailsController', function ($scope, $state, $stateParams, $http, MountainModel) {
  $scope.isLoaded = false;
  $scope.goBack = _goBack;
  $scope.addToCart = _addToCart;
  $scope.token = '';
  $scope.user_email = '';
  $scope.token = localStorage.getItem('auth-token');
  $scope.user_email = localStorage.getItem('user-email');
  $scope.initCart = JSON.parse(localStorage.getItem('user-cart'));
  
  if ($scope.initCart != null) {
    $scope.carts = JSON.parse(localStorage.getItem('user-cart'));
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
      MountainModel.cartAdd($scope.user_email, $stateParams.productRef).then(
        function (res) {
        $state.go('cart');
      },
      function (res) {
        swal({
          title: 'Oops...',
          text: res.data.message,
          type: 'error'
        });
      }
    );
    } else {
      $scope.carts[$scope.carts.length] = $scope.product;
      localStorage.setItem('user-cart', JSON.stringify($scope.carts));
      $state.go('cart');
    }
  }

});
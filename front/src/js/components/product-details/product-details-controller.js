angular.module('mountainShop').controller('productDetailsController', function ($scope, $state, $stateParams, $http, MountainModel) {
  $scope.isLoaded = false;
  $scope.goBack = _goBack;
  $scope.addToCart = _addToCart;
  $scope.token = null;
  $scope.user_email = null;
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
      $state.go('products');
    }
  );

  function _goBack() {
    $state.go('products');
  }

  function _addToCart() {
    if ($scope.token && $scope.token != null && $scope.user_email && $scope.user_email != null) {
      MountainModel.cartAdd($scope.user_email, $stateParams.productRef).then(
        function (res) {
          swal({
            type: 'success',
            title: res.data.message,
            showConfirmButton: false,
            timer: 1000
          });
          $state.go('cart');
        },
        function (res) {
          swal({
            title: 'Oops...',
            text: res.data.message,
            type: 'error'
          });
          $state.go('products');
        }
      );
    } else {
      $scope.initCart = JSON.parse(localStorage.getItem('user-cart'));
      if ($scope.initCart != null) {
        $scope.carts = JSON.parse(localStorage.getItem('user-cart'));
      } else {
        $scope.carts = [];
      }
      var found = false;
      for (var i = $scope.carts.length - 1; i >= 0; i--) {
        if ($scope.carts[i].ref == $scope.product.ref) {
          found = true;
        }
      }
      if (!found) {
        $scope.carts[$scope.carts.length] = $scope.product;
        localStorage.setItem('user-cart', JSON.stringify($scope.carts));
        swal({
          type: 'success',
          title: 'Hop hop hop ! In the cart !',
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        swal({
          type: 'error',
          title: 'Already in the cart, Grand fou'
        });
      }
    }
  }

});
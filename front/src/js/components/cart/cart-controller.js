angular.module('mountainShop').controller('cartController', function ($scope, $state, $stateParams, $http, MountainModel) {
  $scope.isLoaded = false;
  $scope.goBack = _goBack;
  $scope.resetCart = _resetCart;

  $scope.token = '';
  $scope.user_email = '';
  $scope.token = localStorage.getItem('auth-token');
  $scope.user_email = localStorage.getItem('user-email');
  $scope.initCart = JSON.parse(localStorage.getItem('user-cart'));
  
  if ($scope.token != '' && $scope.user_email != '') {
    MountainModel.getCart($scope.user_email).then(
      function (res) {
        $scope.carts = res.data;
      },
      function (res) {
        swal({
          title: 'Oops...',
          text: res.data.message,
          type: 'error'
        });
      }
    );
  } else if ($scope.initCart != null) {
    $scope.carts = JSON.parse(localStorage.getItem('user-cart'));
  } else {
    $scope.carts = [];
  }
  _cartTotal($scope.carts);

  function _goBack() {
    $state.go('products');
  }

  function _resetCart() {
    localStorage.setItem('user-cart', null);
    $state.reload();
  }

  function _cartTotal(array) {
    var total = 0;
    angular.forEach(array, function (object) {
      total += (object.price * object.quantity);
    });
    $scope.cartTotal = '$' + total;
  }
});
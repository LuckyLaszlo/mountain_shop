angular.module('mountainShop').controller('cartController', function ($scope, $state, $stateParams, $timeout, $http, MountainModel) {
  $scope.isLoaded = false;
  $scope.goBack = _goBack;
  $scope.resetCart = _resetCart;
  $scope.delFromCart = _delFromCart;

  $scope.token = '';
  $scope.user_email = '';
  $scope.token = localStorage.getItem('auth-token');
  $scope.user_email = localStorage.getItem('user-email');
  $scope.initCart = JSON.parse(localStorage.getItem('user-cart'));
  
  if ($scope.token != '' && $scope.user_email != '') {
    MountainModel.getCart($scope.user_email).then(
      function (res) {
        $scope.carts = res.data;
        _cartTotal($scope.carts);
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
    _cartTotal($scope.carts);
  } else {
    $scope.carts = [];
    _cartTotal($scope.carts);
  }

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

  function _delFromCart(prod) {
    if ($scope.user_email != '' && $scope.token != '') {
      MountainModel.cartDelete($scope.user_email, prod.ref).then(
        function (res) {
          swal({
            type: 'success',
            title: res.data.message,
            showConfirmButton: false,
            timer: 1000
          });
          MountainModel.getCart($scope.user_email).then(
            function (res) {
              $scope.carts = res.data;
              _cartTotal($scope.carts);
            },
            function (res) {
              swal({
                title: 'Oops...',
                text: res.data.message,
                type: 'error'
              });
            }
          );
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
      $scope.initCart = JSON.parse(localStorage.getItem('user-cart'));
      if ($scope.initCart != null) {
        $scope.carts = JSON.parse(localStorage.getItem('user-cart'));
      } else {
        $scope.carts = [];
      }
      var found = false;
      var numb = -1;
      for (var i = $scope.carts.length - 1; i >= 0; i--) {
        if (Number($scope.carts[i].ref) == prod.ref) {
          found = true;
          numb = i;
        }
      }
      if (found) {
        $scope.carts.splice(numb, 1);
        localStorage.setItem('user-cart', JSON.stringify($scope.carts));
        swal({
          type: 'success',
          title: 'Hop hop hop ! Out of the cart !',
          showConfirmButton: false,
          timer: 1000
        });
        _cartTotal($scope.carts);
      } else {
        swal({
          type: 'error',
          title: 'No product found with the ref ' + prod.ref + ' in the cart '
        });
        console.log($scope.carts);
      }
    }
  }
});
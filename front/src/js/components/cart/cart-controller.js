angular.module('mountainShop').controller('cartController', function ($scope, $state, $stateParams, $timeout, $http, MountainModel) {
  $scope.isLoaded = false;
  $scope.cartEmpty = false;
  $scope.goBack = _goBack;
  $scope.resetCart = _resetCart;
  $scope.delFromCart = _delFromCart;
  $scope.plus = _plus;
  $scope.minus = _minus;

  $scope.token = '';
  $scope.user_email = '';
  $scope.token = localStorage.getItem('auth-token');
  $scope.user_email = localStorage.getItem('user-email');
  $scope.initCart = JSON.parse(localStorage.getItem('user-cart'));
  
  // -------------------- GET LIST OF PRODUCT IN CART -------------------
  if ($scope.token != '' && $scope.user_email != '') {
    _getUserCart();
  } else if ($scope.initCart != null) {
    $scope.carts = JSON.parse(localStorage.getItem('user-cart'));
    // Check Cart Empty
    if ($scope.carts[0]) {
      $scope.cartEmpty = false;
    } else {
      $scope.cartEmpty = true;
    }
    _cartTotal($scope.carts);
  } else {
    $scope.carts = [];
    // Check Cart Empty
    if ($scope.carts[0]) {
      $scope.cartEmpty = false;
    } else {
      $scope.cartEmpty = true;
    }
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

  // -------------------- DELETE PRODUCT FROM CART -------------------
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
          _getUserCart();
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
        // Get Cart
        $scope.initCart = JSON.parse(localStorage.getItem('user-cart'));
        if ($scope.initCart != null) {
          $scope.carts = JSON.parse(localStorage.getItem('user-cart'));
        } else {
          $scope.carts = [];
        }
        // Check Cart Empty
        if ($scope.carts[0]) {
          $scope.cartEmpty = false;
        } else {
          $scope.cartEmpty = true;
        }
        // Get Cart Total $$$
        _cartTotal($scope.carts);
      } else {
        swal({
          type: 'error',
          title: 'No product found with the ref ' + prod.ref + ' in the cart '
        });
      }
    }
  }

  // -------------------- ADD QUANTITY TO PRODUCT IN CART -------------------
  function _plus(prod) {
    if ($scope.user_email != '' && $scope.token != '') {
      var modPlus = "+";
      MountainModel.cartModify($scope.user_email, prod.ref, modPlus).then(
        function (res) {
          _getUserCart();
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
        $scope.carts[numb].quantity += 1;
        localStorage.setItem('user-cart', JSON.stringify($scope.carts));
        _cartTotal($scope.carts);
      } else {
        swal({
          type: 'error',
          title: 'No product found with the ref ' + prod.ref + ' in the cart '
        });
      }
    }
  }

  // -------------------- MINUS QUANTITY TO PRODUCT IN CART -------------------
  function _minus(prod) {
    if ($scope.user_email != '' && $scope.token != '') {
      if (prod.quantity > 1) {
        var modMinus = "-";
        MountainModel.cartModify($scope.user_email, prod.ref, modMinus).then(
          function (res) {
            _getUserCart();
          },
          function (res) {
            swal({
              title: 'Oops...',
              text: res.data.message,
              type: 'error'
            });
          }
        );
      }
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
        if (prod.quantity > 1) {
          $scope.carts[numb].quantity -= 1;
          localStorage.setItem('user-cart', JSON.stringify($scope.carts));
          _cartTotal($scope.carts);
        }
      } else {
        swal({
          type: 'error',
          title: 'No product found with the ref ' + prod.ref + ' in the cart '
        });
      }
    }
  }

  // -------------------- GET LIST OF PRODUCT IN CART IF LOGGED -------------------
  function _getUserCart() {
    MountainModel.getCart($scope.user_email).then(
      function (res) {
        $scope.carts = res.data;
        _cartTotal($scope.carts);
      },
      function (res) {
        $scope.carts = [];
        $scope.cartEmpty = true;
        _cartTotal($scope.carts);
      }
    );
  }
});
angular.module('mountainShop').controller('cartController', function ($scope, $state, $stateParams, $http, MountainModel) {
  $scope.isLoaded = false;
  $scope.token = '';
  $scope.user_email = '';
  $scope.token = localStorage.getItem('auth-token');
  $scope.user_email = localStorage.getItem('user-email');
  $scope.goBack = _goBack;
  $scope.resetCart = _resetCart;
  $scope.initCart = JSON.parse(localStorage.getItem('user_cart'));
  if ($scope.initCart != null) {
    $scope.carts = JSON.parse(localStorage.getItem('user_cart'));
  } else {
    $scope.carts = [];
  }
  _cartTotal($scope.carts);

  function _goBack() {
    $state.go('products');
  }

  function _resetCart() {
    localStorage.setItem('user_cart', null);
  }

  function _cartTotal(array) {
    var total = 0;
    angular.forEach(array, function (object) {
      total += (object.price*object.quantity);
      $scope.cartTotal = '$' + total;
    });
  }

  if ($scope.token != '' && $scope.email != '') {
    MountainModel.getCart($scope.user_email).then(
      function(res) {
        $scope.carts = res.data;
      },
      function(res) {
        swal({
          title: 'Oops...',
          text: res.data.message,
          type: 'error'
        });
      }
    );
  }

  // useless, à virer après connection à la database
  // $scope.carts = [{
  //     ref: 24653,
  //     type: 'Jackets-Coats',
  //     name: 'Benton Parka',
  //     brand: 'TIMBERLAND',
  //     price: 250,
  //     image: 'parka-benton',
  //     color: 'Black',
  //     size: 'L',
  //     quantity: 1,
  //     message: "Short Parka. With it 2 in 1 model, it is very fonctional : both levels can be worn together or separatly, according to outside weather."
  //   },
  //   {
  //     ref: 47905,
  //     type: 'Jackets-Coats',
  //     name: 'Long Parka',
  //     brand: 'CHEVIGNON',
  //     price: 340,
  //     image: 'parka',
  //     color: 'Black',
  //     size: 'L',
  //     quantity: 1,
  //     message: 'This long classic parka is ideal to figth the cold. Combined with a wool pullover, it will bring you the necessary heat through winter.',
  //   }
  // ];

  // _cartTotal($scope.carts);
});
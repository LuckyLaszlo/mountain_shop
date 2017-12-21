angular.module('mountainShop').controller('productsController', function ($scope, $state, $stateParams, $http, $filter, MountainModel) {
  $scope.isLoaded = false;
  $scope.currentPage = 1;
  $scope.pageSize = 6;
  $scope.search = {
    type: '',
    brand: ''
  };
  $scope.search.type = $stateParams.category;
  $scope.resetSearch = _resetSearch;
  $scope.addToCart = _addToCart;

  $scope.token = '';
  $scope.user_email = '';
  $scope.token = localStorage.getItem('auth-token');
  $scope.user_email = localStorage.getItem('user-email');
  $scope.initCart = JSON.parse(localStorage.getItem('user-cart'));

  MountainModel.getProducts().then(
    function (res) {
      $scope.products = res.data;
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

  function _resetSearch() {
    $scope.search = {};
    $scope.order = "";
  };

  function _addToCart(prod) {
    if ($scope.user_email != '' && $scope.token != '') {
      MountainModel.cartAdd($scope.user_email, prod.ref).then(
        function (res) {
          swal({
            type: 'success',
            title: res.data.message,
            showConfirmButton: false,
            timer: 1000
          });
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
      for (var i = $scope.carts.length -1; i >= 0; i--){
        if ($scope.carts[i].ref == prod.ref) {
          found = true;
        }
      }
      if (!found) {
        $scope.carts[$scope.carts.length] = prod;
        localStorage.setItem('user-cart', JSON.stringify($scope.carts));
        swal({
          type: 'success',
          title: 'Hop hop hop ! In the cart !',
          showConfirmButton: false,
          timer: 1000
        });
      } else {
        swal({
          type: 'error',
          title: 'Already in the cart, Grand fou ( ͡° ͜ʖ ͡° )'
        });
      }
    }
  }
});
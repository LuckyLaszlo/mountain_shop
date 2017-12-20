angular.module('mountainShop').controller('productDetailsController', function ($scope, $state, $stateParams, $http, MountainModel) {
  $scope.isLoaded = false;
  $scope.goBack = goBack;

  function goBack(){
    $state.go('products');
  }

  MountainModel.getProductDetails($stateParams.productRef).then(
    function (res) {
      console.log(res.data);
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
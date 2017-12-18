angular.module('mountainShop').controller('shopController', function ($scope, $state, $stateParams, $http, MountainModel){
  $scope.login = _login;
  $scope.register = _register;

  function _login() {
    // var logEmail = $scope.logEmail;
    // var logPassword = $scope.logPassword;
    var data = {
      email: $scope.logEmail,
      password: $scope.logPassword
    };
    MountainModel.login(data).then(
      function (res) {
        swal({
          title: 'Success!',
          text: res.data.message,
          type: 'success'
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
  }

  function _register() {
    if ($scope.regPassword === $scope.regPasswordConfirm) {
      var data = {
        email: $scope.regEmail,
        password: $scope.regPassword,
        firstName: $scope.regFirstName,
        lastName: $scope.regLastName
      };
      MountainModel.register(data).then(
        function (res) {
          swal({
            title: 'Success!',
            text: res.data.message,
            type: 'success'
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
      swal(
        'Oops...',
        'Passwords does not match',
        'error'
      );
    }
  }
});
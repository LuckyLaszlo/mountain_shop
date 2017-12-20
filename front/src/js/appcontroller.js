angular.module('mountainShop').controller('shopController', function ($scope, $state, $stateParams, $http, $timeout, MountainModel) {
  $scope.isLoaded = false;
  $scope.login = _login;
  $scope.register = _register;
  $scope.logout = _logout;
  $scope.auth = '';
  $scope.user_email = '';
  $scope.logged = false;
  $scope.auth = localStorage.getItem('auth-token');
  $scope.user_email = localStorage.getItem('user-email');
  $scope.isLoaded = true;
  if ($scope.auth !== '' && $scope.user_email !== '') $scope.logged = true;

  function _login() {
    var data = {
      email: $scope.logEmail,
      password: $scope.logPassword
    };
    MountainModel.login(data).then(
      function (res) {
        $('#modalLogin').modal('hide');
        $timeout(swal_success, 500);
        function swal_success() {
          swal({
            title: 'Success!',
            text: res.data.message,
            type: 'success',
            showConfirmButton: false,
            timer: 2000
          });
        }
        localStorage.setItem('auth-token', res.data.token);
        localStorage.setItem('user-email', res.data.email);
        $scope.logged = true;
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

  function _logout() {
    localStorage.setItem('auth-token', '');
    localStorage.setItem('user-email', '');
    $scope.logged = false;
    swal({
      title: 'Logged out',
      text: 'You are now anonymous',
      type: 'info',
      showConfirmButton: false,
      timer: 2000
    });
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
          $('#modalRegister').modal('hide');
          $timeout(swal_success, 1000);
          function swal_success() {
            swal({
              title: 'Success!',
              text: res.data.message,
              type: 'success',
              showConfirmButton: false,
              timer: 2000
            });
          }
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
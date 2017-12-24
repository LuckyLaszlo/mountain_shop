angular.module('mountainShop').controller('shopController', function ($scope, $state, $stateParams, $http, $timeout, MountainModel) {
  $scope.isLoaded = false;
  $scope.token = null;
  $scope.user_email = null;
  $scope.logged = false;
  $scope.token = localStorage.getItem('auth-token');
  $scope.user_email = localStorage.getItem('user-email');

  $scope.login = _login;
  $scope.register = _register;
  $scope.logout = _logout;

  if ($scope.token && $scope.token != null) {
    MountainModel.tokenCheck($scope.token).then(
      function (res) {
        $scope.logged = res.data;
        $scope.isLoaded = true;
      },
      function (res) {
        $scope.logged = false;
        $scope.isLoaded = true;
      }
    );
  } else {
    $scope.logged = false;
    $scope.isLoaded = true;
  }

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
        $state.reload();
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
    localStorage.setItem('auth-token', null);
    localStorage.setItem('user-email', null);
    $scope.logged = false;
    swal({
      title: 'Logged out',
      text: 'You are now anonymous',
      type: 'info',
      showConfirmButton: false,
      timer: 1500
    });
    $state.reload();
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
              timer: 1500
            });
            $state.reload();
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
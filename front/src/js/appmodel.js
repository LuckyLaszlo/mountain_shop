angular.module('mountainShop').service('MountainModel', function ($http) {
  return {
    login: function (data) {
      return $http.post('http://localhost:3457/login', data);
    },
    register: function (data) {
      return $http.post('http://localhost:3457/register', data);
    }
  }
});
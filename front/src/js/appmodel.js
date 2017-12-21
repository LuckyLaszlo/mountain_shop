angular.module('mountainShop').service('MountainModel', function ($http) {
  return {
    login: function (data) {
      return $http.post('http://localhost:3457/login', data);
    },
    register: function (data) {
      return $http.post('http://localhost:3457/register', data);
    },
    getProducts: function () {
      return $http.get('http://localhost:3457/products');
    },
    getProductDetails: function (ref) {
      return $http.get('http://localhost:3457/product/' + ref);
    },
    getCart: function (user_id) {
      return $http.get('http://localhost:3457/cart/' + user_id);
    },
    cartAdd: function(user_id, ref) {
      var data = {
        email: user_id,
        ref: ref
      };
      return $http.post('http://localhost:3457/cart-add', data);
    },
    cartDelete: function(user_id, ref) {
      var data = {
        email: user_id,
        ref: ref
      };
      return $http.post('http://localhost:3457/cart-delete', data);
    },
    cartModify: function(user_id, ref, mod) {
      var data = {
        email: user_id,
        ref: ref,
        modify: mod
      };
      return $http.post('http://localhost:3457/modify-quantity', data);
    }
  }
});
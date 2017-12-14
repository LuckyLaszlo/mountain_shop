angular.module('mountainShop', ['ui.router']);

angular.module('mountainShop').config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  var homeState = {
    name: 'home',
    url: '/',
    component: 'home'
  };
  var productsState = {
    name: 'products',
    url: '/products',
    component: 'products'
  };

  $stateProvider.state(homeState);
  $stateProvider.state(productsState);
});
angular.module('mountainShop').component('home', {
  templateUrl: 'src/js/components/home/home-view.html',
  controller: 'homeController'
});
angular.module('mountainShop').controller('homeController', function ($scope, $timeout) {
  
});
angular.module('mountainShop').controller('productsController', function ($scope, $timeout) {
  
});
angular.module('mountainShop').component('products', {
  templateUrl: 'src/js/components/products/products-view.html',
  controller: 'productsController'
});
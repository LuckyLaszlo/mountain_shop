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
  var productDetailsState = {
    name: 'productDetails',
    url: '/product/:productId',
    component: 'productDetailsComponent'
  };

  $stateProvider.state(homeState);
  $stateProvider.state(productsState);
  $stateProvider.state(productDetailsState);
});
angular.module('mountainShop').component('home', {
  templateUrl: 'src/js/components/home/home-view.html',
  controller: 'homeController'
});
angular.module('mountainShop').controller('homeController', function ($scope, $timeout) {
  
});
angular.module('mountainShop').component('productDetails', {
  templateUrl: 'src/js/components/products/product-details-view.html',
  controller: 'productDetailsController'
});
angular.module('mountainShop').controller('productDetailsController', function ($scope, $timeout) {

});
angular.module('mountainShop').component('products', {
  templateUrl: 'src/js/components/products/products-view.html',
  controller: 'productsController'
});
angular.module('mountainShop').controller('productsController', function ($scope, $timeout) {
  
});
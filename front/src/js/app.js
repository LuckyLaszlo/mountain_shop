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
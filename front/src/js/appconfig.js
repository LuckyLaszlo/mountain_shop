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

angular.module('mountainShop').config(function (paginationTemplateProvider) {
  paginationTemplateProvider.setPath('src/js/dirPagination.tpl.html');
});
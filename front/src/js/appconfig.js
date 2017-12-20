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
    component: 'products',
    params: {
      category: ''
    }
  };
  var productDetailsState = {
    name: 'productDetails',
    url: '/product/:productRef',
    component: 'productDetails',
    params: {
      productRef: null
    }
  };
  var cartState = {
    name: 'cart',
    url: '/cart',
    component: 'cart'
  }

  $stateProvider.state(homeState);
  $stateProvider.state(productsState);
  $stateProvider.state(productDetailsState);
  $stateProvider.state(cartState);
});

angular.module('mountainShop').config(function (paginationTemplateProvider) {
  paginationTemplateProvider.setPath('src/js/dirPagination.tpl.html');
});
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
angular.module('mountainShop').controller('shopController', function($scope){

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
angular.module('mountainShop').controller('productsController', function ($scope, $filter) {

  $scope.products = [{
      ref: 24653,
      type: 'jacket',
      name: 'Benton Parka',
      brand: 'TIMBERLAND',
      price: 250,
      message: "Short Parka. With it 2 in 1 model, it is very fonctional : both levels can be worn together or separatly, according to outside weather.",
      image: 'parka-benton'
    },
    {
      ref: 47905,
      type: 'jacket',
      name: 'Long Parka',
      brand: 'CHEVIGNON',
      price: 340,
      message: 'This long classic parka is ideal to figth the cold. Combined with a wool pullover, it will bring you the necessary heat through winter.',
      image: 'parka'
    },
    {
      ref: 45482,
      type: 'jacket',
      name: 'Light Padded-Jacket',
      brand: 'SCHOTT',
      price: 180,
      message: "Ajusted Padded-Jacket. Packed with a collar and long sleeves with 4 flap pockets.",
      image: 'doudoune-legere'
    },
    {
      ref: 33546,
      type: 'hat',
      name: 'Bobble Flag Beanie',
      brand: 'TOMMY HILFIGER',
      price: 40,
      message: "Mesh beanie. Flag on one side and with a bobble on the top.",
      image: 'bobble-flag-beanie'
    },
    {
      ref: 35158,
      type: 'hat',
      name: 'Wool Beanie with crocodile',
      brand: 'LACOSTE SPORT',
      price: 30,
      message: "Wool beanie with the iconic crocodile in front. Corded finishes",
      image: 'beanie-wool-crocodile'
    }
  ];
});
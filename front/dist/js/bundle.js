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
angular.module('mountainShop').component('productDetails', {
  templateUrl: 'src/js/components/products/product-details-view.html',
  controller: 'productDetailsController'
});
angular.module('mountainShop').controller('productDetailsController', function ($scope, $timeout) {

});
angular.module('mountainShop').component('home', {
  templateUrl: 'src/js/components/home/home-view.html',
  controller: 'homeController'
});
angular.module('mountainShop').controller('homeController', function ($scope, $timeout) {
  
});
angular.module('mountainShop').component('products', {
  templateUrl: 'src/js/components/products/products-view.html',
  controller: 'productsController'
});
angular.module('mountainShop').controller('productsController', function ($scope) {
  $scope.products = [{
      ref: 47905,
      type: 'jacket',
      name: 'Parka longue',
      brand: 'CHEVIGNON',
      price: 340,
      message: 'Cette Parka Longue Classique En Canvas Technique Déperlant Est Idéale Pour Affronter Le Froid. Combiné Avec Un Pull En Laine, Elle Vous Apportera Toute La Chaleur Nécessaire Pour Passer L hiver.',
      image: 'parka.jpg'
    },
    {
      ref: 24653,
      type: 'jacket',
      name: 'Parka benton',
      brand: 'TIMBERLAND',
      price: 250,
      message: "Parka courte. Avec sa construction 2 en 1 elle est très fonctionnelle : les deux vêtements peuvent être portés superposés ou séparément, selon les conditions météorologiques.",
      image: 'parka-benton.jpg'
    },
    {
      ref: 45482,
      type: 'jacket',
      name: 'Doudoune légère',
      brand: 'SCHOTT',
      price: 180,
      message: "Doudoune ajustée. Elle présente un col montant boutonné, des manches longues 4 poches à rabat et une fermeture par patte de boutonnage pressionnée.",
      image: 'doudoune-legere.jpg'
    },
    {
      ref: 45482,
      type: 'jacket',
      name: 'Doudoune légère',
      brand: 'SCHOTT',
      price: 180,
      message: "Doudoune ajustée. Elle présente un col montant boutonné, des manches longues 4 poches à rabat et une fermeture par patte de boutonnage pressionnée.",
      image: 'doudoune-legere.jpg'
    },
    {
      ref: 45482,
      type: 'jacket',
      name: 'Doudoune légère',
      brand: 'SCHOTT',
      price: 180,
      message: "Doudoune ajustée. Elle présente un col montant boutonné, des manches longues 4 poches à rabat et une fermeture par patte de boutonnage pressionnée.",
      image: 'doudoune-legere.jpg'
    },
    {
      ref: 45482,
      type: 'jacket',
      name: 'Doudoune légère',
      brand: 'SCHOTT',
      price: 180,
      message: "Doudoune ajustée. Elle présente un col montant boutonné, des manches longues 4 poches à rabat et une fermeture par patte de boutonnage pressionnée.",
      image: 'doudoune-legere.jpg'
    },
    {
      ref: 45482,
      type: 'jacket',
      name: 'Doudoune légère',
      brand: 'SCHOTT',
      price: 180,
      message: "Doudoune ajustée. Elle présente un col montant boutonné, des manches longues 4 poches à rabat et une fermeture par patte de boutonnage pressionnée.",
      image: 'doudoune-legere.jpg'
    },
    {
      ref: 45482,
      type: 'jacket',
      name: 'Doudoune légère',
      brand: 'SCHOTT',
      price: 180,
      message: "Doudoune ajustée. Elle présente un col montant boutonné, des manches longues 4 poches à rabat et une fermeture par patte de boutonnage pressionnée.",
      image: 'doudoune-legere.jpg'
    },
    {
      ref: 45482,
      type: 'jacket',
      name: 'Doudoune légère',
      brand: 'SCHOTT',
      price: 180,
      message: "Doudoune ajustée. Elle présente un col montant boutonné, des manches longues 4 poches à rabat et une fermeture par patte de boutonnage pressionnée.",
      image: 'doudoune-legere.jpg'
    },
    {
      ref: 45482,
      type: 'jacket',
      name: 'Doudoune légère',
      brand: 'SCHOTT',
      price: 180,
      message: "Doudoune ajustée. Elle présente un col montant boutonné, des manches longues 4 poches à rabat et une fermeture par patte de boutonnage pressionnée.",
      image: 'doudoune-legere.jpg'
    },
    {
      ref: 45482,
      type: 'jacket',
      name: 'Doudoune légère',
      brand: 'SCHOTT',
      price: 180,
      message: "Doudoune ajustée. Elle présente un col montant boutonné, des manches longues 4 poches à rabat et une fermeture par patte de boutonnage pressionnée.",
      image: 'doudoune-legere.jpg'
    },
    {
      ref: 45482,
      type: 'jacket',
      name: 'Doudoune légère',
      brand: 'SCHOTT',
      price: 180,
      message: "Doudoune ajustée. Elle présente un col montant boutonné, des manches longues 4 poches à rabat et une fermeture par patte de boutonnage pressionnée.",
      image: 'doudoune-legere.jpg'
    },
    {
      ref: 45482,
      type: 'jacket',
      name: 'Doudoune légère',
      brand: 'SCHOTT',
      price: 180,
      message: "Doudoune ajustée. Elle présente un col montant boutonné, des manches longues 4 poches à rabat et une fermeture par patte de boutonnage pressionnée.",
      image: 'doudoune-legere.jpg'
    },
    {
      ref: 45482,
      type: 'jacket',
      name: 'Doudoune légère',
      brand: 'SCHOTT',
      price: 180,
      message: "Doudoune ajustée. Elle présente un col montant boutonné, des manches longues 4 poches à rabat et une fermeture par patte de boutonnage pressionnée.",
      image: 'doudoune-legere.jpg'
    },
    {
      ref: 45482,
      type: 'jacket',
      name: 'Doudoune légère',
      brand: 'SCHOTT',
      price: 180,
      message: "Doudoune ajustée. Elle présente un col montant boutonné, des manches longues 4 poches à rabat et une fermeture par patte de boutonnage pressionnée.",
      image: 'doudoune-legere.jpg'
    },
    {
      ref: 45482,
      type: 'jacket',
      name: 'Doudoune légère',
      brand: 'SCHOTT',
      price: 180,
      message: "Doudoune ajustée. Elle présente un col montant boutonné, des manches longues 4 poches à rabat et une fermeture par patte de boutonnage pressionnée.",
      image: 'doudoune-legere.jpg'
    },
    {
      ref: 45482,
      type: 'jacket',
      name: 'Doudoune légère',
      brand: 'SCHOTT',
      price: 180,
      message: "Doudoune ajustée. Elle présente un col montant boutonné, des manches longues 4 poches à rabat et une fermeture par patte de boutonnage pressionnée.",
      image: 'doudoune-legere.jpg'
    },
    {
      ref: 45482,
      type: 'jacket',
      name: 'Doudoune légère',
      brand: 'SCHOTT',
      price: 180,
      message: "Doudoune ajustée. Elle présente un col montant boutonné, des manches longues 4 poches à rabat et une fermeture par patte de boutonnage pressionnée.",
      image: 'doudoune-legere.jpg'
    },
    {
      ref: 45482,
      type: 'jacket',
      name: 'Doudoune légère',
      brand: 'SCHOTT',
      price: 180,
      message: "Doudoune ajustée. Elle présente un col montant boutonné, des manches longues 4 poches à rabat et une fermeture par patte de boutonnage pressionnée.",
      image: 'doudoune-legere.jpg'
    },
    {
      ref: 45482,
      type: 'jacket',
      name: 'Doudoune légère',
      brand: 'SCHOTT',
      price: 180,
      message: "Doudoune ajustée. Elle présente un col montant boutonné, des manches longues 4 poches à rabat et une fermeture par patte de boutonnage pressionnée.",
      image: 'doudoune-legere.jpg'
    }
  ];

});
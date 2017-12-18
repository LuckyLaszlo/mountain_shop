angular.module('mountainShop').controller('productsController', function ($scope, $state, $stateParams, $http, $filter) {
  $scope.currentPage = 1;
  $scope.pageSize = 8;
  $scope.search = {type: '', brand: ''};
  $scope.search.type = $stateParams.category;

  $scope.resetSearch = function(){
    $scope.search = {};
    $scope.order = "";
  };

  // Useless, A Virer aprés avoir la DB opérationnel
  $scope.products = [
    {
      ref: 24653,
      type: 'Jackets-Coats',
      name: 'Benton Parka',
      brand: 'TIMBERLAND',
      price: 250,
      message: "Short Parka. With it 2 in 1 model, it is very fonctional : both levels can be worn together or separatly, according to outside weather.",
      image: 'parka-benton'
    },
    {
      ref: 47905,
      type: 'Jackets-Coats',
      name: 'Long Parka',
      brand: 'CHEVIGNON',
      price: 340,
      message: 'This long classic parka is ideal to figth the cold. Combined with a wool pullover, it will bring you the necessary heat through winter.',
      image: 'parka'
    },
    {
      ref: 45482,
      type: 'Jackets-Coats',
      name: 'Light Padded-Jacket',
      brand: 'SCHOTT',
      price: 180,
      message: "Ajusted Padded-Jacket. Packed with a collar and long sleeves with 4 flap pockets.",
      image: 'doudoune-legere'
    },
    {
      ref: 33546,
      type: 'Hats-Caps',
      name: 'Bobble Flag Beanie',
      brand: 'TOMMY HILFIGER',
      price: 40,
      message: "Mesh beanie. Flag on one side and with a bobble on the top.",
      image: 'bobble-flag-beanie'
    },
    {
      ref: 35158,
      type: 'Hats-Caps',
      name: 'Wool Beanie with crocodile',
      brand: 'LACOSTE SPORT',
      price: 30,
      message: "Wool beanie with the iconic crocodile in front. Corded finishes",
      image: 'beanie-wool-crocodile'
    },
    {
      ref: 24653,
      type: 'Jackets-Coats',
      name: 'Benton Parka',
      brand: 'TIMBERLAND',
      price: 250,
      message: "Short Parka. With it 2 in 1 model, it is very fonctional : both levels can be worn together or separatly, according to outside weather.",
      image: 'parka-benton'
    },
    {
      ref: 47905,
      type: 'Jackets-Coats',
      name: 'Long Parka',
      brand: 'CHEVIGNON',
      price: 340,
      message: 'This long classic parka is ideal to figth the cold. Combined with a wool pullover, it will bring you the necessary heat through winter.',
      image: 'parka'
    },
    {
      ref: 45482,
      type: 'Jackets-Coats',
      name: 'Light Padded-Jacket',
      brand: 'SCHOTT',
      price: 180,
      message: "Ajusted Padded-Jacket. Packed with a collar and long sleeves with 4 flap pockets.",
      image: 'doudoune-legere'
    },
    {
      ref: 33546,
      type: 'Hats-Caps',
      name: 'Bobble Flag Beanie',
      brand: 'TOMMY HILFIGER',
      price: 40,
      message: "Mesh beanie. Flag on one side and with a bobble on the top.",
      image: 'bobble-flag-beanie'
    },
    {
      ref: 35158,
      type: 'Hats-Caps',
      name: 'Wool Beanie with crocodile',
      brand: 'LACOSTE SPORT',
      price: 30,
      message: "Wool beanie with the iconic crocodile in front. Corded finishes",
      image: 'beanie-wool-crocodile'
    }
  ];
});
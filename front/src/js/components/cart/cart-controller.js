angular.module('mountainShop').controller('cartController', function ($scope, $state, $stateParams, $http) {
  $scope.carts = [{
      ref: 24653,
      type: 'Jackets-Coats',
      name: 'Benton Parka',
      brand: 'TIMBERLAND',
      price: 250,
      image: 'parka-benton',
      message: "Short Parka. With it 2 in 1 model, it is very fonctional : both levels can be worn together or separatly, according to outside weather."
    },
    {
      ref: 47905,
      type: 'Jackets-Coats',
      name: 'Long Parka',
      brand: 'CHEVIGNON',
      price: 340,
      image: 'parka',
      message: 'This long classic parka is ideal to figth the cold. Combined with a wool pullover, it will bring you the necessary heat through winter.',
    }
  ];
});
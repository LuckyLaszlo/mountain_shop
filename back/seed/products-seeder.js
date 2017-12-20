var Product = require('../models/product.js');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mountain_shop', { useMongoClient: true, }, function (err) {
    if (err) {
        throw err;
    } else {
        console.log("Connected successfully to server with Mongoose");
        console.log("----------------");
        // console.log("Products Seeding Incoming  ( ͡ʘ ͜ʖ ͡ʘ)")
    }
});


var products = [
    new Product({
        ref: 24653,
        type: 'Jackets-Coats',
        name: 'Benton Parka',
        brand: 'TIMBERLAND',
        price: 250,
        image: 'parka-benton',
        color: 'Black',
        size: 'L',
        quantity: 1,
        message: "Short Parka. With it 2 in 1 model, it is very fonctional : both levels can be worn together or separatly, according to outside weather.",
    }),
    new Product({
        ref: 47905,
        type: 'Jackets-Coats',
        name: 'Long Parka',
        brand: 'CHEVIGNON',
        price: 340,
        image: 'parka',
        color: 'Black',
        size: 'L',
        quantity: 1,
        message: 'This long classic parka is ideal to figth the cold. Combined with a wool pullover, it will bring you the necessary heat through winter.',
    }),
    new Product({
        ref: 45482,
        type: 'Jackets-Coats',
        name: 'Light Padded-Jacket',
        brand: 'SCHOTT',
        price: 180,
        image: 'doudoune-legere',
        color: 'Black',
        size: 'L',
        quantity: 1,
        message: "Ajusted Padded-Jacket. Packed with a collar and long sleeves with 4 flap pockets.",
    }),
    new Product({
        ref: 33546,
        type: 'Hats-Caps',
        name: 'Bobble Flag Beanie',
        brand: 'TOMMY HILFIGER',
        price: 40,
        image: 'bobble-flag-beanie',// WTF LES AMIS !!! Il manque la propriété "image" lors de l'ajout dans le cart
        color: 'Black',
        size: 'L',
        quantity: 1,
        message: "Mesh beanie. Flag on one side and with a bobble on the top.",
    }),
    new Product({
        ref: 35158,
        type: 'Hats-Caps',
        name: 'Wool Beanie with crocodile',
        brand: 'LACOSTE SPORT',
        price: 30,
        image: 'beanie-wool-crocodile',
        color: 'Black',
        size: 'L',
        quantity: 1,
        message: "Wool beanie with the iconic crocodile in front. Corded finishes",
    })
];

//Method without "done" variable, he execute the console.log 10 time (the lenght of the array). Why ? 
//And the products are corectly save in MongoDB... weird ! :s  
// ANAS a éclaircie le truc, c'est asynchrone et c'est compliqué :D 

// for (var i = 0; i < products.length; i++) {
//     console.log(i, products.length);
//     products[i].save(function(err, result) {
//         if (i == products.length) {
//             console.log("Products seeding complete. Yeah (づ｡◕‿◕｡)づ !");
//             exit();
//         }
//     });
// }

//First Method (same as in the vidéo https://www.youtube.com/watch?v=V30Rpqi6kYE)
var done = 0;
for (var i = 0; i < products.length; i++) {
    products[i].save(function(err, result) {
        done++
        if (done === products.length) {
            console.log("Products seeding complete. Yeah (づ｡◕‿◕｡)づ !");
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}
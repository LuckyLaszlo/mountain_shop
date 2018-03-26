var Product = require('../models/product.js');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mountain_shop', { useMongoClient: true, }, function (err) {
    if (err) {
        throw err;
    } else {
        console.log("Connected successfully to server with Mongoose");
        console.log("----------------");
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
    }),
    new Product({
        ref: 22750,
        type: 'Gloves',
        name: 'Hercule VV750',
        brand: 'DELTAPLUS',
        price: 0,
        image: 'free-hercule-vv750',
        color: 'Black',
        size: '9',
        quantity: 1,
        message: "FREE ITEM ! IMMEDIATE DELIVERY (By Luke himself) (*One per client, in the limit of the available stock) ! Knitted acrylic/polyamid glove - nitrile foam coating on palm, fingers and half back",
    }),
    new Product({
        ref: 28709,
        type: 'Gloves',
        name: 'Vengeance Glove',
        brand: 'SUMMIT SERIES',
        price: 220,
        image: 'vengeance-glove',
        color: 'Black',
        size: 'M',
        quantity: 1,
        message: "Gore-Tex glove. Designed for climbing, Breathable and Waterproof. Our most technically advanced modular mountaineering glove system",
    }),
    new Product({
        ref: 20647,
        type: 'Gloves',
        name: 'Etip Glove',
        brand: 'THE NORTH FACE',
        price: 45,
        image: 'etip-glove',
        color: 'Grey',
        size: 'M',
        quantity: 1,
        message: "Stay connected while you're outside and on-the-go with our touch-screen compatible, four-way stretch fleece glove. Full palm conductivity allows you to use your touchscreen devices without removing your gloves and exposing your hands in cool conditions.",
    }),
    new Product({
        ref: 20486,
        type: 'Gloves',
        name: 'Montana Gore-Tex',
        brand: 'THE NORTH FACE',
        price: 70,
        image: 'montana-glove',
        color: 'Asphalt grey',
        size: 'L',
        quantity: 1,
        message: "When three feet of fresh pow calls your name, hit the slopes in waterproof Gore-Tex® mitts that feature warm Heatseeker™ insulation and Sherpa fleece lining. Articulation provides a natural range of motion and a long cuff keeps snow outside your jacket sleeves.",
    }),
    new Product({
        ref: 42702,
        type: 'Bags',
        name: 'Dragon Fly 25',
        brand: 'BLUE ICE',
        price: 70,
        image: 'dragonfly-25l-blu',
        color: 'Blue',
        size: '25 L',
        quantity: 1,
        message: "Lightweight and versatile backpack, ideal for climbers who aim for a light summit or on a day hike.",
    }),
    new Product({
        ref: 87408,
        type: 'Bags',
        name: 'Dragon Fly 18',
        brand: 'BLUE ICE',
        price: 55,
        image: 'dragonfly-18l-blu',
        color: 'Blue',
        size: '18 L',
        quantity: 1,
        message: "Lightweight and practical backpack that you can easily carry for traveling. Ideal for short hikes, free climbing ...",
    }),
    new Product({
        ref: 42206,
        type: 'Bags',
        name: 'Dragon Fly 10',
        brand: 'BLUE ICE',
        price: 45,
        image: 'dragonfly-10l-blu',
        color: 'Blue',
        size: '10 L',
        quantity: 1,
        message: "Lightweight and robust backpack, designed to carry the minimum of equipment. Ideal for climbing large walls and trid climbing.",
    }),
    new Product({
        ref: 23422,
        type: 'Bags',
        name: 'Yeti',
        brand: 'BLUE ICE',
        price: 160,
        image: 'yeti-50l-pack',
        color: 'Grey',
        size: '50 L',
        quantity: 1,
        message: "A great alpine backpack that will become your best friend! With the detachable lid and the side compression belt, you can adjust the bag to the optimum size !!",
    }),
    new Product({
        ref: 20720,
        type: 'Jackets-Coats',
        name: 'Nang Para Hooded Doudoune',
        brand: 'SHERPA',
        price: 295,
        image: 'sm2108_111_front',
        color: 'Yellow',
        size: 'L',
        quantity: 1,
        message: "It is a very functional down jacket that can be dried quickly even if it is wet.",
    }),
    new Product({
        ref: 80486,
        type: 'Jackets-Coats',
        name: 'W’s Hole',
        brand: 'BIG AGNES',
        price: 215,
        image: 'womensholeinwall-black',
        color: 'Black',
        size: 'L',
        quantity: 1,
        message: "Nothing to say ... Love Agnes.",
    }),
    new Product({
        ref: 60220,
        type: 'Jackets-Coats',
        name: 'W’s Lightline Jacket',
        brand: 'MOUNTAIN EQUIPEMENT',
        price: 305,
        image: '414124_i00',
        color: 'Blue',
        size: 'L',
        quantity: 1,
        message: "A comfortable padded jacket that improves heat retention. Ideal against the weather.",
    }),
    new Product({
        ref: 22400,
        type: 'Jackets-Coats',
        name: 'Annapurna Jacket',
        brand: 'MOUNTAIN EQUIPEMENT',
        price: 560,
        image: '413193_c03',
        color: 'Blue',
        size: 'L',
        quantity: 1,
        message: "Down jacket represents! Continue to be loved by climbers who have been challenging the top of the gods for over 42 years while swagging.",
    }),
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
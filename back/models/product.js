const mongoose = require('mongoose');

// pas de filtre pour l'instant
var productSchema = new mongoose.Schema({
    ref: Number,
    type: String,
    name: String,
    brand: String,
    price: Number,
    message: String,
    imagePath: String
});

module.exports = mongoose.model('Product', productSchema);
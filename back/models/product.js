const mongoose = require('mongoose');

// pas de filtre pour l'instant
var productSchema = new mongoose.Schema({
    ref: { type: Number, required: true },
    type: String,
    name: String,
    brand: String,
    price: { type: Number, required: true },
    message: String,
    imagePath: String
});

module.exports = mongoose.model('Product', productSchema);
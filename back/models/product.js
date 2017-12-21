const mongoose = require('mongoose');

// pas de filtre pour l'instant
var productSchema = new mongoose.Schema({
    ref: { type: Number, required: true },
    type: { type: String, required: true },
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    image: String,
    color: String,
    size: String,
    message: String,
    quantity: { type: Number, default: 1 }
});

module.exports = mongoose.model('Product', productSchema);
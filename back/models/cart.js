const mongoose = require('mongoose');

var cartSchema = new mongoose.Schema({
    cart: []
    email: String,
});

module.exports = mongoose.model('Cart', cartSchema);
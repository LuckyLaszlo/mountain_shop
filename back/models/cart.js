const mongoose = require('mongoose');

var cartSchema = new mongoose.Schema({
    email: String,
    cart: []
});

module.exports = mongoose.model('Cart', cartSchema);
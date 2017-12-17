const mongoose = require('mongoose');

var customerSchema = new mongoose.Schema({
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    creationDate: { type: Date, default: Date.now }
});
// Regex marche pas :(
// firstName: { type : String, match: /^[a-zA-Z\s-_]+$/ },
// lastName: { type : String, match: /^[a-zA-Z\s-_]+$/ },

module.exports = mongoose.model('Customer', customerSchema);
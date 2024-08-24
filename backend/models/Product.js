const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: String,
    variants: [
        {
            price: String,
            sku: String,
        },
    ],
});

const Product = mongoose.model('shopifyProducts', productSchema);

module.exports = Product;

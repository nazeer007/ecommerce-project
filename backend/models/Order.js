const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    created_at: Date,
    total_price_set: {
        shop_money: {
            amount: String,
        },
    },
    customer: {
        id: mongoose.Schema.Types.ObjectId,
        email: String,
    },
});

const Order = mongoose.model('shopifyOrders', orderSchema);

module.exports = Order;

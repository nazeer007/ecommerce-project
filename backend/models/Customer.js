const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    created_at: Date,
    orders_count: Number,
    total_spent: Number,
    default_address: {
        city: String,
    },
});

const Customer = mongoose.model('shopifyCustomers', customerSchema);

module.exports = Customer;

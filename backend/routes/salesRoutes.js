const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Example: Assuming your collection is 'shopifyOrders'
const Order = mongoose.model('Order', new mongoose.Schema({}, { collection: 'shopifyOrders' }));

router.get('/total-sales-over-time', async (req, res) => {
    try {
        // Query MongoDB to get the total sales over time
        const salesData = await Order.aggregate([
            {
                $group: {
                    _id: {
                        year: { $year: "$created_at" },
                        month: { $month: "$created_at" },
                        day: { $dayOfMonth: "$created_at" }
                    },
                    totalSales: { $sum: "$total_price_set" }
                }
            },
            { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } }
        ]);

        res.json(salesData);
    } catch (error) {
        console.error('Error fetching total sales over time:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;

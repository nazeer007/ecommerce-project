const express = require('express');
const Order = require('../models/Order');
const router = express.Router();

// Get total sales over time
router.get('/sales-over-time', async (req, res) => {
    try {
        const salesData = await Order.aggregate([
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$created_at" },
                    },
                    totalSales: {
                        $sum: {
                            $toDouble: "$total_price_set.shop_money.amount",
                        },
                    },
                },
            },
            { $sort: { _id: 1 } },
        ]);
        res.json(salesData);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;

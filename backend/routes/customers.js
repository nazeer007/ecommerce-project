const express = require('express');
const Customer = require('../models/Customer');
const router = express.Router();

// Get new customers over time
router.get('/new-customers', async (req, res) => {
    try {
        const customersData = await Customer.aggregate([
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$created_at" },
                    },
                    newCustomers: { $sum: 1 },
                },
            },
            { $sort: { _id: 1 } },
        ]);
        res.json(customersData);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;

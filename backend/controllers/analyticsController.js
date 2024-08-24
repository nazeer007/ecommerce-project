const Order = require('../models/Order');
const Customer = require('../models/Customer');

// 1. Total Sales Over Time
exports.getTotalSalesOverTime = async (req, res) => {
    try {
        const { interval } = req.query;

        // Group by intervals and calculate total sales
        const sales = await Order.aggregate([
            {
                $group: {
                    _id: {
                        $dateToString: { format: interval, date: "$created_at" }
                    },
                    totalSales: { $sum: { $toDouble: "$total_price_set.shop_money.amount" } }
                }
            }
        ]);

        res.json(sales);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 2. Sales Growth Rate Over Time
exports.getSalesGrowthRate = async (req, res) => {
    // Implementation similar to Total Sales Over Time with growth rate calculation
};

// 3. New Customers Added Over Time
exports.getNewCustomersOverTime = async (req, res) => {
    try {
        const { interval } = req.query;

        const newCustomers = await Customer.aggregate([
            {
                $group: {
                    _id: {
                        $dateToString: { format: interval, date: "$created_at" }
                    },
                    count: { $sum: 1 }
                }
            }
        ]);

        res.json(newCustomers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 4. Number of Repeat Customers
exports.getRepeatCustomers = async (req, res) => {
    // Implementation based on customer purchase history
};

// 5. Geographical Distribution of Customers
exports.getGeographicalDistribution = async (req, res) => {
    try {
        const distribution = await Customer.aggregate([
            {
                $group: {
                    _id: "$default_address.city",
                    count: { $sum: 1 }
                }
            }
        ]);

        res.json(distribution);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 6. Customer Lifetime Value by Cohorts
exports.getCustomerLifetimeValue = async (req, res) => {
    // Implementation based on cohorts
};

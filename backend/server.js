const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize Express app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Use CORS middleware
app.use(cors());

app.get('/api/total-sales', (req, res) => {
    // Your API logic here
    res.json([{ _id: '2024-08-22', totalSales: 1000 }]); // Example response
});

// MongoDB connection string
const mongoURI = 'mongodb+srv://db_user_read:LdmrVA5EDEv4z3Wr@cluster0.n10ox.mongodb.net/RQ_Analytics?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define models
const Order = mongoose.model('Order', new mongoose.Schema({}, { strict: false }), 'shopifyOrders');
const Customer = mongoose.model('Customer', new mongoose.Schema({}, { strict: false }), 'shopifyCustomers');

// Define API routes

// Total Sales Over Time
app.get('/api/total-sales', async (req, res) => {
  try {
      const sales = await Order.aggregate([
          {
              $addFields: {
                  createdAtDate: { $dateFromString: { dateString: "$created_at" } }
              }
          },
          {
              $group: {
                  _id: {
                      $dateToString: { format: "%Y-%m-%d", date: "$createdAtDate" }
                  },
                  totalSales: { $sum: { $toDouble: "$total_price_set.shop_money.amount" } }
              }
          },
          { $sort: { _id: 1 } }
      ]);
      res.json(sales);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});


// Sales Growth Rate Over Time
app.get('/api/sales-growth', async (req, res) => {
  try {
      const salesGrowthData = await db.collection('shopifyOrders').aggregate([
          {
              $addFields: {
                  created_at: { $dateFromString: { dateString: "$created_at" } }
              }
          },
          {
              $group: {
                  _id: {
                      year: { $year: "$created_at" },
                      month: { $month: "$created_at" },
                      day: { $dayOfMonth: "$created_at" }
                  },
                  totalSales: { $sum: "$total_price_set.shop_money.amount" }
              }
          },
          {
              $sort: { "_id": 1 }
          }
      ]).toArray();
      res.json(salesGrowthData);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});


// New Customers Added Over Time
app.get('/api/new-customers', async (req, res) => {
  try {
      const newCustomersData = await db.collection('shopifyCustomers').aggregate([
          {
              $addFields: {
                  created_at: { $dateFromString: { dateString: "$created_at" } }
              }
          },
          {
              $group: {
                  _id: {
                      year: { $year: "$created_at" },
                      month: { $month: "$created_at" },
                      day: { $dayOfMonth: "$created_at" }
                  },
                  count: { $sum: 1 }
              }
          },
          {
              $sort: { "_id": 1 }
          }
      ]).toArray();
      res.json(newCustomersData);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});


// Number of Repeat Customers
app.get('/api/repeat-customers', async (req, res) => {
  try {
      const repeatCustomersData = await db.collection('shopifyOrders').aggregate([
          {
              $addFields: {
                  created_at: { $dateFromString: { dateString: "$created_at" } }
              }
          },
          {
              $group: {
                  _id: "$customer_id",
                  totalOrders: { $sum: 1 }
              }
          },
          {
              $match: {
                  totalOrders: { $gt: 1 }
              }
          },
          {
              $group: {
                  _id: {
                      year: { $year: "$created_at" },
                      month: { $month: "$created_at" },
                      day: { $dayOfMonth: "$created_at" }
                  },
                  count: { $sum: 1 }
              }
          },
          {
              $sort: { "_id": 1 }
          }
      ]).toArray();
      res.json(repeatCustomersData);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});


// Geographical Distribution of Customers
app.get('/api/geographical-distribution', async (req, res) => {
  try {
      const geoData = await db.collection('shopifyCustomers').aggregate([
          {
              $group: {
                  _id: "$default_address.city",
                  count: { $sum: 1 }
              }
          },
          {
              $sort: { count: -1 }
          }
      ]).toArray();
      res.json(geoData);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});


// Customer Lifetime Value by Cohorts
app.get('/api/customer-lifetime-value', async (req, res) => {
  try {
      const cohortData = await db.collection('shopifyOrders').aggregate([
          {
              $addFields: {
                  created_at: { $dateFromString: { dateString: "$created_at" } }
              }
          },
          {
              $group: {
                  _id: {
                      cohort: { $dateToString: { format: "%Y-%m", date: "$created_at" } },
                      customer: "$customer_id"
                  },
                  totalSales: { $sum: "$total_price_set.shop_money.amount" }
              }
          },
          {
              $group: {
                  _id: "$_id.cohort",
                  lifetimeValue: { $sum: "$totalSales" }
              }
          },
          {
              $sort: { "_id": 1 }
          }
      ]).toArray();
      res.json(cohortData);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

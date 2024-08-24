const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // Import CORS middleware
const salesRoutes = require('./routes/salesRoutes');

dotenv.config();

const app = express();

app.use(cors()); // Use CORS middleware
app.use(express.json());
app.use('/api/sales', salesRoutes); // Mount the routes under '/api/sales'

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

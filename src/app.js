const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const billRoutes = require('./routes/billRoutes');
const path = require('path'); // Import the path module

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/bills', billRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
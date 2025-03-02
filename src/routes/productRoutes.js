const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');

// Fetch all products
router.get('/products', productController.getAllProducts);

// Add a new product
router.post('/products', productController.addProduct);

// Update a product
router.put('/:id', productController.updateProduct);

// Delete a product
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;

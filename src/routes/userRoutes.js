const express = require('express');
const path = require('path'); // Import the path module

// Log the resolved path of userController.js
const userControllerPath = path.resolve(__dirname, '../controller/userController.js');
console.log('Resolved path of userController.js:', userControllerPath);

// Require the userController module
const UserController = require(userControllerPath);

const router = express.Router();

// Login route
router.post('/login', UserController.login);

// Register route
router.post('/register', UserController.register);

module.exports = router;
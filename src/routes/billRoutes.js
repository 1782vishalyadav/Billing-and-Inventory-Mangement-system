const express = require('express');
const billController = require('../controller/billController');

const router = express.Router();

router.get('/', billController.getAllBills);
router.post('/', billController.createBill);
router.get('/:id', billController.getBillDetails);
router.delete('/:id', billController.deleteBill);

module.exports = router;
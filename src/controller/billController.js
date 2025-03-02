const db = require('../config/db');

const getAllBills = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM bills');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createBill = async (req, res) => {
    const { customerName, items } = req.body;
    try {
        // Start a transaction
        await db.query('START TRANSACTION');

        // Insert the bill
        const [billResult] = await db.query(
            'INSERT INTO bills (customer_name, total_amount) VALUES (?, ?)',
            [customerName, 0] // Total amount will be calculated later
        );
        const billId = billResult.insertId;

        // Insert bill items and calculate total amount
        let totalAmount = 0;
        for (const item of items) {
            const { productId, quantity } = item;

            // Get product price
            const [productRows] = await db.query('SELECT price FROM products WHERE id = ?', [productId]);
            if (productRows.length === 0) {
                throw new Error(`Product with ID ${productId} not found`);
            }
            const productPrice = productRows[0].price;

            // Insert bill item
            await db.query(
                'INSERT INTO bill_items (bill_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
                [billId, productId, quantity, productPrice]
            );

            // Update total amount
            totalAmount += productPrice * quantity;
        }

        // Update the bill with the total amount
        await db.query('UPDATE bills SET total_amount = ? WHERE id = ?', [totalAmount, billId]);

        // Commit the transaction
        await db.query('COMMIT');

        res.status(201).json({ message: 'Bill created successfully', billId });
    } catch (error) {
        // Rollback the transaction in case of error
        await db.query('ROLLBACK');
        res.status(500).json({ error: error.message });
    }
};

const getBillDetails = async (req, res) => {
    const { id } = req.params;
    try {
        // Get bill information
        const [billRows] = await db.query('SELECT * FROM bills WHERE id = ?', [id]);
        if (billRows.length === 0) {
            return res.status(404).json({ error: 'Bill not found' });
        }
        const bill = billRows[0];

        // Get bill items
        const [itemRows] = await db.query(
            'SELECT bill_items.*, products.name FROM bill_items JOIN products ON bill_items.product_id = products.id WHERE bill_id = ?',
            [id]
        );

        res.json({ ...bill, items: itemRows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteBill = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM bills WHERE id = ?', [id]);
        res.json({ message: 'Bill deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllBills,
    createBill,
    getBillDetails,
    deleteBill,
};
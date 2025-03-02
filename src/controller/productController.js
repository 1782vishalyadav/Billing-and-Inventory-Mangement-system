const db = require('../config/db');

const getAllProducts = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM products');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addProduct = async (req, res) => {
    const { name, price, quantity } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO products (name, price, quantity) VALUES (?, ?, ?)',
            [name, price, quantity]
        );
        const newProduct = { id: result.insertId, name, price, quantity };
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, quantity } = req.body;
    try {
        await db.query(
            'UPDATE products SET name = ?, price = ?, quantity = ? WHERE id = ?',
            [name, price, quantity, id]
        );
        const updatedProduct = { id, name, price, quantity };
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM products WHERE id = ?', [id]);
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllProducts,
    addProduct,
    updateProduct,
    deleteProduct,
};
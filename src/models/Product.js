const db = require('../config/db');

class Product {
    static async getAll() {
        const [rows] = await db.query('SELECT * FROM products');
        return rows;
    }

    static async create(name, price, quantity) {
        const [result] = await db.query(
            'INSERT INTO products (name, price, quantity) VALUES (?, ?, ?)',
            [name, price, quantity]
        );
        return result.insertId;
    }

    static async update(id, name, price, quantity) {
        await db.query(
            'UPDATE products SET name = ?, price = ?, quantity = ? WHERE id = ?',
            [name, price, quantity, id]
        );
    }

    static async delete(id) {
        await db.query('DELETE FROM products WHERE id = ?', [id]);
    }
}

module.exports = Product;
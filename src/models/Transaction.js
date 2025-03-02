const db = require('../config/db');

class Transaction {
    static async create(billId, productId, quantity) {
        const [result] = await db.query(
            'INSERT INTO transactions (bill_id, product_id, quantity) VALUES (?, ?, ?)',
            [billId, productId, quantity]
        );
        return result.insertId;
    }

    static async getByBillId(billId) {
        const [rows] = await db.query('SELECT * FROM transactions WHERE bill_id = ?', [billId]);
        return rows;
    }
}

module.exports = Transaction;

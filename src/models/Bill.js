const db = require('../config/db');

class Bill {
    static async create(userId, totalAmount) {
        const [result] = await db.query(
            'INSERT INTO bills (user_id, total_amount) VALUES (?, ?)',
            [userId, totalAmount]
        );
        return result.insertId;
    }

    static async getAll() {
        const [rows] = await db.query('SELECT * FROM bills');
        return rows;
    }
}

module.exports = Bill;
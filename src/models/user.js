const db = require('../config/db');

class User {
    static async findByUsername(username) {
        const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        return rows[0];
    }

    static async create(user) {
        const { username, password, role } = user;
        const [result] = await db.query(
            'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
            [username, password, role]
        );
        return result.insertId;
    }
}

module.exports = User;
const User = require('../models/user');

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findByUsername(username);

    if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    res.json({ message: 'Login successful', user });
};

exports.register = async (req, res) => {
    const { username, password, role } = req.body;
    const userId = await User.create({ username, password, role });
    res.json({ message: 'User registered', userId });
};
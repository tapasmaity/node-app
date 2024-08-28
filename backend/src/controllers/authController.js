const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt');

/*
* API
* User login
*/
exports.loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).json({ messgae: 'User not found' });

        const vaildPassword = await bcrypt.compare(req.body.password, user.password);
        if (!vaildPassword) return res.status(400).json({ messgae: 'Invalid password' });

        // Generate JWT with 5 minutes expiration
        const token = jwt.sign({ id: user._id, userType: user.userType }, process.env.SECRET_KEY, { expiresIn: '5m' });
        res.json({ token: `Bearer ${token}` });
    } catch (ex) {
        res.status(400).json({ message: 'Bad request', ex: error.message });
    }
};

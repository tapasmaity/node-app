const User = require('../models/user');

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (ex) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (ex) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            userType: req.body.userType,
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (ex) {
        res.status(400).json({ message: 'Bad request' });
    };
};

// Update a user by ID
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                userType: req.body.userType,
            },
            { new: true, runValidators: true }
        );
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (ex) {
        res.status(400).json({ message: 'Bad request' });
    }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(400).json({ message: 'User not found' });
        res.status(204).send();
    } catch (ex) {
        res.status(500).json({ message: 'Server error' });
    }
};

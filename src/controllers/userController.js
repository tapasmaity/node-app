const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const someOtherPlaintextPassword = 'not_bacon';


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
        const myPlaintextPassword = req.body.password;

        // Hash the password
        const hash = await bcrypt.hash(myPlaintextPassword, saltRounds);

        // Create a new user with the hashed password
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hash,
            userType: req.body.userType || 'user', // Set default userType if not provided
        });

        // Save the user to the database
        const savedUser = await newUser.save();

        // Return the saved user
        res.status(201).json(savedUser);
    } catch (ex) {
        res.status(400).json({ message: 'Bad request', error: ex.message });
    }
};


// Update a user by ID
exports.updateUser = async (req, res) => {
    try {
        const updateData = {
            name: req.body.name,
            email: req.body.email,
            userType: req.body.userType || 'user',
        };

        // Check if password needs to be updated
        if (req.body.password) {
            const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
            updateData.password = hashedPassword;
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json(user);
    } catch (ex) {
        res.status(400).json({ message: 'Bad request', error: ex.message });
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

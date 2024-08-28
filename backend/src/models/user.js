const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true,
        default: 'user' // user or admin
    }
}, {
    timestamps: true // This adds `createdAt` and `updatedAt` fields
});

const User = mongoose.model('Users', userSchema);

module.exports = User;

const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true,
    },
    contentType: {
        type: String,
        required: true,
    },
    imageBase64: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Image', ImageSchema);

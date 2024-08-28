const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String
    },
    user: {
        type: Object
    }
}, {
    timestamps: true
});

const Post = mongoose.model('Posts', postSchema);
module.exports = Post;
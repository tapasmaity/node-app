const Post = require('../models/post');

/*
* API
* All posts
*/
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts)
    } catch (ex) {
        res.status(400).json({ message: 'Data not found' })
    }
};

/*
* API
* A single post by ID
*/
exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(400).json({ message: 'Post not found' });
        res.json(post);
    } catch (ex) {
        res.status(500).json({ message: 'Server error' });
    }
};


/*
* API
* Create a new post
*/
exports.createPost = async (req, res) => {
    try {
        const newPost = new Post({
            userId: req.params.id,
            title: req.body.title,
            content: req.body.content,
        });
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (ex) {
        res.status(400).json({ message: 'Bad request' });
    }
};


/*
* API
* Update a post by ID
*/
exports.updatePost = async (req, res) => {

    try {
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                content: req.body.content,
            },
            { new: true, runValidators: true }
        );
        if (!post) return res.status(400).json({ message: 'Post not found' });
        res.json(post);

    } catch (ex) {
        res.status(400).json({ message: 'Bad request' });
    }
};

/*
* API
* Delete a post by ID
*/
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) return res.status(400).json({ message: 'Post not found' });
        res.status(204).send();
    } catch (ex) {
        res.status(500).json({ message: 'Server error' });
    }
};

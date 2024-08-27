const Post = require('../models/post');

// Get all posts
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts)
    } catch (ex) {
        res.status(400).json({ message: 'Data not found' })
    }
};

// Get a single post by ID
exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(400).json({ message: 'Post not found' });
        res.json(post);
    } catch (ex) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Create a new post
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

// Update a post by ID
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



    // const post = posts.find(p => p.id === parseInt(req.params.id));
    // if (!post) return res.status(404).json({ message: 'Post not found' });

    // post.title = req.body.title || post.title;
    // post.content = req.body.content || post.content;
    // res.json(post);
};

// Delete a post by ID
exports.deletePost = (req, res) => {
    const index = posts.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Post not found' });

    posts.splice(index, 1);
    res.status(204).send();
};

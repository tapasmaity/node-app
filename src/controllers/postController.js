const posts = [
    { id: 1, title: 'First Post', content: 'This is the content of the first post.', authorId: 1 },
    { id: 2, title: 'Second Post', content: 'This is the content of the second post.', authorId: 2 },
];

// Get all posts
exports.getAllPosts = (req, res) => {
    res.json(posts);
};

// Get a single post by ID
exports.getPostById = (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
};

// Create a new post
exports.createPost = (req, res) => {
    const newPost = {
        id: posts.length + 1,
        title: req.body.title,
        content: req.body.content,
        authorId: req.body.authorId,
    };
    posts.push(newPost);
    res.status(201).json(newPost);
};

// Update a post by ID
exports.updatePost = (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).json({ message: 'Post not found' });

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    res.json(post);
};

// Delete a post by ID
exports.deletePost = (req, res) => {
    const index = posts.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Post not found' });

    posts.splice(index, 1);
    res.status(204).send();
};

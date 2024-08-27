const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');

// User routes

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         id:
 *           type: integer
 *           description: The user ID.
 *         name:
 *           type: string
 *           description: The user's name.
 *         email:
 *           type: string
 *           description: The user's email.
 *       example:
 *         id: 1
 *         name: John Doe
 *         email: john@example.com
 */


/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieve a list of users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/users', userController.getAllUsers);


/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: A single user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
router.get('/users/:id', userController.getUserById);

router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

// Post routes
router.get('/posts', postController.getAllPosts);
router.get('/posts/:id', postController.getPostById);
router.post('/posts', postController.createPost);
router.put('/posts/:id', postController.updatePost);
router.delete('/posts/:id', postController.deletePost);

module.exports = router;

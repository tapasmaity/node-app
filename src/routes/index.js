const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');

// All Schemas

/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          required:
 *              - name
 *              - email
 *          properties:
 *              name:
 *                  type: string
 *                  description: The user's name.
 *              email:
 *                  type: string
 *                  description: The user's email.
 *          example:
 *              name: John Doe
 *              email: john@example.com
 *      Post:
 *          type: object
 *          required:
 *              - title
 *          properties:
 *              title:
 *                  type: string
 *                  description: Enter your title.
 *              content:
 *                  type: string
 *                  description: .
 *          example:
 *              title: Substitute Text
 *              content: The quick brown fox jumps over the lazy dog, filling in for dummy text.
 */

// User routes

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
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
 *           type: string
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

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       description: User object that needs to be added to the database
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request (e.g., invalid input data)
 *       500:
 *         description: Server error
 */
router.post('/users', userController.createUser);

/**
 * @swagger
 * /api/users/{id}:
 *  put:
 *      summary: Upsate user by id
 *      tags: [Users]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: User ID
 *            schema:
 *                type: string
 *                format: objectId
 *      requestBody:
 *          description: User object that need to be added to the database
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *            description: User update successfully.
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/User'
 *          404:
 *            description: User not found
 */
router.put('/users/:id', userController.updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *  delete:
 *      summary: Delete user by ID
 *      tags: [Users]
 *      parameters:
 *          - in: path
 *            required: true
 *            name: id
 *            description: The user ID
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: User deleted successfuly
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          400:
 *              description: User not found
 */
router.delete('/users/:id', userController.deleteUser);


// Post routes


/**
 * @swagger
 * /api/posts:
 *  get:
 *      summary: Get all posts
 *      tags: [Posts]
 *      responses:
 *          200:
 *              description: A list of posts.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Post'
 */
router.get('/posts', postController.getAllPosts);

/**
 * @swagger
 * /api/posts/{id}:
 *  get:
 *      summary: Single post by ID
 *      tags: [Posts]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: The Post ID
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: Single post
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Post'
 *          400:
 *              description: Post not found.
 */
router.get('/posts/:id', postController.getPostById);


/**
 * @swagger
 * /api/posts/{id}:
 *  post:
 *      summary: Create post by user ID
 *      tags: [Posts]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: The user ID
 *            schema:
 *              type: string
 *      requestBody:
 *          description: Post object that needs to be added to the database
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Post'
 *      responses:
 *          200:
 *              description: Single post
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Post'
 *          400:
 *              description: Post not found.
 */
router.post('/posts/:id', postController.createPost);
router.put('/posts/:id', postController.updatePost);
router.delete('/posts/:id', postController.deletePost);

module.exports = router;

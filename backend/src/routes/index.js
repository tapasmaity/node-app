const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');
const authController = require('../controllers/authController');
const verifyToken = require('../middlewares/auth');

// All Schemas

/**
 * @swagger
 * components:
 *  securitySchemes:
 *      BearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 *  schemas:
 *      User:
 *          type: object
 *          required:
 *              - name
 *              - email
 *              - password
 *              - userType
 *          properties:
 *              name:
 *                  type: string
 *                  description: The user's name.
 *              email:
 *                  type: string
 *                  description: The user's email.
 *                  uniqueItems: true
 *              password:
 *                  type: string
 *                  description: The user's password.
 *              userType:
 *                  type: string
 *                  description: Type of user.
 *          example:
 *              name: John
 *              email: john@example.com
 *              password: pass12345
 *              userType: user
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
 *      LoginResponse:
 *          type: object
 *          properties:
 *              token:
 *                  type: string
 *                  description: JWT token for authentication.
 *          example:
 *              token: your_jwt_token_here
 */

// User Authentication


/**
 * @swagger
 * /api/login:
 *  post:
 *      summary: User login
 *      tags: [Auth]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                              description: User's email address
 *                              example: john@example.com
 *                          password:
 *                              type: string
 *                              description: User's password
 *                              example: pass12345
 *      responses:
 *          200:
 *              description: JWT token returned upon successful login.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/LoginResponse'
 *          400:
 *              description: Invalid email or password.
 *          404:
 *              description: User not found.
 */
router.post('/login', authController.loginUser);


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
router.get('/users', verifyToken, userController.getAllUsers);


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
router.get('/users/:id', verifyToken, userController.getUserById);

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
router.put('/users/:id', verifyToken, userController.updateUser);

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
router.delete('/users/:id', verifyToken, userController.deleteUser);


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
router.get('/posts', verifyToken, postController.getAllPosts);

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
router.get('/posts/:id', verifyToken, postController.getPostById);


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
router.post('/posts/:id', verifyToken, postController.createPost);


/**
 * @swagger
 * /api/posts/{id}:
 *  put:
 *      summary: Update post by ID
 *      tags: [Posts]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: The post ID
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
router.put('/posts/:id', verifyToken, postController.updatePost);


/**
 * @swagger
 * /api/posts/{id}:
 *  delete:
 *      summary: Delete post by ID
 *      tags: [Posts]
 *      parameters:
 *          - in: path
 *            required: true
 *            name: id
 *            description: The post ID
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: Post deleted successfuly
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Post'
 *          400:
 *              description: Post not found
 */
router.delete('/posts/:id', verifyToken, postController.deletePost);

module.exports = router;

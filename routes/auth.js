const express = require('express');
const router = express.Router();

const { usersLogin, selectRole } = require('../controllers/authControllers');
const { authorization } = require('../middleware/authorization');

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           example: user
 *         password:
 *           type: string
 *           example: password123
 *
 *     Role:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Manager
 *
 *     Menu:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         parentId:
 *           type: integer
 *           nullable: true
 *           example: null
 *         name:
 *           type: string
 *           example: Dashboard
 *         path:
 *           type: string
 *           example: /dashboard
 *         icon:
 *           type: string
 *           example: dashboard
 *         sortOrder:
 *           type: integer
 *           example: 1
 *         children:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Menu'
 *
 *     LoginResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           type: object
 *           properties:
 *             accessToken:
 *               type: string
 *               example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *             user:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 username:
 *                   type: string
 *                   example: user
 *                 fullName:
 *                   type: string
 *                   example: John Doe
 *                 roles:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Role'
 *                 menus:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Menu'
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: Invalid username or password
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     description: Login using username and password. If user has multiple roles, system will return available roles.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *           example:
 *             username: user
 *             password: password123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *             example:
 *               success: true
 *               data:
 *                 accessToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 user:
 *                   id: 1
 *                   username: user
 *                   fullName: John Doe
 *                   roles:
 *                     - id: 2
 *                       name: Manager
 *                   menus:
 *                     - id: 1
 *                       parentId: null
 *                       name: Dashboard
 *                       path: /dashboard
 *                       icon: dashboard
 *                       sortOrder: 1
 *                       children: []
 *       400:
 *         description: Bad request - Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: Validation failed
 *       401:
 *         description: Unauthorized - Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: Invalid username or password
 */

/**
 * @swagger
 * /auth/select-role:
 *   post:
 *     summary: Select user role
 *     description: Select role after login when user has multiple roles. Requires Bearer token with tokenType select_role.
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rolesId
 *             properties:
 *               rolesId:
 *                 type: integer
 *                 example: 2
 *           example:
 *             rolesId: 2
 *     responses:
 *       200:
 *         description: Role selected successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Role selected successfully
 *               data:
 *                 accessToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 users:
 *                   id: 1
 *                   username: admin
 *                   fullName: Administrator
 *                   roles:
 *                     - id: 2
 *                       name: Manager
 *                   menus:
 *                     - id: 1
 *                       parentId: null
 *                       name: Dashboard
 *                       path: /dashboard
 *                       icon: dashboard
 *                       sortOrder: 1
 *                       children: []
 *       401:
 *         description: Unauthorized or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: Unauthorized or invalid token
 *       400:
 *         description: Bad request - Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: Validation failed
 *       403:
 *         description: User does not have this role
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: User does not have this role
 */

router.post('/login', usersLogin);
router.post('/select-role', authorization, selectRole);

module.exports = router;

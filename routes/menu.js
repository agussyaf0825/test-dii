const express = require('express');
const router = express.Router();

const { getAllMenu } = require('../controllers/menuController');

/**
 * @swagger
 * components:
 *   schemas:
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
 */

/**
 * @swagger
 * /menu:
 *   get:
 *     summary: Get all menu
 *     description: Retrieve all menu with recursive tree structure
 *     tags:
 *       - Menu
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success get all menu
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - id: 1
 *                   parentId: null
 *                   name: Dashboard
 *                   path: /dashboard
 *                   icon: dashboard
 *                   sortOrder: 1
 *                   children:
 *                     - id: 2
 *                       parentId: 1
 *                       name: User Management
 *                       path: /users
 *                       icon: users
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
 */

router.get('/', getAllMenu);

module.exports = router;

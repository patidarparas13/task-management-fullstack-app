const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const boardController = require('../controllers/boardController');

const validateBoard = [
  body('name').notEmpty().withMessage('Name is required'),
  body('description').optional().isString(),
];

// GET /api/v1/boards?page=1&limit=10 - List all boards with pagination
router.get('/', boardController.getBoards);

// POST /api/v1/boards - Create a new board
router.post('/', validateBoard, boardController.createBoard);

// GET /api/v1/boards/:id - Get a board by ID
router.get('/:id', boardController.getBoardById);

// PUT /api/v1/boards/:id - Update a board
router.put('/:id', validateBoard, boardController.updateBoard);

// DELETE /api/v1/boards/:id - Delete a board
router.delete('/:id', boardController.deleteBoard);

module.exports = router; 
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const taskController = require('../controllers/taskController');

const validateTask = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').optional().isString(),
  body('status').optional().isIn(['todo', 'doing', 'done']).withMessage('Invalid status'),
];

// GET /api/v1/boards/:boardId/tasks - List tasks for a board
router.get('/board/:boardId', taskController.getTasksByBoard);

// POST /api/v1/boards/:boardId/tasks - Create a task for a board
router.post('/board/:boardId', validateTask, taskController.createTask);

// PUT /api/v1/tasks/:id - Update a task
router.put('/:id', validateTask, taskController.updateTask);

// DELETE /api/v1/tasks/:id - Delete a task
router.delete('/:id', taskController.deleteTask);

module.exports = router; 
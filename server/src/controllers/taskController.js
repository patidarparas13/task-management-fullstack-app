const taskService = require('../services/taskService');
const { validationResult } = require('express-validator');
const ApiError = require('../utils/ApiError');

exports.getTasksByBoard = async (req, res, next) => {
  try {
    const { boardId } = req.params;
    if (!boardId || boardId === 'undefined') {
      return res.status(400).json({ 
        data: [], 
        error: 'Invalid board ID', 
        message: 'Board ID is required' 
      });
    }
    const tasks = await taskService.getTasksByBoard(boardId);
    res.json({ data: tasks, error: null, message: null });
  } catch (err) {
    next(err);
  }
};

exports.createTask = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ data: null, error: errors.array(), message: 'Validation error' });
  }
  try {
    const { boardId } = req.params;
    if (!boardId || boardId === 'undefined') {
      return res.status(400).json({ 
        data: null, 
        error: 'Invalid board ID', 
        message: 'Board ID is required' 
      });
    }
    const task = await taskService.createTask(boardId, req.body);
    res.status(201).json({ data: task, error: null, message: 'Task created' });
  } catch (err) {
    next(err);
  }
};

exports.updateTask = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ data: null, error: errors.array(), message: 'Validation error' });
  }
  try {
    const task = await taskService.updateTask(req.params.id, req.body);
    res.json({ data: task, error: null, message: 'Task updated' });
  } catch (err) {
    next(err);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    await taskService.deleteTask(req.params.id);
    res.json({ data: null, error: null, message: 'Task deleted' });
  } catch (err) {
    next(err);
  }
};

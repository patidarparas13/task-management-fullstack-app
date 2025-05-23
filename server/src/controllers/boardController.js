const boardService = require('../services/boardService');
const { validationResult } = require('express-validator');
const ApiError = require('../utils/ApiError');

exports.getBoards = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const boards = await boardService.getBoards(page, limit);
    res.json({ data: boards, error: null, message: null });
  } catch (err) {
    next(err);
  }
};

exports.createBoard = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ data: null, error: errors.array(), message: 'Validation error' });
  }
  try {
    const board = await boardService.createBoard(req.body);
    res.status(201).json({ data: board, error: null, message: 'Board created' });
  } catch (err) {
    next(err);
  }
};

exports.getBoardById = async (req, res, next) => {
  try {
    const board = await boardService.getBoardById(req.params.id);
    res.json({ data: board, error: null, message: null });
  } catch (err) {
    next(err);
  }
};

exports.updateBoard = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ data: null, error: errors.array(), message: 'Validation error' });
  }
  try {
    const board = await boardService.updateBoard(req.params.id, req.body);
    res.json({ data: board, error: null, message: 'Board updated' });
  } catch (err) {
    next(err);
  }
};

exports.deleteBoard = async (req, res, next) => {
  try {
    await boardService.deleteBoard(req.params.id);
    res.json({ data: null, error: null, message: 'Board deleted' });
  } catch (err) {
    next(err);
  }
}; 
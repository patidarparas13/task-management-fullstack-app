const Board = require('../models/Board');
const ApiError = require('../utils/ApiError');

exports.getBoards = async (page = 1, limit = 10) => {
  return await Board.findAll({
    order: [['createdAt', 'DESC']],
    offset: (page - 1) * limit,
    limit,
    raw: true,
  });
};

exports.createBoard = async (data) => {
  const board = await Board.create(data);
  return board;
};

exports.getBoardById = async (id) => {
  const board = await Board.findByPk(id, { raw: true });
  if (!board) throw new ApiError(404, 'Board not found');
  return board;
};

exports.updateBoard = async (id, data) => {
  const [updated, boards] = await Board.update(data, { where: { id }, returning: true });
  if (!updated) throw new ApiError(404, 'Board not found');
  return boards[0];
};

exports.deleteBoard = async (id) => {
  const deleted = await Board.destroy({ where: { id } });
  if (!deleted) throw new ApiError(404, 'Board not found');
  return deleted;
}; 
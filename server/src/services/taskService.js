const Task = require('../models/Task');
const ApiError = require('../utils/ApiError');

exports.getTasksByBoard = async (boardId) => {
  return await Task.findAll({
    where: { boardId },
    order: [['createdAt', 'DESC']],
    raw: true,
  });
};

exports.createTask = async (boardId, data) => {
  const task = await Task.create({ ...data, boardId });
  return task;
};

exports.updateTask = async (id, data) => {
  const [updated, tasks] = await Task.update(data, { where: { id }, returning: true });
  if (!updated) throw new ApiError(404, 'Task not found');
  return tasks[0];
};

exports.deleteTask = async (id) => {
  const deleted = await Task.destroy({ where: { id } });
  if (!deleted) throw new ApiError(404, 'Task not found');
  return deleted;
}; 
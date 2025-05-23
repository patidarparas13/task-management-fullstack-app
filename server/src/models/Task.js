const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const Board = require('./Board');

const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('todo', 'doing', 'done'),
    defaultValue: 'todo',
    allowNull: false,
  },
}, {
  timestamps: true,
});

Task.belongsTo(Board, { foreignKey: 'boardId', onDelete: 'CASCADE' });
Board.hasMany(Task, { foreignKey: 'boardId' });

module.exports = Task; 
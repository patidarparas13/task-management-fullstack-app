const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Board = sequelize.define('Board', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true,
});

module.exports = Board; 
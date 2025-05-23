const { Sequelize } = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize(
  process.env.POSTGRES_DB || 'task_management',
  process.env.POSTGRES_USER || 'postgres',
  process.env.POSTGRES_PASSWORD || '',
  {
    host: process.env.POSTGRES_HOST || 'localhost',
    port: process.env.POSTGRES_PORT || 5432,
    dialect: 'postgres',
    logging: false,
  }
);

module.exports = sequelize; 
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const config = require('./config');
const sequelize = require('./models');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(helmet());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(morgan('dev'));

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Basic metrics endpoint
app.get('/api/metrics', (req, res) => {
  res.json({ uptime: process.uptime(), memory: process.memoryUsage() });
});

const PORT = config.port;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Sequelize sync error:', err);
});

const boardRoutes = require('./routes/boardRoutes');
const taskRoutes = require('./routes/taskRoutes');

app.use('/api/v1/boards', boardRoutes);
app.use('/api/v1/tasks', taskRoutes);

const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

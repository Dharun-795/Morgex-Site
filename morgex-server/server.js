require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');

const app = express();

// 1. Logger First - Capture EVERYTHING
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.path}`);
  next();
});

// 2. Middleware
app.use(cors()); // Temporarily allow all for debugging
app.use(express.json());

// MongoDB Connection
mongoose.set('bufferCommands', false);
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/morgex";

mongoose.connect(MONGO_URI, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4 // Force IPv4 to handle DNS resolution issues with Atlas
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    console.warn('Backend is running, but database operations will fail.');
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);

// Health Check (Database Test)
app.get('/api/health-check', async (req, res) => {
  try {
    const dbStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
    // Test a real query
    const courseCount = await mongoose.model('Course').countDocuments();
    res.json({ 
      status: 'Server is running', 
      database: dbStatus, 
      coursesInDb: courseCount,
      timestamp: new Date()
    });
  } catch (err) {
    res.status(500).json({ status: 'Error', error: err.message });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, "0.0.0.0", () => console.log(`Server started on port ${PORT}`));

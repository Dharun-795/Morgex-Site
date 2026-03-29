const express = require('express');
const jwt = require('jsonwebtoken');
const Course = require('../models/Course');
const User = require('../models/User');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'morgex_fallback_secret_key';

// Middleware to protect routes
const authMiddleware = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get single course
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Enroll in a course (Mock Payment Success)
router.post('/enroll', authMiddleware, async (req, res) => {
  try {
    const { courseId } = req.body;
    
    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    
    // Add to user enrollments if not already there
    const user = await User.findById(req.user.id);
    const existingEnrollment = user.enrolledCourses.find(e => e.courseId.toString() === courseId);
    
    if (!existingEnrollment) {
      const now = new Date();
      const expiry = new Date();
      expiry.setFullYear(now.getFullYear() + 1); // 1-year access
      
      user.enrolledCourses.push({
        courseId,
        enrolledAt: now,
        expiresAt: expiry
      });
      await user.save();
    }
    
    res.json({ message: 'Successfully enrolled', enrolledCourses: user.enrolledCourses });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get User's enrolled courses details
router.get('/user/enrolled', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const courseIds = user.enrolledCourses.map(e => e.courseId);
    const courses = await Course.find({ _id: { $in: courseIds } });
    
    // Merge database course details with user's enrollment metadata
    const enrichedCourses = courses.map(course => {
      const enrollment = user.enrolledCourses.find(e => e.courseId.toString() === course._id.toString());
      return {
        ...course.toObject(),
        enrolledAt: enrollment.enrolledAt,
        expiresAt: enrollment.expiresAt
      };
    });
    
    res.json(enrichedCourses);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;

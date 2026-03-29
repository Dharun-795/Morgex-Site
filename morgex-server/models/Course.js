const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  instructor: {
    type: String,
    required: true,
    default: 'Morgex Expert'
  },
  thumbnail: {
    type: String,
  },
  category: {
    type: String,
    required: true,
    default: 'Other'
  },
  rating: {
    type: Number,
    default: 4.5
  },
  students: {
    type: Number,
    default: 0
  },
  duration: {
    type: String,
    default: 'Self-paced'
  },
  badge: {
    type: String,
    default: 'New'
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
    default: 1999
  },
  curriculum: {
    type: [String],
    default: []
  }
}, { timestamps: true });

module.exports = mongoose.model('Course', CourseSchema);

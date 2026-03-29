import React from 'react';
import { Link } from 'react-router-dom';
import './CourseCard.css';

const CourseCard = ({ course }) => {
  return (
    <Link to={`/course/${course._id || course.id}`} className="course-card">
      <div className="card-image">
        <img 
          src={course.thumbnail || course.image} 
          alt={course.title} 
          onError={(e) => { e.target.src = 'https://via.placeholder.com/330x220?text=No+Image' }} 
        />
      </div>
      <div className="card-content">
        <h6 className="card-title"><strong>{course.title}</strong></h6>
        <p className="card-desc">{course.description || course.desc}</p>
        <h5 className="card-instructor">{course.instructor || 'Expert Instructor'}</h5>
        
        <div className="card-meta">
          <label className="badge">{course.category || course.badge || 'New'}</label>
          <label className="meta-tag">👥 {course.students}</label>
          <label className="meta-tag">⭐ {course.rating}</label>
          <label className="meta-tag">⏱️ {course.duration || 'Self-paced'}</label>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;

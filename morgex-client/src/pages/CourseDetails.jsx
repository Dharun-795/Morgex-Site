import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import CheckoutModal from '../components/CheckoutModal';
import './CourseDetails.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5001/api';

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCheckout, setShowCheckout] = useState(false);
  const { currentUser, getToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    try {
      const res = await fetch(`${API_URL}/courses/${id}`);
      if (!res.ok) throw new Error('Failed to fetch course');
      const data = await res.json();
      setCourse(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEnrollmentSuccess = async () => {
    setShowCheckout(false);
    try {
      const res = await fetch(`${API_URL}/courses/enroll`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-auth-token': getToken()
        },
        body: JSON.stringify({ courseId: id })
      });
      if (!res.ok) throw new Error('Enrollment failed');
      navigate('/dashboard');
    } catch (err) {
      alert(err.message);
    }
  };

  const handleBuyClick = () => {
    if (!currentUser) {
      navigate(`/login?redirect=/course/${id}`);
    } else {
      setShowCheckout(true);
    }
  };

  if (loading) return <div className="loading-state">Loading Course...</div>;
  if (error) return <div className="error-state">{error}</div>;
  if (!course) return <div className="error-state">Course not found</div>;

  return (
    <div className="course-details-page">
      <div className="course-header-bg">
        <div className="section-container course-header-content">
          <h1>{course.title}</h1>
          <p className="course-desc-large">{course.desc}</p>
          <div className="course-meta-large">
            <span className="badge">{course.badge}</span>
            <span>⭐ {course.rating}</span>
            <span>👥 {course.students}</span>
            <span>⏱️ {course.duration}</span>
          </div>
          <p className="instructor-name">Created by <strong>{course.instructor}</strong></p>
        </div>
      </div>

      <div className="section-container course-body-layout">
        <div className="course-main-content">
          <h2>What you'll learn</h2>
          <div className="learning-objectives">
            <ul>
              <li>Build real-world applications from scratch</li>
              <li>Master core concepts and advanced techniques</li>
              <li>Deploy your projects to production environments</li>
              <li>Write clean, maintainable, and efficient code</li>
            </ul>
          </div>
          
          <h2>Course Curriculum</h2>
          <div className="curriculum-list">
            <div className="module">
              <h4>Module 1: Introduction & Setup</h4>
              <p>Getting your environment ready for development.</p>
            </div>
            <div className="module">
              <h4>Module 2: Core Concepts</h4>
              <p>Deep dive into the fundamental building blocks.</p>
            </div>
            <div className="module">
              <h4>Module 3: Advanced Architectures</h4>
              <p>Scaling, design patterns, and performance optimization.</p>
            </div>
            <div className="module">
              <h4>Module 4: Final Project</h4>
              <p>Build a complete application and deploy it.</p>
            </div>
          </div>
        </div>

        <div className="course-sidebar-wrapper">
          <div className="course-sidebar-card">
            <img src={course.thumbnail || course.image} alt={course.title} className="sidebar-image" />
            <div className="sidebar-content">
              <h2 className="price">₹{course.price}</h2>
              <button className="btn buy-btn" onClick={handleBuyClick}>
                {currentUser ? 'Buy Now' : 'Sign in to Buy'}
              </button>
              <div className="guarantee">
                <small>30-Day Money-Back Guarantee</small>
              </div>
              <ul className="sidebar-features">
                <li>✅ Full lifetime access</li>
                <li>✅ Access on mobile and TV</li>
                <li>✅ Certificate of completion</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {showCheckout && (
        <CheckoutModal 
          course={course} 
          onClose={() => setShowCheckout(false)} 
          onSuccess={handleEnrollmentSuccess}
        />
      )}
    </div>
  );
};

export default CourseDetails;

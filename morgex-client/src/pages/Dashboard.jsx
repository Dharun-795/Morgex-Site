import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { allCourses, userEnrollments } from '../data/mockData';
import CourseCard from '../components/CourseCard';
import './Dashboard.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5001/api';

const Dashboard = () => {
  const { currentUser, getToken } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      fetchUserCourses();
    }
  }, [currentUser]);

  const fetchUserCourses = async () => {
    try {
      const res = await fetch(`${API_URL}/courses/user/enrolled`, {
        headers: {
          'x-auth-token': getToken()
        }
      });
      if (!res.ok) throw new Error('API failed');
      const data = await res.json();
      
      // Add mock progress to the real data from DB
      const processedData = data.map(c => ({
        ...c, 
        progress: Math.floor(Math.random() * 80) + 10 
      }));
      setEnrolledCourses(processedData);
    } catch (err) {
      console.warn("Backend fetch failed, using mock data", err);
      // Fallback to mock data if backend isn't running
      const courseIds = userEnrollments['test@user.com'] || [];
      const userCourses = allCourses.map(c => {
        if (courseIds.includes(c.id)) {
          return { ...c, progress: Math.floor(Math.random() * 80) + 10 }; 
        }
        return null;
      }).filter(Boolean);
      setEnrolledCourses(userCourses);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric'
    });
  };

  if (loading) return <div className="loading-state">Loading Dashboard...</div>;

  return (
    <div className="dashboard-container section-container">
      <div className="dashboard-header">
        <h2>My Dashboard</h2>
        <div className="user-welcome-info">
          <p>Welcome back, {currentUser?.username || currentUser?.email.split('@')[0]}!</p>
          {currentUser?.lastLogin && (
            <small className="last-login">Last Login: {formatDate(currentUser.lastLogin)}</small>
          )}
        </div>
      </div>

      <div className="enrolled-courses">
        {enrolledCourses.length > 0 ? (
          <div className="course-list">
            {enrolledCourses.map(course => (
              <div key={course._id || course.id} className="course-progress-card">
                <div className="access-info-bar">
                  <span className="info-item">📅 Enrolled: {formatDate(course.enrolledAt)}</span>
                  <span className="info-item expiry">⏳ Expires: {formatDate(course.expiresAt)}</span>
                </div>
                <CourseCard course={course} />
                <div className="progress-bar-container">
                  <div className="progress-info">
                    <span>Course Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="progress-bg">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <button className="btn continue-btn">Continue Learning</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">📚</div>
            <h3>No Courses Yet</h3>
            <p>You haven't enrolled in any courses. Explore our catalog to start building your skills!</p>
            <a href="/#courses" className="btn exp-btn">Browse Catalog</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

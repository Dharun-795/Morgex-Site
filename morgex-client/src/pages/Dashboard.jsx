import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { allCourses, userEnrollments } from '../data/mockData';
import CourseCard from '../components/CourseCard';
import CertificateModal from '../components/CertificateModal';
import './Dashboard.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5001/api';

const Dashboard = () => {
  const { currentUser, getToken } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourseForCert, setSelectedCourseForCert] = useState(null);

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
      
      // Add mock progress to the real data from DB if not completed
      const processedData = data.map(c => ({
        ...c, 
        progress: c.isCompleted ? 100 : (c.progress || Math.floor(Math.random() * 60) + 10)
      }));
      setEnrolledCourses(processedData);
    } catch (err) {
      console.warn("Backend fetch failed, using mock data", err);
      // Fallback to mock data if backend isn't running
      const courseIds = userEnrollments[currentUser?.email] || userEnrollments['test@user.com'] || [];
      const userCourses = allCourses.map(c => {
        if (courseIds.includes(c.id)) {
          return { ...c, progress: Math.floor(Math.random() * 80) + 10, isCompleted: false }; 
        }
        return null;
      }).filter(Boolean);
      setEnrolledCourses(userCourses);
    } finally {
      setLoading(false);
    }
  };

  const markAsComplete = async (courseId) => {
    try {
      const res = await fetch(`${API_URL}/courses/complete/${courseId}`, {
        method: 'POST',
        headers: {
          'x-auth-token': getToken()
        }
      });
      if (res.ok) {
        fetchUserCourses();
      } else {
        const error = await res.json();
        alert(error.message || "Failed to complete course");
      }
    } catch (err) {
      console.error(err);
      alert("Network error while completing course");
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
                  {course.isCompleted ? (
                    <span className="info-item completed-tag">⭐ Completed on {formatDate(course.completedAt)}</span>
                  ) : (
                    <span className="info-item expiry">⏳ Expires: {formatDate(course.expiresAt)}</span>
                  )}
                </div>
                <CourseCard course={course} />
                <div className="progress-bar-container">
                  <div className="progress-info">
                    <span>Course Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="progress-bg">
                    <div 
                      className={`progress-fill ${course.isCompleted ? 'completed' : ''}`} 
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  
                  {course.isCompleted ? (
                    <button 
                      className="btn certificate-btn"
                      onClick={() => setSelectedCourseForCert(course)}
                    >
                      🎓 View Certificate
                    </button>
                  ) : (
                    <div className="dashboard-actions-grid">
                      <button className="btn continue-btn">Continue</button>
                      <button 
                        className="btn complete-btn"
                        onClick={() => markAsComplete(course._id || course.id)}
                      >
                        ✅ Complete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">📚</div>
            <h3>No Courses Yet</h3>
            <p>You haven't enrolled in any courses. Explore our catalog to start building your skills!</p>
            <a href="/courses" className="btn exp-btn">Browse Catalog</a>
          </div>
        )}
      </div>

      {selectedCourseForCert && (
        <CertificateModal 
          course={selectedCourseForCert} 
          user={currentUser}
          onClose={() => setSelectedCourseForCert(null)} 
        />
      )}
    </div>
  );
};

export default Dashboard;

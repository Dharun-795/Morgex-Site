import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-page">
      <div className="about-header-bg">
        <div className="section-container">
          <h1>About Morgex</h1>
          <p className="about-subtitle">Empowering the next generation of technologists.</p>
        </div>
      </div>

      <div className="section-container">
        <div className="about-grid">
          <div className="about-content">
            <h2>Our Mission</h2>
            <p>
              Morgex was founded with a single mission: to bridge the gap between traditional education and industry requirements. 
              We believe that practical, hands-on experience is the only true way to learn modern software development.
            </p>
            <p>
              By combining world-class curriculum with real-world projects, we help dreamers become doers, and doers become industry leaders.
            </p>
            
            <h2 className="mt-40">The Morgex Difference</h2>
            <ul className="difference-list">
              <li><strong>Project-Based:</strong> Learn by building real applications, not just reading theory.</li>
              <li><strong>Expert Led:</strong> Every course is designed by professionals working in top tech companies.</li>
              <li><strong>Community:</strong> Join a thriving network of ambitious learners and alumni.</li>
            </ul>
          </div>
          
          <div className="about-stats-glass">
            <div className="stat-box">
              <h3>50+</h3>
              <p>Premium Courses</p>
            </div>
            <div className="stat-box">
              <h3>10k+</h3>
              <p>Active Students</p>
            </div>
            <div className="stat-box">
              <h3>95%</h3>
              <p>Placement Rate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

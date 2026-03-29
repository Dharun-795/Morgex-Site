import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import CourseCard from '../components/CourseCard';
import { allCourses as mockCourses } from '../data/mockData';
import './Home.css';
import './Home-extensions.css';
import './Home-toc.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5001/api';

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [activeSection, setActiveSection] = useState('about');
  const sectionsRef = useRef([]);

  useEffect(() => {
    fetchCourses();
    
    // Setup Intersection Observer for TOC
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { rootMargin: '-150px 0px -60% 0px' });

    sectionsRef.current.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await fetch(`${API_URL}/courses`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setCourses(data);
    } catch (err) {
      console.warn("Backend unreachable, falling back to mock Data");
      setCourses(mockCourses);
    }
  };

  return (
    <div className="home-container">
      <section className="hero">
        <h1>Build Skills That Matter</h1>
        <p>Learn. Practice. Build. Grow with Morgex.</p>
        <a href="#courses" className="btn hero-btn">Explore Courses</a>
      </section>

      <div className="home-layout-grid section-container">
        <div className="home-main-content">
          
          <div id="about" className="scroll-section" ref={el => sectionsRef.current[0] = el}>
            <h2>About The Morgex Platform</h2>
            <p>
              Morgex is a premier, industry-focused practical learning platform dedicated to transforming passionate learners into high-impact technology professionals. 
              Our mission is to bridge the gap between academic theory and the rapidly evolving demands of the global tech industry by providing learners with a curriculum that is 100% project-driven. 
              At Morgex, we believe that the best way to master a skill is by doing, not just watching.
            </p>
            <p>
              Each of our courses is meticulously crafted by world-class veterans from top-tier tech companies. Whether you are delving into Full Stack Web Development, 
              securing digital infrastructures through Cybersecurity, or architecting the future with Machine Learning, Morgex provides the guided, hands-on training you need to excel. 
              Our platform offers comprehensive roadmaps, interactive environments, and a supportive community to ensure that every student reaches their full career potential.
            </p>
            <p>
              Join thousands of successful graduates who have transitioned into roles at global tech giants using the skills, portfolios, and certifications they earned right here. 
              Morgex isn't just an educational tool; it's a career accelerator designed for the next generation of builders and innovators.
            </p>
          </div>

          <div id="how-it-works" className="scroll-section flow" ref={el => sectionsRef.current[1] = el}>
            <h2>How Morgex Works</h2>
            <div className="flowBox">
              <div className="flow-card">
                <h4>Learn</h4>
                <p>Follow structured lessons created by industry professionals.</p>
              </div>
              <div className="flow-card">
                <h4>Practice</h4>
                <p>Apply concepts through hands-on projects and exercises.</p>
              </div>
              <div className="flow-card">
                <h4>Build</h4>
                <p>Create real applications to strengthen your portfolio.</p>
              </div>
              <div className="flow-card">
                <h4>Certify</h4>
                <p>Earn certifications that validate your skills.</p>
              </div>
            </div>
          </div>
          
          <div id="why-us" className="scroll-section why" ref={el => sectionsRef.current[2] = el}>
            <h2>Why Choose Morgex?</h2>
            <div className="whyBox">
              <div className="why-card">🎓 Industry Expert Instructors</div>
              <div className="why-card">💻 Hands-on Practical Training</div>
              <div className="why-card">📜 Certification After Completion</div>
              <div className="why-card">🚀 Career Oriented Courses</div>
            </div>
          </div>

          <div id="courses" className="scroll-section" ref={el => sectionsRef.current[3] = el}>
            <h2>Featured Top 4 Courses</h2>
            <div className="course-grid">
              {courses.length > 0 ? (
                courses.slice(0, 4).map((course) => (
                  <CourseCard key={course._id || course.id} course={course} />
                ))
              ) : (
                <p>No courses available right now.</p>
              )}
            </div>
          </div>

          <div id="instructors" className="scroll-section instructors-section" ref={el => sectionsRef.current[4] = el}>
            <h2>Learn From The Best</h2>
            <p style={{textAlign:"left", marginBottom:"30px"}}>Our instructors are real-world professionals.</p>
            <div className="instructor-grid">
              <div className="instructor-card">
                <div className="instructor-avatar">👨‍💻</div>
                <h4>Dr. Dharun Vijaya</h4>
                <p className="instructor-title">Senior Full Stack Developer</p>
                <p className="instructor-bio">Over 10 years of experience building scalable systems for global tech giants.</p>
              </div>
              <div className="instructor-card">
                <div className="instructor-avatar">👩‍💻</div>
                <h4>Dr. Rakshana</h4>
                <p className="instructor-title">Mobile App Architect</p>
                <p className="instructor-bio">Creator of several top-charting Android applications and a passionate educator.</p>
              </div>
            </div>
          </div>

          <div id="testimonials" className="scroll-section testimonial-section" ref={el => sectionsRef.current[5] = el}>
            <h2>What Our Students Say</h2>
            <div className="testimonial-grid">
              <div className="testimonial-card">
                <p className="quote">"Morgex completely transformed my career. The hands-on projects gave me the exact portfolio I needed to land my first developer job!"</p>
                <div className="student-info">
                  <span className="student-name">- Priya S.</span>
                  <span className="student-role">Software Engineer</span>
                </div>
              </div>
              <div className="testimonial-card">
                <p className="quote">"The artificial intelligence course breaks down complex topics into digestible pieces. I actually understand ML algorithms now."</p>
                <div className="student-info">
                  <span className="student-name">- Rohan K.</span>
                  <span className="student-role">Data Analyst</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar TOC */}
        <div className="home-sidebar">
          <div className="toc-card">
            <h3>Table of Contents</h3>
            <ul className="toc-list">
              <li><a href="#about" className={activeSection === 'about' ? 'active' : ''}>About</a></li>
              <li><a href="#how-it-works" className={activeSection === 'how-it-works' ? 'active' : ''}>How It Works</a></li>
              <li><a href="#why-us" className={activeSection === 'why-us' ? 'active' : ''}>Why Choose Us</a></li>
              <li><a href="#courses" className={activeSection === 'courses' ? 'active' : ''}>Top Courses</a></li>
              <li><a href="#instructors" className={activeSection === 'instructors' ? 'active' : ''}>Instructors</a></li>
              <li><a href="#testimonials" className={activeSection === 'testimonials' ? 'active' : ''}>Testimonials</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="newsletter-section">
        <div className="section-container">
          <h2>Ready to start learning?</h2>
          <p style={{textAlign:"left", marginBottom:"30px"}}>Join thousands of students and build skills that matter today.</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Enter your email address" className="input-field" style={{marginBottom: 0}} />
            <button className="btn">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

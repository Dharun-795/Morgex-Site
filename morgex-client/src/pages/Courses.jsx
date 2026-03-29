import React, { useState, useEffect } from 'react';
import CourseCard from '../components/CourseCard';
import { allCourses as mockCourses } from '../data/mockData';
import './Courses.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5001/api';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', 'Web Development', 'Cloud Computing', 'Cybersecurity', 'Data Science'];

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await fetch(`${API_URL}/courses`);
      if (!res.ok) throw new Error('API failed');
      const data = await res.json();
      setCourses(data);
      setFilteredCourses(data);
    } catch (err) {
      console.warn("Backend unavailable, using mock data");
      setCourses(mockCourses);
      setFilteredCourses(mockCourses);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const results = courses.filter(course => {
      const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           course.instructor?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    setFilteredCourses(results);
  }, [searchTerm, selectedCategory, courses]);

  return (
    <div className="courses-page-container">
      <div className="courses-header">
        <h1>All Courses</h1>
        <p>Explore our extensive library of high-quality tech courses designed by industry experts.</p>
      </div>
      
      <div className="courses-main-content section-container">
        {/* Sidebar Filters */}
        <aside className="courses-sidebar">
          <h3>Categories</h3>
          <ul className="category-list">
            {categories.map(cat => (
              <li 
                key={cat} 
                className={selectedCategory === cat ? 'active' : ''}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </li>
            ))}
          </ul>
        </aside>

        {/* Course Grid & Search */}
        <div className="courses-gallery">
          <div className="search-filter-controls">
            <div className="search-bar-wrapper">
              <span className="search-icon">🔍</span>
              <input 
                type="text" 
                placeholder="Search for anything (React, Python, AWS...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="results-count">
              {filteredCourses.length} results found
            </div>
          </div>

          {loading ? (
            <div style={{textAlign: 'center', padding: '50px', width: '100%'}}>
              Loading amazing courses...
            </div>
          ) : (
            <>
              {filteredCourses.length > 0 ? (
                <div className="course-grid">
                  {filteredCourses.map(course => (
                    <CourseCard key={course._id || course.id} course={course} />
                  ))}
                </div>
              ) : (
                <div className="no-results">
                  <h3>No matching courses found</h3>
                  <p>Try adjusting your search or category filters.</p>
                  <button className="btn" onClick={() => {setSearchTerm(''); setSelectedCategory('All');}}>
                    Clear all filters
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;

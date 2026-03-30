import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { currentUser, logout, getToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [userStats, setUserStats] = useState({ ongoing: 0, completed: 0 });

  // Only apply transparent/floating effect on Home page
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetchUserStats();
    }
  }, [currentUser]);

  const fetchUserStats = async () => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5001/api';
    try {
      const res = await fetch(`${API_URL}/courses/user/enrolled`, {
        headers: { 'x-auth-token': getToken() }
      });
      if (res.ok) {
        const data = await res.json();
        const ongoing = data.filter(c => !c.isCompleted).length;
        const completed = data.filter(c => c.isCompleted).length;
        setUserStats({ ongoing, completed });
      }
    } catch (err) {
      console.warn("Could not fetch user stats for Navbar");
    }
  };

  const getInitial = () => {
    if (!currentUser) return '?';
    const name = currentUser.username || currentUser.email;
    return name.charAt(0).toUpperCase();
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    setProfileOpen(false);
    navigate('/');
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className={`navbar ${isHome && !isScrolled ? 'navbar-transparent' : 'navbar-solid'} ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/" className="navbar-logo" onClick={closeMenu}>
            <img src="/Logo.jpg" alt="Morgex Emblem" className="logo-emblem" />
            <img src="/Morgex-Name-Logo .jpg" alt="Morgex Name" className="logo-text" />
          </Link>
          
          <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
            <Link to="/" className="link-fancy" onClick={closeMenu}>Home</Link>
            <Link to="/courses" className="link-fancy" onClick={closeMenu}>All Courses</Link>
            {currentUser && <Link to="/dashboard" className="link-fancy" onClick={closeMenu}>Dashboard</Link>}
            <Link to="/about" className="link-fancy" onClick={closeMenu}>About Us</Link>
          </div>
        </div>
        
        <div className={`navbar-auth ${isMenuOpen ? 'active' : ''}`}>
          {currentUser ? (
            <div className="user-area-enhanced">
              <div className="avatar-wrapper" onClick={() => setProfileOpen(!profileOpen)}>
                <div className="avatar-circle">{getInitial()}</div>
                {profileOpen && (
                  <div className="profile-dropdown">
                    <div className="dropdown-header">
                      <p className="user-email">{currentUser.email}</p>
                      <p className="user-role">Student</p>
                    </div>
                    <div className="dropdown-stats">
                      <div className="stat-item">
                        <span>Ongoing</span>
                        <strong>{userStats.ongoing}</strong>
                      </div>
                      <div className="stat-item">
                        <span>Completed</span>
                        <strong>{userStats.completed}</strong>
                      </div>
                    </div>
                    <div className="dropdown-actions">
                      <button onClick={() => { navigate('/dashboard'); setProfileOpen(false); closeMenu(); }}>My Learning</button>
                      <button className="logout-btn" onClick={handleLogout}>Logout</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <button className="btn nav-btn" onClick={() => { navigate('/login'); closeMenu(); }}>Sign In</button>
          )}
        </div>

        {/* Hamburger Widget */}
        <div className={`nav-toggle ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

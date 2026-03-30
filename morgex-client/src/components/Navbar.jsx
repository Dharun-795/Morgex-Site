import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { currentUser, logout, getToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userStats, setUserStats] = useState({ ongoing: 0, completed: 0 });
  const drawerRef = useRef(null);

  // Only apply transparent/floating effect on Home page
  const isHome = location.pathname === '/';

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside the drawer
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMenuOpen && drawerRef.current && !drawerRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  useEffect(() => {
    if (currentUser) fetchUserStats();
  }, [currentUser]);

  const fetchUserStats = async () => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5001/api';
    try {
      const res = await fetch(`${API_URL}/courses/user/enrolled`, {
        headers: { 'x-auth-token': getToken() }
      });
      if (res.ok) {
        const data = await res.json();
        setUserStats({
          ongoing: data.filter(c => !c.isCompleted).length,
          completed: data.filter(c => c.isCompleted).length,
        });
      }
    } catch (err) {
      console.warn('Could not fetch user stats for Navbar');
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
    navigate('/');
  };

  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  return (
    <>
      {/* Backdrop overlay */}
      {isMenuOpen && <div className="mobile-overlay" onClick={closeMenu} />}

      <nav className={`navbar ${isHome && !isScrolled ? 'navbar-transparent' : 'navbar-solid'}`}>
        <div className="navbar-container">

          {/* Logo */}
          <Link to="/" className="navbar-logo" onClick={closeMenu}>
            <img src="/Logo.jpg" alt="Morgex Emblem" className="logo-emblem" />
            <img src="/Morgex-Name-Logo .jpg" alt="Morgex Name" className="logo-text" />
          </Link>

          {/* Desktop links */}
          <div className="navbar-links desktop-only">
            <Link to="/" className="link-fancy">Home</Link>
            <Link to="/courses" className="link-fancy">All Courses</Link>
            {currentUser && <Link to="/dashboard" className="link-fancy">Dashboard</Link>}
            <Link to="/about" className="link-fancy">About Us</Link>
          </div>

          {/* Desktop auth */}
          <div className="navbar-auth desktop-only">
            {currentUser ? (
              <div className="user-area-enhanced">
                <div className="avatar-wrapper" onClick={() => navigate('/dashboard')}>
                  <div className="avatar-circle">{getInitial()}</div>
                </div>
              </div>
            ) : (
              <button className="btn nav-btn" onClick={() => navigate('/login')}>Sign In</button>
            )}
          </div>

          {/* Hamburger — mobile only */}
          <div className={`nav-toggle ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </div>
      </nav>

      {/* ===== UNIFIED MOBILE DRAWER (outside <nav> for correct stacking) ===== */}
      <div ref={drawerRef} className={`mobile-drawer ${isMenuOpen ? 'active' : ''}`}>
        {/* Close button */}
        <button className="drawer-close" onClick={closeMenu}>✕</button>

        {/* User profile section inside drawer */}
        {currentUser ? (
          <div className="drawer-profile">
            <div className="drawer-avatar">{getInitial()}</div>
            <div className="drawer-user-info">
              <p className="drawer-email">{currentUser.email}</p>
              <p className="drawer-role">Student</p>
            </div>
            <div className="drawer-stats">
              <div className="drawer-stat">
                <strong>{userStats.ongoing}</strong>
                <span>Ongoing</span>
              </div>
              <div className="drawer-stat">
                <strong>{userStats.completed}</strong>
                <span>Completed</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="drawer-guest">
            <p>Welcome to <strong>Morgex</strong></p>
          </div>
        )}

        <hr className="drawer-divider" />

        {/* Nav Links */}
        <nav className="drawer-links">
          <Link to="/" className="drawer-link" onClick={closeMenu}>🏠 Home</Link>
          <Link to="/courses" className="drawer-link" onClick={closeMenu}>📚 All Courses</Link>
          {currentUser && (
            <Link to="/dashboard" className="drawer-link" onClick={closeMenu}>📊 Dashboard</Link>
          )}
          <Link to="/about" className="drawer-link" onClick={closeMenu}>ℹ️ About Us</Link>
        </nav>

        <hr className="drawer-divider" />

        {/* Auth actions at the bottom */}
        <div className="drawer-actions">
          {currentUser ? (
            <>
              <button
                className="drawer-btn primary"
                onClick={() => { navigate('/dashboard'); closeMenu(); }}
              >
                My Learning
              </button>
              <button className="drawer-btn danger" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="drawer-btn primary"
                onClick={() => { navigate('/login'); closeMenu(); }}
              >
                Sign In
              </button>
              <button
                className="drawer-btn outline"
                onClick={() => { navigate('/register'); closeMenu(); }}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;

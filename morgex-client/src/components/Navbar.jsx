import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
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
            <Link to="/about" className="link-fancy" onClick={closeMenu}>About Us</Link>
          </div>
        </div>
        
        <div className={`navbar-auth ${isMenuOpen ? 'active' : ''}`}>
          {currentUser ? (
            <div className="user-area">
              <span className="user-name">👤 {currentUser.username || currentUser.email.split('@')[0]}</span>
              <button className="btn nav-btn" onClick={() => { navigate('/dashboard'); closeMenu(); }}>My Courses</button>
              <button className="btn nav-btn outline" onClick={handleLogout}>Logout</button>
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

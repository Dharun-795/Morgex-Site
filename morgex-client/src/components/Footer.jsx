import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-glass">
        <h3>Morgex Educational Platform</h3>
        <p>&copy; {new Date().getFullYear()} All Copyrights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;

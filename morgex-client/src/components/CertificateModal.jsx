import React from 'react';
import './CertificateModal.css';

const CertificateModal = ({ course, user, onClose }) => {
  const completionDate = course.completedAt ? new Date(course.completedAt).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric'
  }) : new Date().toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric'
  });

  return (
    <div className="cert-modal-overlay">
      <div className="cert-modal-content">
        <button className="cert-close-btn" onClick={onClose}>&times;</button>
        
        <div className="certificate-container">
          <div className="cert-border-outer">
            <div className="cert-border-inner">
              <div className="cert-body">
                <div className="cert-header">
                  <img src="/Logo.jpg" alt="Morgex Logo" className="cert-logo" />
                  <h1>CERTIFICATE OF COMPLETION</h1>
                </div>
                
                <p className="cert-sub">This is to certify that</p>
                <h2 className="cert-user-name">{user?.username || 'Valued Student'}</h2>
                
                <div className="cert-divider"></div>
                
                <p className="cert-text">has successfully completed the course</p>
                <h3 className="cert-course-title">{course.title}</h3>
                
                <p className="cert-completion">Completed on <strong>{completionDate}</strong></p>
                
                <div className="cert-footer">
                  <div className="signature">
                    <div className="sig-line"></div>
                    <span>Course Instructor</span>
                    <p>{course.instructor || 'Morgex expert'}</p>
                  </div>
                  
                  <div className="sig-badge">
                    <div className="badge-seal">🎖️</div>
                    <span>Verified by Morgex</span>
                  </div>
                  
                  <div className="signature">
                    <div className="sig-line"></div>
                    <span>CEO, Morgex Education</span>
                    <p>Dharun Kumar</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="cert-actions">
          <button className="btn print-btn" onClick={() => window.print()}>🖨️ Print Certificate</button>
          <button className="btn share-btn">🔗 Share to LinkedIn</button>
        </div>
      </div>
    </div>
  );
};

export default CertificateModal;

import "../styles/Dashboard.css";

type ProfileProps = {
  onNavigate?: (page: string) => void;
};

export default function Profile({ onNavigate }: ProfileProps) {
  const handleBack = () => {
    if (onNavigate) {
      onNavigate('dashboard');
    }
  };

  return (
    <div className="profile">
      <div className="profile-header">
        <div className="back-button">
          <a href="#" onClick={handleBack}>
            ← Back
          </a>
        </div>
        <h2 className="profile-title">Profile</h2>
      </div>
      
      <div className="profile-content">
        <div className="profile-main">
          <div className="profile-avatar">
            <div className="user-photo">
              <img src="/profile.png" alt="User Profile" />
            </div>
            <div className="profile-name">Sarah Johnson</div>
            <div className="profile-role">Parent Account</div>
          </div>
          
          <div className="profile-details">
            <div className="detail-section">
              <h3 className="section-title">Account Information</h3>
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="detail-label">Full Name</span>
                  <span className="detail-value">Sarah Johnson</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Email</span>
                  <span className="detail-value">sarah.johnson@email.com</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Phone</span>
                  <span className="detail-value">+1 (555) 123-4567</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Member Since</span>
                  <span className="detail-value">January 2024</span>
                </div>
              </div>
            </div>
            
            <div className="detail-section">
              <h3 className="section-title">Child Information</h3>
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="detail-label">Child Name</span>
                  <span className="detail-value">Emma Johnson</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Age</span>
                  <span className="detail-value">14 years old</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Grade</span>
                  <span className="detail-value">8th Grade</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Device</span>
                  <span className="detail-value">iPhone 13</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Screen Time</span>
                  <span className="detail-value">2h 30m daily</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

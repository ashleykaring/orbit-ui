import "../styles/Dashboard.css";

type SideMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SideMenu({ isOpen, onClose }: SideMenuProps) {
  return (
    <>
      <div className={`side-menu ${isOpen ? 'side-menu--open' : ''}`}>
        <div className="side-menu-header">
          <div className="side-menu-logo">
            <img src="/orbit_logo_icon_only.png" alt="Orbit Logo" width="24" height="24" />
          </div>
          <span className="side-menu-title">Orbit</span>
        </div>
        
        <nav className="side-menu-nav">
          <a href="#" className="side-menu-item" onClick={onClose}>
            <span>Home</span>
          </a>
          <a href="#" className="side-menu-item" onClick={onClose}>
            <span>Profile</span>
          </a>
          <a href="#" className="side-menu-item" onClick={onClose}>
            <span>Settings</span>
          </a>
          <a href="#" className="side-menu-item" onClick={onClose}>
            <span>Devices</span>
          </a>
          <a href="#" className="side-menu-item" onClick={onClose}>
            <span>Unread</span>
          </a>
          <a href="#" className="side-menu-item" onClick={onClose}>
            <span>Archive</span>
          </a>
          <a href="#" className="side-menu-item" onClick={onClose}>
            <span>Safety Ratings</span>
          </a>
          <a href="#" className="side-menu-item" onClick={onClose}>
            <span>Summary</span>
          </a>
        </nav>
        
        <div className="side-menu-footer">
          <a href="#" className="side-menu-item side-menu-item--logout" onClick={onClose}>
            <span>Logout</span>
          </a>
        </div>
      </div>
      
      {/* Overlay */}
      {isOpen && (
        <div className="side-menu-overlay" onClick={onClose}></div>
      )}
    </>
  );
}

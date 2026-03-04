import "../styles/Dashboard.css";
import type { MouseEvent } from "react";
import type { AppPage } from "../layouts/PhoneWrapper";

type SideMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: AppPage) => void;
  onLogout: () => void;
};

export default function SideMenu({ isOpen, onClose, onNavigate, onLogout }: SideMenuProps) {
  const handleNavigate = (page: AppPage) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onNavigate(page);
  };

  const handleLogout = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onLogout();
  };

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
          <a href="#" className="side-menu-item" onClick={handleNavigate("dashboard")}>
            <span>Home</span>
          </a>
          {/* <a href="#" className="side-menu-item" onClick={handleClose}>
            <span>Profile</span>
          </a>
          <a href="#" className="side-menu-item" onClick={handleClose}>
            <span>Settings</span>
          </a>
          <a href="#" className="side-menu-item" onClick={handleClose}>
            <span>Devices</span>
          </a>
          <a href="#" className="side-menu-item" onClick={handleClose}>
            <span>Unread</span>
          </a>
          <a href="#" className="side-menu-item" onClick={handleClose}>
            <span>Archive</span>
          </a> */}
          <a href="#" className="side-menu-item" onClick={handleNavigate("safety-ratings")}>
            <span>Safety Ratings</span>
          </a>
          {/* <a href="#" className="side-menu-item" onClick={handleClose}>
            <span>Summary</span>
          </a> */}
        </nav>
        
        <div className="side-menu-footer">
          <a href="#" className="side-menu-item side-menu-item--logout" onClick={handleLogout}>
            <svg
              className="side-menu-item-icon"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M4.75 3.75h8.5a1 1 0 0 1 1 1V7a.75.75 0 0 1-1.5 0V5.25h-7v13.5h7V17a.75.75 0 0 1 1.5 0v2.25a1 1 0 0 1-1 1h-8.5a1 1 0 0 1-1-1V4.75a1 1 0 0 1 1-1Z" />
              <path d="M13.47 8.47a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 0 1-1.06-1.06l1.72-1.72H9a.75.75 0 0 1 0-1.5h6.19l-1.72-1.72a.75.75 0 0 1 0-1.06Z" />
            </svg>
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

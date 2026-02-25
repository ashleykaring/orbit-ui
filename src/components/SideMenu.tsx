import "../styles/Dashboard.css";
import type { MouseEvent } from "react";
import type { AppPage } from "../layouts/PhoneWrapper";

type SideMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: AppPage) => void;
};

export default function SideMenu({ isOpen, onClose, onNavigate }: SideMenuProps) {
  const handleNavigate = (page: AppPage) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onNavigate(page);
  };

  const handleClose = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onClose();
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
          <a href="#" className="side-menu-item" onClick={handleClose}>
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
          </a>
          <a href="#" className="side-menu-item" onClick={handleNavigate("safety-ratings")}>
            <span>Safety Ratings</span>
          </a>
          <a href="#" className="side-menu-item" onClick={handleClose}>
            <span>Summary</span>
          </a>
        </nav>
        
        <div className="side-menu-footer">
          <a href="#" className="side-menu-item side-menu-item--logout" onClick={handleClose}>
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

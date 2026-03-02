import TodayActivity from "./TodayActivity";
import EventsSection from "./EventsSection";
import "../styles/Dashboard.css";
import { useState } from "react";

type DashboardProps = {
  isMenuOpen?: boolean;
  toggleMenu?: () => void;
};


export default function Dashboard({ isMenuOpen, toggleMenu }: DashboardProps) {
  const [activitySelect, setActivitySelect] = useState<string>("");

  return (
    <div className="dashboard">
      <div className="header">
        <div className="header-left">
          <div className="menu-button" onClick={toggleMenu}>
            <div className={`menu-line ${isMenuOpen ? 'menu-line--open' : ''}`}></div>
            <div className={`menu-line ${isMenuOpen ? 'menu-line--open' : ''}`}></div>
            <div className={`menu-line ${isMenuOpen ? 'menu-line--open' : ''}`}></div>
          </div>
          {/* left side keeps menu only; centered logo below */}
        </div>
        <div className="header-center">
          <img src="/orbit_logo_rectangle_tight_dark.png" alt="Orbit" className="orbit-logo" />
        </div>
        <img src="/profile.png" alt="Profile" className="user-icon" />
      </div>
      <TodayActivity activity={activitySelect} setActivity={setActivitySelect}/>
      <EventsSection activity={activitySelect} setActivity={setActivitySelect}/>
    </div>
  );
}

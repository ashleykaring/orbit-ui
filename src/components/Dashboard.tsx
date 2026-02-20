import TodayActivity from "./TodayActivity";
import EventsSection from "./EventsSection";
import "../styles/Dashboard.css";

type DashboardProps = {
  isMenuOpen?: boolean;
  toggleMenu?: () => void;
};

export default function Dashboard({ isMenuOpen, toggleMenu }: DashboardProps) {
  return (
    <div className="dashboard">
      <div className="header">
        <div className="header-left">
          <div className="menu-button" onClick={toggleMenu}>
            <div className={`menu-line ${isMenuOpen ? 'menu-line--open' : ''}`}></div>
            <div className={`menu-line ${isMenuOpen ? 'menu-line--open' : ''}`}></div>
            <div className={`menu-line ${isMenuOpen ? 'menu-line--open' : ''}`}></div>
          </div>
          <span className="orbit-text">Orbit</span>
        </div>
        <div className="user-icon"></div>
      </div>
      <TodayActivity />
      <EventsSection />
    </div>
  );
}

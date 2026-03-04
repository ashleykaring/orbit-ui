import "../styles/PhoneWrapper.css";
import Dashboard from "../components/Dashboard";
import SafetyRatingsPage from "../components/SafetyRatingsPage";
import SideMenu from "../components/SideMenu";
import { useState } from "react";
import LoginPage from "../components/LoginPage";

export type AppPage = "dashboard" | "safety-ratings";

export default function PhoneWrapper() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState<AppPage>("dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navigateTo = (page: AppPage) => {
    setActivePage(page);
    closeMenu();
  };

  const handleSignIn = () => {
    setIsLoggedIn(true);
    setActivePage("dashboard");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActivePage("dashboard");
    closeMenu();
  };

  return (
    <div className="phone-outer">
      <div className="phone-frame">
        <div className="phone-screen">
          <div className="camera"></div>
          <div className="speaker"></div>
          <div className="content-area">
            {isLoggedIn ? (
              activePage === "dashboard" ? (
                <Dashboard isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
              ) : (
                <SafetyRatingsPage isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
              )
            ) : (
              <LoginPage onSignIn={handleSignIn} />
            )}
          </div>
          
          {/* Side Menu Component */}
          {isLoggedIn && (
            <SideMenu
              isOpen={isMenuOpen}
              onClose={closeMenu}
              onNavigate={navigateTo}
              onLogout={handleLogout}
            />
          )}
        </div>
      </div>
    </div>
  );
}


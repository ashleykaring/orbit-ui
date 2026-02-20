import "../styles/PhoneWrapper.css";
import Dashboard from "../components/Dashboard";
import SideMenu from "../components/SideMenu";
import { useState } from "react";

export default function PhoneWrapper() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="phone-outer">
      <div className="phone-frame">
        <div className="phone-screen">
          <div className="camera"></div>
          <div className="speaker"></div>
          <div className="content-area">
            <Dashboard isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
          </div>
          
          {/* Side Menu Component */}
          <SideMenu isOpen={isMenuOpen} onClose={closeMenu} />
        </div>
      </div>
    </div>
  );
}


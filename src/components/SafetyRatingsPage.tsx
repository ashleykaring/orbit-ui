import "../styles/Dashboard.css";
import { useMemo, useState } from "react";

type SafetyRatingsPageProps = {
  isMenuOpen?: boolean;
  toggleMenu?: () => void;
};

type AppSafetyRating = {
  appName: string;
  recommendedAge: string;
  safetyScore: string;
  devicesUsed: string;
};

const appRatings: AppSafetyRating[] = [
  {
    appName: "Minecraft",
    recommendedAge: "7+",
    safetyScore: "85 / 100",
    devicesUsed: "Ben's PC",
  },
  {
    appName: "Roblox",
    recommendedAge: "9+",
    safetyScore: "75 / 100",
    devicesUsed: "Alyssa's PC",
  },
  {
    appName: "TikTok",
    recommendedAge: "13+",
    safetyScore: "68 / 100",
    devicesUsed: "Alyssa's iPhone",
  },
  {
    appName: "Youtube",
    recommendedAge: "13+",
    safetyScore: "72 / 100",
    devicesUsed: "Alyssa's iPhone, Family iPad",
  },
];

export default function SafetyRatingsPage({
  isMenuOpen,
  toggleMenu,
}: SafetyRatingsPageProps) {
  const [query, setQuery] = useState<string>("");

  const filteredRatings = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return appRatings;
    return appRatings.filter((r) => r.appName.toLowerCase().includes(q));
  }, [query]);
  return (
    <div className="dashboard">
      <div className="header">
        <div className="header-left">
          <div className="menu-button" onClick={toggleMenu}>
            <div
              className={`menu-line ${isMenuOpen ? "menu-line--open" : ""}`}
            ></div>
            <div
              className={`menu-line ${isMenuOpen ? "menu-line--open" : ""}`}
            ></div>
            <div
              className={`menu-line ${isMenuOpen ? "menu-line--open" : ""}`}
            ></div>
          </div>
        </div>
        <div className="header-center">
          <img src="/orbit_logo_rectangle_tight_dark.png" alt="Orbit" className="orbit-logo" />
        </div>
        <img src="/profile.png" alt="Profile" className="user-icon" />
      </div>

      <div className="section">
        <h2 className="section-title">Safety Ratings</h2>
        <div className="safety-search-bar">
          <span className="safety-search-icon" aria-hidden="true"></span>
          <input
            className="safety-search-input"
            type="text"
            placeholder="Search apps"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search apps"
          />
        </div>
        <div className="safety-list">
          {filteredRatings.length === 0 ? (
            <div className="event-placeholder">No apps match your search.</div>
          ) : (
            filteredRatings.map((rating) => (
              <div className="safety-card" key={rating.appName}>
              <div className="safety-app-name">{rating.appName}</div>
              <div className="safety-details-box">
                <div className="safety-row">
                  <span className="safety-label">Recommended Age</span>
                  <span className="safety-value">{rating.recommendedAge}</span>
                </div>
                <div className="safety-row">
                  <span className="safety-label">Safety Score</span>
                  <span className="safety-value">{rating.safetyScore}</span>
                </div>
                <div className="safety-row">
                  <span className="safety-label">Devices Used</span>
                  <span className="safety-value">{rating.devicesUsed}</span>
                </div>
              </div>
            </div>
          ))) }
        </div>
      </div>
    </div>
  );
}

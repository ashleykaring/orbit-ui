import TodayActivity from "./TodayActivity";
import EventsSection from "./EventsSection";
import Notification from "./Notification";
import "../styles/Dashboard.css";
import { useEffect, useMemo, useState } from "react";
import { testEvents } from "../data/events";

type DashboardProps = {
  isMenuOpen?: boolean;
  toggleMenu?: () => void;
  onNavigate?: (page: string) => void;
};


export default function Dashboard({ isMenuOpen, toggleMenu, onNavigate }: DashboardProps) {
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [reviewedEvents, setReviewedEvents] = useState<Record<string, boolean>>(() => {
    try {
      const raw = window.localStorage.getItem("orbit-reviewed-events");
      return raw ? (JSON.parse(raw) as Record<string, boolean>) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(
        "orbit-reviewed-events",
        JSON.stringify(reviewedEvents),
      );
    } catch {
      // Ignore storage errors so the UI still works.
    }
  }, [reviewedEvents]);

  const newEventCount = useMemo(
    () =>
      testEvents.filter(
        (event) =>
          event.details.tags.includes("new") && !reviewedEvents[event.title],
      ).length,
    [reviewedEvents],
  );

  const warningCount = useMemo(
    () =>
      testEvents.filter(
        (event) =>
          event.details.tags.includes("warning") &&
          event.details.tags.includes("new") &&
          !reviewedEvents[event.title],
      ).length,
    [reviewedEvents],
  );

  const highRiskCount = useMemo(
    () =>
      testEvents.filter(
        (event) =>
          event.details.tags.includes("risk") &&
          event.details.tags.includes("new") &&
          !reviewedEvents[event.title],
      ).length,
    [reviewedEvents],
  );

  const cyberCount = useMemo(
    () =>
      testEvents.filter(
        (event) =>
          event.details.tags.includes("cyber") &&
          event.details.tags.includes("new") &&
          !reviewedEvents[event.title],
      ).length,
    [reviewedEvents],
  );

  const handleProfileClick = () => {
    if (onNavigate) {
      onNavigate('profile');
    }
  };

  return (
    <div className="dashboard">
      <Notification />
      <div className="header">
        <div className="header-left">
          <div className="menu-button" onClick={toggleMenu}>
            <div className={`menu-line ${isMenuOpen ? 'menu-line--open' : ''}`}></div>
            <div className={`menu-line ${isMenuOpen ? 'menu-line--open' : ''}`}></div>
            <div className={`menu-line ${isMenuOpen ? 'menu-line--open' : ''}`}></div>
          </div>
        </div>
        <div className="header-center">
          <img src="/orbit_logo_rectangle_tight_dark.png" alt="Orbit" className="orbit-logo" />
        </div>
        <button className="user-icon" onClick={handleProfileClick}>
          <img src="/profile.png" alt="Profile" width="26" height="26" />
        </button>
      </div>
      <TodayActivity
        selectedActivities={selectedActivities}
        setSelectedActivities={setSelectedActivities}
        newEventCount={newEventCount}
        warningCount={warningCount}
        highRiskCount={highRiskCount}
        cyberCount={cyberCount}
      />
      <EventsSection
        selectedActivities={selectedActivities}
        events={testEvents}
        reviewedEvents={reviewedEvents}
        onToggleReviewed={(title, nextReviewed) =>
          setReviewedEvents((prev) => ({ ...prev, [title]: nextReviewed }))
        }
      />
    </div>
  );
}

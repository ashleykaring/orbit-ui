import { useState } from "react";
import EventCard from "./EventCard";

type ActivitySelectProps = {
  activity: string;
};

const filterOptions = ["Cyberbullying", "High-Risk", "New Events", "Warnings"];

const testEvents = [
  {
    title: "Inappropriate Request",
    details: {
      typeOfIncident: "Inappropriate Request",
      severity: "High",
      time: "Today at 3:00 PM",
      platform: "Roblox",
      account: "John's Laptop",
      transcript: "scaryuser123: Hey, what's your address?\njohnny22: I live on 1 Grand Ave.",
      screenshotUrl: "https://via.placeholder.com/600x400?text=Screenshot",
      tags: ["new", "risk"]
    }
  },
  {
    title: "Mean Comments",
    details: {
      typeOfIncident: "Mean Comments",
      severity: "Warning",
      time: "Today at 2:15 PM",
      platform: "Minecraft",
      account: "Katie's Tablet",
      transcript: "meanuser290: Katie you're going nowhere in life!\nkatiegames1: :(",
      screenshotUrl: "https://via.placeholder.com/600x400?text=Screenshot",
      tags: ["new", "cyber"]
    }
  },
  {
    title: "Visited Unsafe Website",
    details: {
      typeOfIncident: "Visited Unsafe Website",
      severity: "Medium",
      time: "Today at 1:30 PM",
      platform: "Chrome",
      account: "Stevie's PC",
      transcript: "Visited freemoney.com - flagged unsafe.",
      screenshotUrl: "https://via.placeholder.com/600x400?text=Screenshot",
      tags: ["new"]
    }
  },
  {
    title: "Suspicious Link",
    details: {
      typeOfIncident: "Suspicious Link",
      severity: "Low",
      time: "Today at 11:45 AM",
      platform: "Instagram",
      account: "Emily's Chromebook",
      transcript: "sussy_guy: Check out fijiforfree.com!!\nemilyrainbows__: Ooo ok!!",
      screenshotUrl: "https://via.placeholder.com/600x400?text=Screenshot",
      tags: ["warning"]
    }
  }
];

export default function EventsSection({ activity } : ActivitySelectProps) {
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  return (
    <div className="section">
      <h2 className="section-title">Events</h2>
      <div className="events-controls">
        <div className="dropdown">
          <span>Sort</span>
          <div className="dropdown-arrow"></div>
        </div>
        <div className="filter-dropdown-wrapper">
          <button
            type="button"
            className="dropdown"
            onClick={() => setShowFilterDropdown((prev) => !prev)}
          >
            <span>Filter</span>
            <div className={`dropdown-arrow ${showFilterDropdown ? "dropdown-arrow-open" : ""}`}></div>
          </button>
          {showFilterDropdown && (
            <div className="filter-dropdown-menu">
              {filterOptions.map((option) => (
                <button key={option} type="button" className="filter-dropdown-item">
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="events-list">
        {testEvents.map((event, idx) => (
          (!activity || (event.details.tags.includes(activity))) && <EventCard key={idx} title={event.title} details={event.details} />
        ))}
      </div>
    </div>
  );
}

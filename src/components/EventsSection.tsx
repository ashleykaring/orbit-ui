import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import EventCard from "./EventCard";

type ActivitySelectProps = {
  activity: string;
  setActivity: Dispatch<SetStateAction<string>>;
};

const filterOptions = [
  { label: "New", value: "new" },
  { label: "Cyberbullying", value: "cyber" },
  { label: "High-Risk", value: "risk" },
  { label: "Warnings", value: "warning" },
];
const sortOptions = [{ label: "Severity", value: "severity" }];

const todayDate = new Date().toLocaleDateString("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});
const february26Date = `February 26, ${new Date().getFullYear()}`;

const testEvents = [
  {
    title: "Inappropriate Request",
    details: {
      typeOfIncident: "Inappropriate Request",
      severity: "High",
      time: `${todayDate} at 3:00 PM`,
      platform: "Roblox",
      account: "John's Laptop",
      transcript:
        "scaryuser123: Hey, what's your address?\njohnny22: I live on 1 Grand Ave.",
      screenshotUrl: "/examplescreenshot.png",
      tags: ["new", "risk"],
    },
  },
  {
    title: "Visited Unsafe Website",
    details: {
      typeOfIncident: "Visited Unsafe Website",
      severity: "Medium",
      time: `${todayDate} at 1:30 PM`,
      platform: "Chrome",
      account: "Stevie's PC",
      transcript: "Visited freemoney.com - flagged unsafe.",
      screenshotUrl: "/examplescreenshot.png",
      tags: ["new", "warning"],
    },
  },
  {
    title: "Mean Comments",
    details: {
      typeOfIncident: "Mean Comments",
      severity: "Warning",
      time: `${todayDate} at 1:02 PM`,
      platform: "Minecraft",
      account: "Katie's Tablet",
      transcript:
        "meanuser290: Katie you're going nowhere in life!\nkatiegames1: :(",
      screenshotUrl: "/examplescreenshot.png",
      tags: ["new", "cyber"],
    },
  },
  {
    title: "Suspicious Link",
    details: {
      typeOfIncident: "Suspicious Link",
      severity: "Low",
      time: `${february26Date} at 11:45 AM`,
      platform: "Instagram",
      account: "Emily's Chromebook",
      transcript:
        "sussy_guy: Check out fijiforfree.com!!\nemilyrainbows__: Ooo ok!!",
      screenshotUrl: "/examplescreenshot.png",
      tags: ["warning"],
    },
  },
];

export default function EventsSection({
  activity,
  setActivity,
}: ActivitySelectProps) {
  const showSortControl = !activity || activity === "new";
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  useEffect(() => {
    if (activity) {
      setSelectedFilters([]);
      setShowFilterDropdown(false);
    }
  }, [activity]);
  const matchesTopCardFilter = (tags: string[]) => {
    if (!activity) {
      return true;
    }
    if (activity === "new") {
      return tags.includes("new");
    }
    return tags.includes("new") && tags.includes(activity);
  };

  const getSeverityOrder = (tags: string[]) => {
    if (tags.includes("risk")) {
      return 0;
    }
    if (tags.includes("cyber")) {
      return 1;
    }
    if (tags.includes("warning")) {
      return 2;
    }
    return 3;
  };

  const visibleEvents = testEvents.filter(
    (event) =>
      (selectedFilters.length > 0 &&
        selectedFilters.some((filter) =>
          event.details.tags.includes(filter),
        )) ||
      (selectedFilters.length === 0 &&
        matchesTopCardFilter(event.details.tags)),
  );

  const sortedEvents =
    sortBy === "severity"
      ? [...visibleEvents].sort(
          (a, b) =>
            getSeverityOrder(a.details.tags) - getSeverityOrder(b.details.tags),
        )
      : visibleEvents;

  useEffect(() => {
    const severe = sortedEvents.find((e) => {
      const sev = e.details.severity?.toLowerCase() ?? "";
      return sev === "high" || sev === "critical";
    });
    if (severe) {
      window.dispatchEvent(
        new CustomEvent("orbit:severe-incident", {
          detail: { title: severe.title },
        }),
      );
    }
  }, [sortedEvents]);

  return (
    <div className="section">
      <h2 className="section-title">Events</h2>
      <div className="events-controls">
        {showSortControl && (
          <div className="filter-dropdown-wrapper">
            <button
              type="button"
              className={`dropdown ${showSortDropdown ? "dropdown-open" : ""}`}
              onClick={() => setShowSortDropdown((prev) => !prev)}
            >
              <span>Sort</span>
              <div
                className={`dropdown-arrow ${showSortDropdown ? "dropdown-arrow-open" : ""}`}
              ></div>
            </button>
            {showSortDropdown && (
              <div className="filter-dropdown-menu">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`filter-dropdown-item ${sortBy === option.value ? "filter-dropdown-item-selected" : ""}`}
                    onClick={() => {
                      setSortBy((prev) =>
                        prev === option.value ? "" : option.value,
                      );
                      setShowSortDropdown(false);
                    }}
                  >
                    <span className="filter-checkmark">
                      {sortBy === option.value ? "\u2713" : ""}
                    </span>
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
        {!activity && (
          <div className="filter-dropdown-wrapper">
            <button
              type="button"
              className={`dropdown ${showFilterDropdown ? "dropdown-open" : ""}`}
              onClick={() => setShowFilterDropdown((prev) => !prev)}
            >
              <span>Filter</span>
              <div
                className={`dropdown-arrow ${showFilterDropdown ? "dropdown-arrow-open" : ""}`}
              ></div>
            </button>
            {showFilterDropdown && (
              <div className="filter-dropdown-menu">
                {filterOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`filter-dropdown-item ${selectedFilters.includes(option.value) ? "filter-dropdown-item-selected" : ""}`}
                    onClick={() => {
                      setSelectedFilters((prev) =>
                        prev.includes(option.value)
                          ? prev.filter((value) => value !== option.value)
                          : [...prev, option.value],
                      );
                      setActivity("");
                    }}
                  >
                    <span className="filter-checkmark">
                      {selectedFilters.includes(option.value) ? "\u2713" : ""}
                    </span>
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="events-list">
        {sortedEvents.map((event) => (
          <EventCard
            key={event.title}
            title={event.title}
            details={event.details}
          />
        ))}
      </div>
    </div>
  );
}

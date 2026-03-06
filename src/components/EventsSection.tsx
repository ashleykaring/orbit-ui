import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import EventCard from "./EventCard";
import type { EventItem } from "../data/events";

type ActivitySelectProps = {
  activity: string;
  setActivity: Dispatch<SetStateAction<string>>;
  events: EventItem[];
  reviewedEvents: Record<string, boolean>;
  onToggleReviewed: (title: string, nextReviewed: boolean) => void;
};

const filterOptions = [
  { label: "New", value: "new" },
  { label: "Cyberbullying", value: "cyber" },
  { label: "High-Risk", value: "risk" },
  { label: "Warnings", value: "warning" },
];
const sortOptions = [{ label: "Severity", value: "severity" }];

export default function EventsSection({
  activity,
  setActivity,
  events,
  reviewedEvents,
  onToggleReviewed,
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
  const isReviewed = (event: EventItem) => Boolean(reviewedEvents[event.title]);
  const isNewAndUnreviewed = (event: EventItem) =>
    event.details.tags.includes("new") && !isReviewed(event);

  const matchesTopCardFilter = (event: EventItem) => {
    if (!activity) {
      return true;
    }
    if (activity === "new") {
      return isNewAndUnreviewed(event);
    }
    return isNewAndUnreviewed(event) && event.details.tags.includes(activity);
  };

  const matchesSelectedFilters = (event: EventItem) =>
    selectedFilters.some((filter) =>
      filter === "new"
        ? isNewAndUnreviewed(event)
        : event.details.tags.includes(filter),
    );

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

  const visibleEvents = events.filter(
    (event) =>
      (selectedFilters.length > 0 && matchesSelectedFilters(event)) ||
      (selectedFilters.length === 0 && matchesTopCardFilter(event)),
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
            reviewed={isReviewed(event)}
            onToggleReviewed={(nextReviewed: boolean) =>
              onToggleReviewed(event.title, nextReviewed)
            }
          />
        ))}
      </div>
    </div>
  );
}

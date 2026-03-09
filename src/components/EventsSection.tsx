import { useEffect, useState } from "react";
import EventCard from "./EventCard";
import type { EventItem } from "../data/events";

type ActivitySelectProps = {
  selectedActivities: string[];
  events: EventItem[];
  reviewedEvents: Record<string, boolean>;
  onToggleReviewed: (title: string, nextReviewed: boolean) => void;
};

const filterOptions = [
  { label: "New", value: "new" },
  { label: "Cyberbullying", value: "cyber" },
  { label: "High-Risk", value: "risk" },
  { label: "Scams", value: "warning" },
];
const sortOptions = [{ label: "Severity", value: "severity" }];

export default function EventsSection({
  selectedActivities,
  events,
  reviewedEvents,
  onToggleReviewed,
}: ActivitySelectProps) {
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const isReviewed = (event: EventItem) => Boolean(reviewedEvents[event.title]);
  const isNewAndUnreviewed = (event: EventItem) =>
    event.details.tags.includes("new") && !isReviewed(event);

  const matchesFilter = (event: EventItem, filter: string) =>
    filter === "new"
      ? isNewAndUnreviewed(event)
      : event.details.tags.includes(filter);

  const matchesActivitySelection = (event: EventItem) => {
    if (selectedActivities.length === 0) {
      return true;
    }

    const selectedNonNewActivities = selectedActivities.filter(
      (activity) => activity !== "new",
    );

    if (selectedNonNewActivities.length === 0) {
      return isNewAndUnreviewed(event);
    }

    return (
      isNewAndUnreviewed(event) &&
      selectedNonNewActivities.some((activity) =>
        event.details.tags.includes(activity),
      )
    );
  };

  const matchesDropdownSelection = (event: EventItem) =>
    selectedFilters.length === 0
      ? true
      : selectedFilters.some((filter) => matchesFilter(event, filter));

  const selectedNonNewActivities = selectedActivities.filter(
    (activity) => activity !== "new",
  );
  const activityFiltersForUi = new Set<string>(selectedActivities);
  if (selectedNonNewActivities.length > 0) {
    activityFiltersForUi.add("new");
  }

  const isFilterSelectedInUi = (filter: string) =>
    selectedFilters.includes(filter) || activityFiltersForUi.has(filter);

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

  const hasActivitySelection = selectedActivities.length > 0;
  const hasDropdownSelection = selectedFilters.length > 0;

  const visibleEvents = events.filter((event) => {
    const activityMatch = matchesActivitySelection(event);
    const dropdownMatch = matchesDropdownSelection(event);

    if (hasActivitySelection && hasDropdownSelection) {
      // When activity cards are active, dropdown filters should add events, not narrow them.
      return activityMatch || dropdownMatch;
    }
    if (hasActivitySelection) {
      return activityMatch;
    }
    if (hasDropdownSelection) {
      return dropdownMatch;
    }
    return true;
  });

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
                  className={`filter-dropdown-item ${isFilterSelectedInUi(option.value) ? "filter-dropdown-item-selected" : ""}`}
                  onClick={() => {
                    setSelectedFilters((prev) =>
                      prev.includes(option.value)
                        ? prev.filter((value) => value !== option.value)
                        : [...prev, option.value],
                    );
                  }}
                >
                  <span className="filter-checkmark">
                    {isFilterSelectedInUi(option.value) ? "\u2713" : ""}
                  </span>
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
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

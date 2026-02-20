import "../styles/Dashboard.css";
import EventCard from "./EventCard";

export default function EventsSection() {
  return (
    <div className="section">
      <h2 className="section-title">Events</h2>
      <div className="events-controls">
        <div className="dropdown">
          <span>Sort</span>
          <div className="dropdown-arrow"></div>
        </div>
        <div className="dropdown">
          <span>Filter</span>
          <div className="dropdown-arrow"></div>
        </div>
      </div>
      <div className="events-list">
        <EventCard title="Inappropriate Request">
          <div className="event-placeholder"></div>
        </EventCard>
        <EventCard title="Mean Comments">
          <div className="event-placeholder"></div>
        </EventCard>
        <EventCard title="Visited Unsafe Website">
          <div className="event-placeholder"></div>
        </EventCard>
        <EventCard title="Suspicious Link">
          <div className="event-placeholder"></div>
        </EventCard>
      </div>
    </div>
  );
}

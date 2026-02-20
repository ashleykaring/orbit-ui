import "../styles/Dashboard.css";
import ActivityCard from "./ActivityCard";

export default function TodayActivity() {
  return (
    <div className="section">
      <h2 className="section-title">Today's Activity</h2>
      <div className="activity-grid">
        <ActivityCard title="New Events" value="3" type="new-events" />
        <ActivityCard title="Warnings" value="1" type="warning" />
        <ActivityCard title="High-Risk" value="1" type="high-risk" />
        <ActivityCard title="Cyberbullying" value="1" type="cyberbullying" />
      </div>
    </div>
  );
}

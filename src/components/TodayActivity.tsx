import "../styles/Dashboard.css";
import ActivityCard from "./ActivityCard";
import { useState } from "react";

export default function TodayActivity() {
    const [viewingNewEvents, setViewingNewEvents] = useState<boolean>(false);
    const [viewingWarnings, setViewingWarnings] = useState<boolean>(false);
    const [viewingHighRisk, setViewingHighRisk] = useState<boolean>(false);
    const [viewingCyber, setViewingCyber] = useState<boolean>(false);

  return (
    <div className="section">
      <h2 className="section-title">Today's Activity</h2>
      <div className={(viewingNewEvents || viewingWarnings || viewingHighRisk || viewingCyber ) ? "modified-activity-grid" : "activity-grid"}>
          
          {!viewingWarnings && !viewingHighRisk && !viewingCyber && <ActivityCard title="New Events" value="3" type="new-events" viewed={viewingNewEvents} onClick={() => setViewingNewEvents(!viewingNewEvents)}/>}
          {!viewingNewEvents && !viewingHighRisk && !viewingCyber && <ActivityCard title="Warnings" value="1" type="warning" viewed={viewingWarnings} onClick={() => setViewingWarnings(!viewingWarnings)}/>}
          {!viewingWarnings && !viewingNewEvents && !viewingCyber && <ActivityCard title="High-Risk" value="1" type="high-risk" viewed={viewingHighRisk} onClick={() => setViewingHighRisk(!viewingHighRisk)}/>}
          {!viewingWarnings && !viewingHighRisk && !viewingNewEvents && <ActivityCard title="Cyberbullying" value="1" type="cyberbullying" viewed={viewingCyber} onClick={() => setViewingCyber(!viewingCyber)}/>}
      </div>
    </div>
  );
}

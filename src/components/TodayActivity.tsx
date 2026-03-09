import "../styles/Dashboard.css";
import ActivityCard from "./ActivityCard";
import type { Dispatch, SetStateAction } from "react";


type ActivitySelectProps = {
  selectedActivities: string[];
  setSelectedActivities: Dispatch<SetStateAction<string[]>>;
  newEventCount: number;
  warningCount: number;
  highRiskCount: number;
  cyberCount: number;
};

export default function TodayActivity({
  selectedActivities,
  setSelectedActivities,
  newEventCount,
  warningCount,
  highRiskCount,
  cyberCount,
}: ActivitySelectProps) {
  const toggleActivity = (activity: string) => {
    setSelectedActivities((prev) =>
      prev.includes(activity)
        ? prev.filter((value) => value !== activity)
        : [...prev, activity],
    );
  };

  return (
    <div className="section">
      <h2 className="section-title">Today's Activity</h2>
      <div className="activity-grid">
            <ActivityCard
            title="New Events"
            value={String(newEventCount)}
            type="new-events"
            viewed={selectedActivities.includes("new")}
            onClick={() => toggleActivity("new")}
          />
          <div className="line-vertical"></div>

          <div className="activity-breakdown">

            <ActivityCard
              title="Scams"
              value={String(warningCount)}
              type="warning"
              compact
              viewed={selectedActivities.includes("warning")}
              onClick={() => toggleActivity("warning")}
            />

            <ActivityCard
              title="High-Risk"
              value={String(highRiskCount)}
              type="high-risk"
              compact
              viewed={selectedActivities.includes("risk")}
              onClick={() => toggleActivity("risk")}
            />

            <ActivityCard
              title="Cyberbullying"
              value={String(cyberCount)}
              type="cyberbullying"
              compact
              viewed={selectedActivities.includes("cyber")}
              onClick={() => toggleActivity("cyber")}
            />

          </div>
          <div className="line-horizontal-split">
            <div className="line-split left"></div>
            <div className="line-split center"></div>
            <div className="line-split right"></div>
          </div>
          </div>
    </div>
  );
}

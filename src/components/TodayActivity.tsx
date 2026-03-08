import "../styles/Dashboard.css";
import ActivityCard from "./ActivityCard";
import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";


type ActivitySelectProps = {
  activity: string;
  setActivity: Dispatch<SetStateAction<string>>;
  newEventCount: number;
  warningCount: number;
  highRiskCount: number;
  cyberCount: number;
};

export default function TodayActivity({
  activity,
  setActivity,
  newEventCount,
  warningCount,
  highRiskCount,
  cyberCount,
}: ActivitySelectProps) {
    const [viewingNewEvents, setViewingNewEvents] = useState<boolean>(false);
    const [viewingWarnings, setViewingWarnings] = useState<boolean>(false);
    const [viewingHighRisk, setViewingHighRisk] = useState<boolean>(false);
    const [viewingCyber, setViewingCyber] = useState<boolean>(false);

  return (
    <div className="section">
      <h2 className="section-title">Today's Activity</h2>
      <div className="activity-grid">
            <ActivityCard
            title="New Events"
            value={String(newEventCount)}
            type="new-events"
            viewed={viewingNewEvents}
            onClick={() => {
              if (activity) setActivity("");
              else setActivity("new");

              setViewingNewEvents(!viewingNewEvents);
            }}
          />
          <div className="line-vertical"></div>

          <div className="activity-breakdown">

            <ActivityCard
              title="Warnings"
              value={String(warningCount)}
              type="warning"
              compact
              viewed={viewingWarnings}
              onClick={() => {
                if (activity) setActivity("");
                else setActivity("warning");

                setViewingWarnings(!viewingWarnings);
              }}
            />

            <ActivityCard
              title="High-Risk"
              value={String(highRiskCount)}
              type="high-risk"
              compact
              viewed={viewingHighRisk}
              onClick={() => {
                if (activity) setActivity("");
                else setActivity("risk");

                setViewingHighRisk(!viewingHighRisk);
              }}
            />

            <ActivityCard
              title="Cyberbullying"
              value={String(cyberCount)}
              type="cyberbullying"
              compact
              viewed={viewingCyber}
              onClick={() => {
                if (activity) setActivity("");
                else setActivity("cyber");

                setViewingCyber(!viewingCyber);
              }}
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

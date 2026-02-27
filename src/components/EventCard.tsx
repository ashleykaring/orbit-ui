import "../styles/Dashboard.css";
import { useState } from "react";

type EventDetails = {
  typeOfIncident: string;
  severity: string;
  time: string;
  platform: string;
  account: string;
  transcript: string;
  screenshotUrl?: string;
  tags: string[];
};

type EventCardProps = {
  title: string;
  details?: EventDetails;
};

export default function EventCard({ title, details }: EventCardProps) {
  const [showPopup, setShowPopup] = useState(false);
  const [reviewed, setReviewed] = useState(false);

  const handleCardClick = () => {
    setShowPopup(true);
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  const handleMarkReviewed = () => {
    setReviewed(true);
    setShowPopup(false);
  };

  return (
    <>
      <div
        className={`event-card ${reviewed ? 'event-card--reviewed' : ''}`}
        onClick={handleCardClick}
        style={{ cursor: 'pointer', opacity: reviewed ? 0.5 : 1 }}
      >
        <div className="event-title">{title}</div>
      </div>
      {showPopup && details && (
        <div className="event-popup-overlay">
          <div className="event-popup">
            <h3>{details.typeOfIncident}</h3>
            <div><b>Severity:</b> {details.severity}</div>
            <div><b>Time:</b> {details.time}</div>
            <div><b>Platform:</b> {details.platform}</div>
            <div><b>Account:</b> {details.account}</div>
            <div><b>Transcript:</b> <pre style={{whiteSpace:'pre-wrap'}}>{details.transcript}</pre></div>
            <div className="event-popup-actions">
              {details.screenshotUrl && (
                <button onClick={() => window.open(details.screenshotUrl, '_blank')}>View Full Screenshot</button>
              )}
              <button onClick={handleMarkReviewed}>Mark as Reviewed</button>
            </div>
            <button className="event-popup-close" onClick={handleClose}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}

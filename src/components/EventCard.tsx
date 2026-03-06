import "../styles/Dashboard.css";
import { useState, useEffect, useRef } from "react";

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
  reviewed?: boolean;
  onToggleReviewed?: (nextReviewed: boolean) => void;
};
export default function EventCard({
  title,
  details,
  reviewed = false,
  onToggleReviewed,
}: EventCardProps) {
  const [showPopup, setShowPopup] = useState(false);
  const [showScreenshotPopup, setShowScreenshotPopup] = useState(false);

  const handleCardClick = () => {
    setShowPopup(true);
  };

  const handleClose = () => {
    setShowPopup(false);
    setShowScreenshotPopup(false);
  };

  const handleToggleReviewed = () => {
    const nextValue = !reviewed;
    onToggleReviewed?.(nextValue);
    setShowPopup(false);
    setShowScreenshotPopup(false);
  };

  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as { title?: string } | undefined;
      if (!detail?.title) return;
      if (detail.title === title) {
        setShowPopup(true);
        setTimeout(() => {
          cardRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 80);
      }
    };
    window.addEventListener("orbit:open-event", handler as EventListener);
    return () => window.removeEventListener("orbit:open-event", handler as EventListener);
  }, [title]);

  return (
    <>
      <div
        ref={cardRef}
        className={`event-card ${details?.severity ? `event-card--severity-${details.severity.toLowerCase().replace(/\s+/g, '-')}` : ''} ${reviewed ? 'event-card--reviewed' : ''}`}
        onClick={handleCardClick}
        style={{ cursor: 'pointer', opacity: reviewed ? 0.5 : 1 }}
      >
        <div className="event-title">{title}</div>
        {details?.time && <div className="event-time">{details.time}</div>}
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
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => setShowScreenshotPopup(true)}
                >
                  View Full Screenshot
                </button>
              )}
              <button
                type="button"
                className="btn-secondary"
                onClick={handleToggleReviewed}
              >
                {reviewed ? "Mark as Unreviewed" : "Mark as Reviewed"}
              </button>
            </div>
            <button type="button" className="event-popup-close" onClick={handleClose}>Close</button>
          </div>
          {showScreenshotPopup && details.screenshotUrl && (
            <div className="screenshot-popup-overlay" onClick={() => setShowScreenshotPopup(false)}>
              <div className="screenshot-popup" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  className="screenshot-popup-close"
                  onClick={() => setShowScreenshotPopup(false)}
                  aria-label="Close screenshot"
                >
                  X
                </button>
                <img src={details.screenshotUrl} alt={`${details.typeOfIncident} screenshot`} className="screenshot-popup-image" />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

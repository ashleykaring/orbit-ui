import { useEffect, useState } from "react";

export default function Notification() {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState<string | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      if ((window as any).__orbitNotificationShown) return;
      const detail = (e as CustomEvent).detail as { title?: string } | undefined;
      if (detail?.title) {
        (window as any).__orbitNotificationShown = true;
        setTitle(detail.title);
        setVisible(true);
      }
    };
    window.addEventListener("orbit:severe-incident", handler as EventListener);
    return () => window.removeEventListener("orbit:severe-incident", handler as EventListener);
  }, []);

  if (!visible || !title) return null;

  const handleClick = () => {
    window.dispatchEvent(new CustomEvent("orbit:open-event", { detail: { title } }));
    setVisible(false);
  };

  return (
    <div className="app-notification" role="status" onClick={handleClick}>
      <div className="app-notification-content">
          <strong>ALERT:</strong>&nbsp;{title}
      </div>
      <button
        type="button"
        className="app-notification-dismiss"
        aria-label="Dismiss notification"
        onClick={(e) => {
          e.stopPropagation();
          setVisible(false);
        }}
      >
        ×
      </button>
    </div>
  );
}

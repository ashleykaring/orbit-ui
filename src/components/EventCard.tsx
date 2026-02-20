import "../styles/Dashboard.css";
import type { ReactNode } from "react";

type EventCardProps = {
  title: string;
  children?: ReactNode;
};

export default function EventCard({ title, children }: EventCardProps) {
  return (
    <div className="event-card">
      <div className="event-title">{title}</div>
      <div className="event-content">
        {children}
      </div>
    </div>
  );
}

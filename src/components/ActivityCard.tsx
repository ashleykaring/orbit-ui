import "../styles/Dashboard.css";

type ActivityCardProps = {
  title: string;
  value: string;
  type?: 'default' | 'new-events' | 'warning' | 'high-risk' | 'cyberbullying';
  onClick: React.MouseEventHandler<HTMLDivElement>;
  viewed: boolean;
  compact?: boolean;
};

export default function ActivityCard({ title, value, type = 'default', onClick, viewed, compact =false }: ActivityCardProps) {
  return (
    <div
      className={`activity-card 
      activity-card--${type}
      ${viewed ? "activity-card--active" : ""}
      ${compact ? "activity-card--compact" : ""}`}
      onClick={onClick}
    >
      <div className="activity-value">{value}</div>
      <div className="activity-title">{title}</div>
    </div>
  );
}
import "../styles/Dashboard.css";

type ActivityCardProps = {
  title: string;
  value: string;
  type?: 'default' | 'new-events' | 'warning' | 'high-risk' | 'cyberbullying';
};

export default function ActivityCard({ title, value, type = 'default' }: ActivityCardProps) {
  return (
    <div className={`activity-card activity-card--${type}`}>
      <div className="activity-value">{value}</div>
      <div className="activity-title">{title}</div>
    </div>
  );
}

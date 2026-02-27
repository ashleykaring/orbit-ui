import "../styles/Dashboard.css";

type ActivityCardProps = {
  title: string;
  value: string;
  type?: 'default' | 'new-events' | 'warning' | 'high-risk' | 'cyberbullying';
  onClick: React.MouseEventHandler<HTMLDivElement>;
  viewed: boolean
};

export default function ActivityCard({ title, value, type = 'default', onClick, viewed }: ActivityCardProps) {

  return (
    <div className={`${viewed ? "modified-activity-card activity-card" : "activity-card"} activity-card--${type}`} onClick={onClick} >
      <div className="activity-value">{value}</div>
      <div className="activity-title">{title}</div>
    </div>
  );
}

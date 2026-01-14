type StatCardProps = {
  label: string;
  value: string;
  trend: string;
};

export default function StatCard({ label, value, trend }: StatCardProps) {
  return (
    <div className="stat-card">
      <div>
        <p className="stat-label">{label}</p>
        <p className="stat-value">{value}</p>
      </div>
      <span className="stat-trend">{trend}</span>
    </div>
  );
}

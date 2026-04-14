import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CHART_COLORS = ["#6366f1", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#ec4899", "#84cc16"];

const RADIAN = Math.PI / 180;
const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (percent < 0.05) return null;
  const r = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="x" dominantBaseline="central" fontSize={11} fontWeight={600}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const ChartCard = ({ title, children }) => (
  <div
    style={{
      background: "var(--bg-card)",
      border: "1px solid var(--border)",
      borderRadius: 14,
      padding: "1.25rem",
      height: "100%",
    }}
  >
    <h4 style={{ color: "var(--text-secondary)", fontSize: "0.8rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1rem" }}>
      {title}
    </h4>
    {children}
  </div>
);

// Status Distribution Pie Chart
export const StatusPieChart = ({ data }) => {
  const pieData = (data || []).map((d) => ({ name: d._id, value: d.count }));
  return (
    <ChartCard title="Status Distribution">
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius={45}
            outerRadius={80}
            dataKey="value"
            labelLine={false}
            label={renderCustomLabel}
          >
            {pieData.map((_, i) => (
              <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text-primary)" }}
          />
          <Legend
            wrapperStyle={{ fontSize: 11, color: "var(--text-secondary)" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

// Department Bar Chart
export const DepartmentBarChart = ({ data }) => {
  const barData = (data || []).map((d) => ({ dept: d._id, count: d.count }));
  return (
    <ChartCard title="By Department">
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={barData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,0.1)" />
          <XAxis dataKey="dept" tick={{ fill: "var(--text-secondary)", fontSize: 10 }} />
          <YAxis tick={{ fill: "var(--text-secondary)", fontSize: 10 }} />
          <Tooltip
            contentStyle={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text-primary)" }}
          />
          <Bar dataKey="count" radius={[6, 6, 0, 0]}>
            {barData.map((_, i) => (
              <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

// Trend Area Chart (uses monthly mock if not provided)
export const TrendAreaChart = ({ data }) => {
  const trendData = data || [
    { month: "Jan", candidates: 12, hired: 3 },
    { month: "Feb", candidates: 19, hired: 5 },
    { month: "Mar", candidates: 28, hired: 8 },
    { month: "Apr", candidates: 22, hired: 6 },
    { month: "May", candidates: 35, hired: 10 },
    { month: "Jun", candidates: 41, hired: 12 },
  ];
  return (
    <ChartCard title="Hiring Trend">
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={trendData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="grad2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,0.1)" />
          <XAxis dataKey="month" tick={{ fill: "var(--text-secondary)", fontSize: 10 }} />
          <YAxis tick={{ fill: "var(--text-secondary)", fontSize: 10 }} />
          <Tooltip contentStyle={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text-primary)" }} />
          <Legend wrapperStyle={{ fontSize: 11, color: "var(--text-secondary)" }} />
          <Area type="monotone" dataKey="candidates" stroke="#6366f1" fill="url(#grad1)" strokeWidth={2} />
          <Area type="monotone" dataKey="hired" stroke="#10b981" fill="url(#grad2)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

// Skills Radar Chart
export const SkillsRadarChart = ({ data }) => {
  const radarData = data || [
    { skill: "React", count: 40 },
    { skill: "Node.js", count: 30 },
    { skill: "Python", count: 25 },
    { skill: "SQL", count: 35 },
    { skill: "AWS", count: 20 },
    { skill: "Docker", count: 15 },
  ];
  return (
    <ChartCard title="Top Skills">
      <ResponsiveContainer width="100%" height={200}>
        <RadarChart data={radarData} cx="50%" cy="50%" outerRadius={75}>
          <PolarGrid stroke="rgba(99,102,241,0.2)" />
          <PolarAngleAxis dataKey="skill" tick={{ fill: "var(--text-secondary)", fontSize: 10 }} />
          <Radar name="Count" dataKey="count" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.25} strokeWidth={2} />
          <Tooltip contentStyle={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text-primary)" }} />
        </RadarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

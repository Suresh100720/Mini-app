import { Card, Row, Col, Typography } from "antd";
import {
  TeamOutlined,
  CheckCircleOutlined,
  StopOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const StatCards = ({ data = [], onCardClick }) => {
  const total = data.length;
  const offered = data.filter((d) => d.status === "Offered").length;
  const hired = data.filter((d) => d.status === "Hired").length;
  const appliedCountVal = data.filter((d) => d.status === "Applied").length;

  const stats = [
    {
      key: "total",
      title: "Total Candidates",
      value: total,
      icon: <TeamOutlined style={{ fontSize: 24, color: "#4338ca" }} />,
      bg: "#eef2ff",
      color: "#4338ca",
    },
    {
      key: "offered",
      title: "Offered Candidates",
      value: offered,
      icon: <CheckCircleOutlined style={{ fontSize: 24, color: "#ca8a04" }} />,
      bg: "#fefce8",
      color: "#ca8a04",
    },
    {
      key: "hired",
      title: "Hired Candidates",
      value: hired,
      icon: <CheckCircleOutlined style={{ fontSize: 24, color: "#16a34a" }} />,
      bg: "#f0fdf4",
      color: "#16a34a",
    },
    {
      key: "applied",
      title: "Applied Candidates",
      value: appliedCountVal,
      icon: <FileDoneOutlined style={{ fontSize: 24, color: "#059669" }} />,
      bg: "#ecfdf5",
      color: "#059669",
    },
  ];

  return (
    <Row gutter={[20, 20]} style={{ marginBottom: 24 }}>
      {stats.map((stat) => (
        <Col xs={24} sm={12} lg={6} key={stat.key}>
          <Card
            hoverable
            onClick={() => onCardClick && onCardClick(stat.key)}
            styles={{ body: { padding: "20px 24px" } }}
            style={{
              background: stat.bg,
              borderRadius: 16,
              border: `1px solid ${stat.color}15`,
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              height: "100%",
            }}
            className="stat-card"
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <Text style={{ fontSize: 15, fontWeight: 700, color: stat.color, opacity: 0.8 }}>
                {stat.title}
              </Text>
              <div style={{ 
                width: 44, 
                height: 44, 
                borderRadius: 12, 
                background: "#ffffff90", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                boxShadow: "0 4px 10px rgba(0,0,0,0.03)",
              }}>
                {stat.icon}
              </div>
            </div>
            <Title level={2} style={{ margin: 0, fontWeight: 800, color: stat.color }}>
              {stat.value}
            </Title>
            
            <style>{`
              .stat-card:hover {
                transform: translateY(-8px);
                box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
              }
            `}</style>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default StatCards;

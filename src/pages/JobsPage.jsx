import { useEffect, useState } from "react";
import { Button, Tag, Input, Select, message, Empty } from "antd";
import {
  SearchOutlined,
  ProfileOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  TeamOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { jobService } from "../services/services";
import { useAuth } from "../context/AuthContext";
import JobApplicationForm from "../components/jobs/JobApplicationForm";
import PostJobForm from "../components/jobs/PostJobForm";
import StatusBadge from "../components/ui/StatusBadge";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const { Option } = Select;

const JOB_TYPE_COLORS = {
  "Full-time": "#6366f1",
  "Part-time": "#8b5cf6",
  Contract: "#06b6d4",
  Internship: "#10b981",
  Remote: "#f59e0b",
};

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [applyJob, setApplyJob] = useState(null);
  const [applyLoading, setApplyLoading] = useState(false);
  const [postJobOpen, setPostJobOpen] = useState(false);
  const [postJobLoading, setPostJobLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [msgApi, contextHolder] = message.useMessage();

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await jobService.getAll({ status: "Open" });
      setJobs(res.data);
    } catch (err) {
      // Show mock jobs if backend not available
      setJobs(MOCK_JOBS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchJobs(); }, []);

  const filteredJobs = jobs.filter((j) => {
    const matchSearch =
      !search ||
      j.title?.toLowerCase().includes(search.toLowerCase()) ||
      j.company?.toLowerCase().includes(search.toLowerCase()) ||
      j.department?.toLowerCase().includes(search.toLowerCase());
    const matchType = !typeFilter || j.type === typeFilter;
    return matchSearch && matchType;
  });

  const handleApply = (job) => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: { pathname: "/jobs" }, applyJobId: job._id } });
      return;
    }
    setApplyJob(job);
  };

  const handleApplicationSubmit = async (values) => {
    setApplyLoading(true);
    try {
      await jobService.apply(applyJob._id, values);
      msgApi.success("🎉 Application submitted successfully!");
      setApplyJob(null);
    } catch (err) {
      msgApi.error(err.response?.data?.message || "Application failed");
    } finally {
      setApplyLoading(false);
    }
  };

  const handlePostJobSubmit = async (values) => {
    setPostJobLoading(true);
    try {
      const res = await jobService.create(values);
      msgApi.success("🎉 Job posted successfully!");
      setJobs((prev) => [res.data, ...prev]);
      setPostJobOpen(false);
    } catch (err) {
      msgApi.error(err.response?.data?.message || "Failed to post job");
    } finally {
      setPostJobLoading(false);
    }
  };

  if (loading) return <LoadingSpinner tip="Loading jobs..." />;

  return (
    <div className="fade-in-up">
      {contextHolder}

      {/* Header */}
      <div style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ color: "var(--text-primary)", fontSize: "2rem", fontWeight: 800, margin: 0 }}>
            💼 Open Positions
          </h1>
          <p style={{ color: "var(--text-secondary)", marginTop: 4 }}>
            {filteredJobs.length} jobs available — find your next opportunity
          </p>
        </div>
        
        {isAuthenticated && (
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setPostJobOpen(true)}
            style={{
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              border: "none",
              borderRadius: 8,
              fontWeight: 600,
            }}
          >
            Post a Job
          </Button>
        )}
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem", flexWrap: "wrap" }}>
        <Input
          placeholder="Search jobs, companies..."
          prefix={<SearchOutlined style={{ color: "var(--text-secondary)" }} />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", borderRadius: 10, color: "var(--text-primary)", maxWidth: 300 }}
        />
        <Select
          placeholder="Job Type"
          value={typeFilter || undefined}
          onChange={setTypeFilter}
          allowClear
          style={{ width: 160 }}
        >
          {["Full-time", "Part-time", "Contract", "Internship", "Remote"].map((t) => (
            <Option key={t} value={t}>{t}</Option>
          ))}
        </Select>
      </div>

      {filteredJobs.length === 0 ? (
        <div style={{ textAlign: "center", padding: "4rem 0" }}>
          <Empty description={<span style={{ color: "var(--text-secondary)" }}>No jobs found</span>} />
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "1.25rem" }}>
          {filteredJobs.map((job) => (
            <div key={job._id} className="job-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                <div>
                  <h3 style={{ color: "var(--text-primary)", fontWeight: 700, margin: 0, fontSize: "1.05rem" }}>{job.title}</h3>
                  <p style={{ color: "var(--text-secondary)", margin: "4px 0 0", fontSize: "0.9rem" }}>{job.company}</p>
                </div>
                <span
                  style={{
                    background: `${JOB_TYPE_COLORS[job.type] || "#6366f1"}20`,
                    color: JOB_TYPE_COLORS[job.type] || "#6366f1",
                    border: `1px solid ${JOB_TYPE_COLORS[job.type] || "#6366f1"}40`,
                    borderRadius: 6,
                    padding: "2px 10px",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                  }}
                >
                  {job.type}
                </span>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--text-secondary)", fontSize: "0.82rem" }}>
                  <EnvironmentOutlined /> {job.location}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--text-secondary)", fontSize: "0.82rem" }}>
                  <ProfileOutlined /> {job.department}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--text-secondary)", fontSize: "0.82rem" }}>
                  <ClockCircleOutlined /> {job.experience}
                </span>
                {job.salary && (
                  <span style={{ display: "flex", alignItems: "center", gap: 4, color: "#10b981", fontSize: "0.82rem" }}>
                    <DollarOutlined /> {job.salary}
                  </span>
                )}
              </div>

              <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: "1rem", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                {job.description}
              </p>

              {(job.skills || []).length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: "1rem" }}>
                  {job.skills.slice(0, 4).map((s, i) => (
                    <span key={i} style={{ background: "rgba(99,102,241,0.12)", color: "#a5b4fc", borderRadius: 4, padding: "1px 8px", fontSize: 11 }}>
                      {s}
                    </span>
                  ))}
                  {job.skills.length > 4 && <span style={{ color: "var(--text-secondary)", fontSize: 11 }}>+{job.skills.length - 4}</span>}
                </div>
              )}

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--text-secondary)", fontSize: "0.8rem" }}>
                  <TeamOutlined /> {job.applicants?.length || 0} applicants
                </span>
                <Button
                  type="primary"
                  onClick={() => handleApply(job)}
                  style={{
                    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                    border: "none",
                    borderRadius: 8,
                    fontWeight: 600,
                  }}
                >
                  {isAuthenticated ? "Apply Now" : "Login to Apply 🔒"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <JobApplicationForm
        open={!!applyJob}
        onClose={() => setApplyJob(null)}
        onSubmit={handleApplicationSubmit}
        job={applyJob}
        loading={applyLoading}
      />
      <PostJobForm
        open={postJobOpen}
        onClose={() => setPostJobOpen(false)}
        onSubmit={handlePostJobSubmit}
        loading={postJobLoading}
      />
    </div>
  );
};

// Mock jobs for when backend is unavailable
const MOCK_JOBS = [
  { _id: "1", title: "Senior React Developer", company: "TechCorp", department: "Engineering", location: "Remote", type: "Full-time", experience: "3-5 years", salary: "$120K - $150K", description: "We are looking for an experienced React developer to join our growing team. You will be responsible for building and maintaining our web applications.", skills: ["React", "TypeScript", "Node.js", "AWS"], applicants: [], status: "Open" },
  { _id: "2", title: "Product Designer", company: "DesignHub", department: "Design", location: "New York, USA", type: "Full-time", experience: "2-4 years", salary: "$90K - $110K", description: "Join our creative team to design beautiful, user-centered products. You'll collaborate closely with engineering and product teams.", skills: ["Figma", "UI/UX", "Prototyping", "Design Systems"], applicants: [], status: "Open" },
  { _id: "3", title: "Data Scientist", company: "DataFlow", department: "Engineering", location: "San Francisco, CA", type: "Full-time", experience: "4-6 years", salary: "$130K - $160K", description: "Looking for a data scientist to help us make sense of our large datasets and drive business decisions.", skills: ["Python", "ML", "SQL", "TensorFlow"], applicants: [], status: "Open" },
  { _id: "4", title: "Marketing Manager", company: "GrowthCo", department: "Marketing", location: "Chicago, IL", type: "Full-time", experience: "5+ years", salary: "$85K - $100K", description: "Drive our marketing strategy and campaigns across multiple channels. Lead a team of marketing specialists.", skills: ["SEO", "Content Strategy", "Analytics", "Paid Media"], applicants: [], status: "Open" },
  { _id: "5", title: "Backend Engineer", company: "CloudSystems", department: "Engineering", location: "Remote", type: "Contract", experience: "3+ years", salary: "$100/hr", description: "Contract role for an experienced backend engineer to help scale our infrastructure.", skills: ["Node.js", "Python", "MongoDB", "Docker"], applicants: [], status: "Open" },
  { _id: "6", title: "HR Business Partner", company: "PeopleFirst", department: "HR", location: "Austin, TX", type: "Full-time", experience: "4-6 years", salary: "$80K - $95K", description: "Partner with business leaders to drive HR strategy and employee engagement initiatives.", skills: ["Talent Management", "Employee Relations", "HRIS", "Performance Management"], applicants: [], status: "Open" },
];

export default JobsPage;

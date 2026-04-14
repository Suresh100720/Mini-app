require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");
const Candidate = require("./models/Candidate");
const Job = require("./models/Job");

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ Connected to MongoDB");

  // Clear existing data
  await User.deleteMany();
  await Candidate.deleteMany();
  await Job.deleteMany();

  // Create admin user
  const admin = await User.create({
    name: "Admin User",
    email: "admin@talentflow.com",
    password: "admin123",
    role: "admin",
  });
  console.log("✅ Admin created: admin@talentflow.com / admin123");

  // Create jobs
  const jobs = await Job.insertMany([
    { title: "Senior React Developer", company: "TechCorp", department: "Engineering", location: "Remote", type: "Full-time", experience: "3-5 years", salary: "$120K - $150K", description: "Build and maintain cutting-edge web applications using React and TypeScript.", skills: ["React", "TypeScript", "Node.js", "AWS"], status: "Open" },
    { title: "Product Designer", company: "DesignHub", department: "Design", location: "New York, USA", type: "Full-time", experience: "2-4 years", salary: "$90K - $110K", description: "Design beautiful, user-centered products and collaborate with engineering teams.", skills: ["Figma", "UI/UX", "Prototyping"], status: "Open" },
    { title: "Data Scientist", company: "DataFlow", department: "Engineering", location: "San Francisco, CA", type: "Full-time", experience: "4+ years", salary: "$130K - $160K", description: "Drive data-driven decisions with ML models and advanced analytics.", skills: ["Python", "ML", "SQL", "TensorFlow"], status: "Open" },
    { title: "Marketing Manager", company: "GrowthCo", department: "Marketing", location: "Chicago, IL", type: "Full-time", experience: "5+ years", description: "Lead marketing strategy and campaigns across multiple channels.", skills: ["SEO", "Analytics", "Content Strategy"], status: "Open" },
    { title: "Backend Engineer", company: "CloudSystems", department: "Engineering", location: "Remote", type: "Contract", experience: "3+ years", salary: "$100/hr", description: "Scale our infrastructure and build robust APIs.", skills: ["Node.js", "MongoDB", "Docker", "Kubernetes"], status: "Open" },
  ]);

  // Create candidates
  const statuses = ["Applied", "Screening", "Interview", "Offered", "Hired", "Rejected"];
  const departments = ["Engineering", "Marketing", "Sales", "HR", "Design"];
  const roles = ["Frontend Dev", "Backend Dev", "UI Designer", "Marketing Lead", "Sales Rep", "HR Manager"];
  const candidateData = [];
  for (let i = 1; i <= 30; i++) {
    const status = statuses[i % statuses.length];
    const dept = departments[i % departments.length];
    candidateData.push({
      firstName: `Candidate${i}`,
      lastName: `User`,
      email: `candidate${i}@example.com`,
      phone: `+1 555 ${String(i).padStart(3, "0")} 1234`,
      role: roles[i % roles.length],
      department: dept,
      experience: (i % 10) + 1,
      status,
      skills: ["React", "Node.js", "SQL"].slice(0, (i % 3) + 1),
      location: ["New York", "Remote", "San Francisco", "Chicago"][i % 4],
      salary: 60000 + i * 2000,
      appliedJob: jobs[i % jobs.length]._id,
    });
  }
  await Candidate.insertMany(candidateData);
  console.log("✅ 30 candidates seeded");

  console.log("\n🎉 Seed complete!");
  process.exit(0);
};

seed().catch((err) => { console.error(err); process.exit(1); });

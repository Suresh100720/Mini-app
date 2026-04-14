const Job = require("../models/Job");
const Candidate = require("../models/Candidate");

// GET /api/jobs
const getJobs = async (req, res) => {
  try {
    const { status, department, type, search } = req.query;
    let query = {};
    if (status) query.status = status;
    if (department) query.department = department;
    if (type) query.type = type;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
        { department: { $regex: search, $options: "i" } },
      ];
    }
    const jobs = await Job.find(query).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/jobs/:id
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("applicants");
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/jobs
const createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/jobs/:id
const updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/jobs/:id
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json({ message: "Job deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/jobs/:id/apply
const applyForJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    if (job.status !== "Open") return res.status(400).json({ message: "Job is not open for applications" });

    const candidateData = {
      ...req.body,
      appliedJob: job._id,
      status: "Applied",
    };
    const candidate = await Candidate.create(candidateData);
    job.applicants.push(candidate._id);
    await job.save();
    res.status(201).json({ message: "Application submitted successfully", candidate });
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ message: "You have already applied" });
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getJobs, getJobById, createJob, updateJob, deleteJob, applyForJob };

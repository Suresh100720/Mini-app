const Candidate = require("../models/Candidate");

// GET /api/candidates
const getCandidates = async (req, res) => {
  try {
    const { status, department, search } = req.query;
    let query = {};
    if (status) query.status = status;
    if (department) query.department = department;
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { role: { $regex: search, $options: "i" } },
      ];
    }
    const candidates = await Candidate.find(query).populate("appliedJob", "title").sort({ createdAt: -1 });
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/candidates/:id
const getCandidateById = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id).populate("appliedJob");
    if (!candidate) return res.status(404).json({ message: "Candidate not found" });
    res.json(candidate);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/candidates
const createCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.create(req.body);
    res.status(201).json(candidate);
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ message: "Email already exists" });
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/candidates/:id
const updateCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!candidate) return res.status(404).json({ message: "Candidate not found" });
    res.json(candidate);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/candidates/:id
const deleteCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndDelete(req.params.id);
    if (!candidate) return res.status(404).json({ message: "Candidate not found" });
    res.json({ message: "Candidate deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/candidates/bulk  
const deleteBulkCandidates = async (req, res) => {
  try {
    const { ids } = req.body;
    await Candidate.deleteMany({ _id: { $in: ids } });
    res.json({ message: `${ids.length} candidates deleted` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/candidates/stats
const getCandidateStats = async (req, res) => {
  try {
    const total = await Candidate.countDocuments();
    const byStatus = await Candidate.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);
    const byDepartment = await Candidate.aggregate([
      { $group: { _id: "$department", count: { $sum: 1 } } },
    ]);
    const hired = await Candidate.countDocuments({ status: "Hired" });
    const inInterview = await Candidate.countDocuments({ status: "Interview" });
    const offered = await Candidate.countDocuments({ status: "Offered" });
    const rejected = await Candidate.countDocuments({ status: "Rejected" });
    res.json({ total, hired, inInterview, offered, rejected, byStatus, byDepartment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getCandidates,
  getCandidateById,
  createCandidate,
  updateCandidate,
  deleteCandidate,
  deleteBulkCandidates,
  getCandidateStats,
};

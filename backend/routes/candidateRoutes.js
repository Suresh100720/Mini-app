const express = require("express");
const router = express.Router();
const {
  getCandidates,
  getCandidateById,
  createCandidate,
  updateCandidate,
  deleteCandidate,
  deleteBulkCandidates,
  getCandidateStats,
} = require("../controllers/candidateController");
const { protect } = require("../middleware/authMiddleware");

router.get("/stats", protect, getCandidateStats);
router.get("/", protect, getCandidates);
router.get("/:id", protect, getCandidateById);
router.post("/", protect, createCandidate);
router.put("/:id", protect, updateCandidate);
router.delete("/bulk", protect, deleteBulkCandidates);
router.delete("/:id", protect, deleteCandidate);

module.exports = router;

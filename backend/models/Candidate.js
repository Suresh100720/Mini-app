const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: { type: String, required: true },
    role: { type: String, required: true },
    department: { type: String, required: true },
    experience: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["Applied", "Active", "Inactive", "Screening", "Interview", "Offered", "Hired", "Rejected"],
      default: "Applied",
    },
    skills: [{ type: String }],
    location: { type: String },
    salary: { type: Number },
    appliedJob: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
    resume: { type: String },
    notes: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Candidate", candidateSchema);

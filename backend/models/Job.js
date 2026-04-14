const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    company: { type: String, required: true },
    department: { type: String, required: true },
    location: { type: String, required: true },
    type: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract", "Internship", "Remote"],
      default: "Full-time",
    },
    experience: { type: String, required: true },
    salary: { type: String },
    description: { type: String, required: true },
    requirements: [{ type: String }],
    skills: [{ type: String }],
    status: {
      type: String,
      enum: ["Open", "Closed", "Paused"],
      default: "Open",
    },
    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Candidate" }],
    deadline: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);

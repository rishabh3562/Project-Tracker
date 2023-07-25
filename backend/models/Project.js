// models/Project.js
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  status: { type: String },
  timestamps: {
    start: { type: Date },
    end: { type: Date },
  },
  techStacks: [{ type: String }],
  workspace: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;

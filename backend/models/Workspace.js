// models/Workspace.js
const mongoose = require('mongoose');
const projectDataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String },
});
const workspaceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
  displayData:[projectDataSchema],
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Workspace = mongoose.model('Workspace', workspaceSchema);
module.exports = Workspace;

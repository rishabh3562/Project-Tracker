// models/Workspace.js
const mongoose = require('mongoose');

const workspaceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Workspace = mongoose.model('Workspace', workspaceSchema);
module.exports = Workspace;

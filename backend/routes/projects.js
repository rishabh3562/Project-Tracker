// routes/projects.js
const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// Implement routes for creating, updating, and deleting project tracker cards.
router.get('/all', async (req, res) => {
    try {
        // Find all projects in the database
        console.log("test1\n\n")
        const projects = await Project.find();
        console.log("projects\n\n", projects);
        res.status(200).json(projects.length);
    } catch (error) {
        res.status(500).json({ error: 'Server error. Could not fetch projects.' });
    }
});
module.exports = router;

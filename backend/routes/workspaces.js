// routes/workspaces.js
console.log('workspaces.js');
const express = require('express');
const router = express.Router();
const Workspace = require('../models/Workspace');
const Project = require('../models/Project');
// Implement routes for creating, updating, and deleting workspaces.

// POST /api/v1/workspaces
router.post('/', async (req, res) => {
    try {
        const { name, description } = req.body;
        const newWorkspace = new Workspace({ name, description });
        const savedWorkspace = await newWorkspace.save();
        res.status(201).json(savedWorkspace);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create a new workspace' });
    }
});
router.get('/', async (req, res) => {

    try {
        // Find all projects in the database
        console.log("test1\n\n")
        const Workspaces = await Workspace.find();
        // console.log("Workspace\n\n", Workspaces);
        res.status(200).json(Workspaces);
    } catch (error) {
        res.status(500).json({ error: 'Server error. Could not fetch projects.' });
    }

});

// GET /api/v1/workspaces/:workspaceId
router.get('/:workspaceId', async (req, res) => {
    try {
        const workspace = await Workspace.findById(req.params.workspaceId);
        if (!workspace) {
            return res.status(404).json({ error: 'Workspace not found' });
        }
        res.status(200).json(workspace);
    } catch (err) {
        res.status(500).json({ error: 'Failed to get workspace details' });
    }
});

//get all projects in workspace
// GET /api/workspaces/:workspaceId/projects-details
router.get('/:workspaceId/projects-details', async (req, res) => {
    const { workspaceId } = req.params;
    console.log("workspaceId\n\n", workspaceId);
    try {
        // Check if the specified workspace exists
        console.log("test1\n\n")
        const workspace = await Workspace.findById(workspaceId);
        console.log("workspace\n\n", workspace);
        if (!workspace) {
            return res.status(404).json({ error: 'Workspace not found.' });
        }

        // Get the project IDs from the workspace's projects array

        const projects = await Project.find({ _id: { $in: workspace.projects } });
        console.log("projects\n\n", projects);

        // Fetch project details for the project IDs in the workspace
        // const projects = await Project.find({ _id: { $in: projectIds } });
        console.log("projects\n\n", projects);
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ error: 'Server error. Could not fetch project details.', msg: error });
    }
});
// PUT /api/workspaces/:workspaceId
router.put('/:workspaceId', async (req, res) => {
    const { workspaceId } = req.params;
    const { name, description } = req.body;

    try {
        const updatedWorkspace = await Workspace.findByIdAndUpdate(
            workspaceId,
            { name, description },
            { new: true } // Returns the updated workspace in the response
        );

        if (!updatedWorkspace) {
            return res.status(404).json({ error: 'Workspace not found.' });
        }

        res.status(200).json(updatedWorkspace);
    } catch (error) {
        res.status(500).json({ error: 'Server error. Could not update the workspace.' });
    }
});



// DELETE /api/workspaces/:workspaceId
router.delete('/:workspaceId', async (req, res) => {
    const { workspaceId } = req.params;

    try {
        // Check if the specified workspace exists
        const workspace = await Workspace.findById(workspaceId);
        if (!workspace) {
            return res.status(404).json({ error: 'Workspace not found.' });
        }

        // Update all the projects associated with the workspace to remove the workspaceId
        await Project.updateMany(
            { _id: { $in: workspace.projects } },
            { $pull: { workspace: workspaceId } }
        );

        // Check if the workspace array is empty for all projects
        const projectsWithNoWorkspace = await Project.find({ workspace: { $size: 0 } });
        const projectIdsToRemove = projectsWithNoWorkspace.map(project => project._id);

        // Remove the projects that don't belong to any workspace
        if (projectIdsToRemove.length > 0) {
            await Project.deleteMany({ _id: { $in: projectIdsToRemove } });
        }
        // console.log("workspace.projects\n\n", workspace.projects);
        // Remove the workspace from the database
        await Workspace.findByIdAndDelete(workspaceId);

        // If the workspace is successfully deleted, send a 204 No Content response
        res.status(204).json({ msg: "Workspace Deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: 'Server error. Could not delete the workspace.' });
    }
});




// Implement routes for creating, updating, and deleting projects.


//create new project
router.post('/:workspaceId/projects', async (req, res) => {
    const { workspaceId } = req.params;
    const { name, description, status, timestamps, techStacks } = req.body;

    try {
        // Check if the specified workspace exists
        const workspace = await Workspace.findById(workspaceId);
        // console.log("workspace\n\n", workspace);

        //if workspace not found then return error
        if (!workspace) {
            return res.status(404).json({ error: 'Workspace not found.' });
        }


        // Check if the project already exists in the workspace
        const existingProject = workspace.displayData.find(project => project.name === name);
        // console.log("existingProject\n\n", existingProject);

        //if project already exists then return error
        if (existingProject) {
            // Project already exists in the workspace, do not add it again.
            return res.status(400).json({ error: 'Project already exists in the workspace.' });
        }



        //if all good then create new project


        // Create the new project tracker card
        const newProject = new Project({
            name,
            description,
            status,
            timestamps,
            techStacks,
            workspace: workspaceId, // Associate the project with the workspace
        });
        // console.log("newproject\n\n", newProject);


        // Save the new project to the database
        const createdProject = await newProject.save();
        // console.log("createdProject\n\n", createdProject);

        // console.log("workspace.projects\n\n", workspace.projects);

        // Update the workspace to include the new project and its display data
        workspace.projects.push(createdProject._id);
        workspace.displayData.push({ name: name, desc: description });

        //save workspace
        const workres = await workspace.save();
        // console.log("workres\n\n", workres);

        // Send the response with status 201 Created and the created project details
        res.status(201).json(createdProject);
    } catch (error) {
        res.status(500).json({ error: 'Server error. Could not create the project.' });
    }
});


//get project details by id
// GET /api/workspaces/:workspaceId/projects/:projectId
router.get('/:workspaceId/projects/:projectId', async (req, res) => {
    const { workspaceId, projectId } = req.params;

    try {
        // Check if the specified workspace exists
        const workspace = await Workspace.findById(workspaceId);
        if (!workspace) {
            return res.status(404).json({ error: 'Workspace not found.' });
        }
        //if project to be deleted is not in workspace then return error
        if (!workspace.projects.includes(projectId)) {
            return res.status(404).json({ error: 'Project not found.' });
        }
        // Check if the specified project exists within the workspace
        const project = await Project.findById(projectId);
        if (!project || project.workspace.toString() !== workspaceId) {
            return res.status(404).json({ error: 'Project tracker card not found.' });
        }

        // If both the workspace and project exist, send the project details in the response
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ error: 'Server error. Could not get the project details.' });
    }
});


//update project details by id
// PUT /api/workspaces/:workspaceId/projects/:projectId
router.put('/:workspaceId/projects/:projectId', async (req, res) => {
    const { workspaceId, projectId } = req.params;
    const { name, description, status, timestamps, techStacks } = req.body;

    try {
        // Check if the specified workspace exists
        const workspace = await Workspace.findById(workspaceId);
        if (!workspace) {
            return res.status(404).json({ error: 'Workspace not found.' });
        }

        // Check if the specified project exists within the workspace
        const project = await Project.findById(projectId);
        if (!project || project.workspace.toString() !== workspaceId) {
            return res.status(404).json({ error: 'Project tracker card not found.' });
        }

        // Update the project details
        project.name = name;
        project.description = description;
        project.status = status;
        project.timestamps = timestamps;
        project.techStacks = techStacks;

        // Save the updated project to the database
        const updatedProject = await project.save();

        // Send the response with status 200 OK and the updated project details
        res.status(200).json(updatedProject);
    } catch (error) {
        res.status(500).json({ error: 'Server error. Could not update the project details.' });
    }
});

//delete project by id
// DELETE /api/workspaces/:workspaceId/projects/:projectId

// router.delete('/:workspaceId/projects/:projectId', async (req, res) => {
//     const { workspaceId, projectId } = req.params;

//     try {
//         // Check if the specified workspace exists
//         const workspace = await Workspace.findById(workspaceId);
//         if (!workspace) {
//             return res.status(404).json({ error: 'Workspace not found.' });
//         }

//         // Check if the specified project exists within the workspace
//         const project = await Project.findById(projectId);
//         if (!project || project.workspace.toString() !== workspaceId) {
//             return res.status(404).json({ error: 'Project tracker card not found.' });
//         }

//         // Remove the project from the workspace's projects array
//         workspace.projects.pull(projectId);
//         await workspace.save();

//         // Delete the project from the database
//         await project.remove();

//         // Send the response with status 204 No Content
//         res.sendStatus(204);
//     } catch (error) {
//         res.status(500).json({ error: 'Server error. Could not delete the project tracker card.' });
//     }
// });
router.delete('/:workspaceId/projects/:projectId', async (req, res) => {
    const { workspaceId, projectId } = req.params;

    try {
        // Check if the specified workspace exists
        const workspace = await Workspace.findById(workspaceId);
        if (!workspace) {
            return res.status(404).json({ error: 'Workspace not found.' });
        }

        // Check if the specified project exists within the workspace
        const project = await Project.findById(projectId);
        console.log("project\n\n", project);
        console.log("project.workspace.toString()\n\n", project.workspace.toString());
        console.log(project.workspace.includes(workspaceId))
        if (!project || project.workspace.toString() !== workspaceId) {
            return res.status(404).json({ error: 'Project tracker card not found.' });
        }

        // Remove the project from the workspace's projects array
        console.log("workspace.projects before:::::\n\n", workspace.projects);
        if (workspace.projects.includes(projectId)) {

            workspace.projects.pull(projectId);
            if (project.workspace.includes(workspaceId)) {
                project.workspace.pull(workspaceId);
            }
        }
        console.log("workspace.projects after:::::\n\n", workspace.projects);
        await workspace.save();
        console.log("workspace.projects after save:::::\n\n", workspace.projects);
        console.log("workspace:::::\n\n", workspace);

        // Delete the project from the database if it is not associated with any workspace
        if (project.workspace.length === 0) {
            // await project.remove();
            await Project.findByIdAndDelete(projectId);
        }

        // Send the response with status 204 No Content
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: 'Server error. Could not delete the project tracker card.' });
    }
});

router.delete('/:workspaceId', async (req, res) => {
    const { workspaceId } = req.params;

    try {
        // Check if the specified workspace exists
        const workspace = await Workspace.findById(workspaceId);
        if (!workspace) {
            return res.status(404).json({ error: 'Workspace not found.' });
        }

        // Update all the projects associated with the workspace to remove the workspaceId
        await Project.updateMany(
            { _id: { $in: workspace.projects } },
            { $pull: { workspace: workspaceId } }
        );

        // Check if the workspace array is empty for all projects
        const projectsWithNoWorkspace = await Project.find({ workspace: { $size: 0 } });
        const projectIdsToRemove = projectsWithNoWorkspace.map(project => project._id);

        // Remove the projects that don't belong to any workspace
        if (projectIdsToRemove.length > 0) {
            await Project.deleteMany({ _id: { $in: projectIdsToRemove } });
        }
        // console.log("workspace.projects\n\n", workspace.projects);
        // Remove the workspace from the database
        await Workspace.findByIdAndDelete(workspaceId);

        // If the workspace is successfully deleted, send a 204 No Content response
        res.status(204).json({ msg: "Workspace Deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: 'Server error. Could not delete the workspace.' });
    }
});
module.exports = router;

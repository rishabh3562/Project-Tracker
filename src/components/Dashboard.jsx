import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Modal,
  TextField,
  Grid,
  Box,
  Pagination
} from "@mui/material";
import WorkSpaceCard from "../components/WorkSpaceCard";
import { getWorkspaces, createWorkspace } from "../api/workspaceApi";

const DashBoard = () => {
  // Sample initial workspace data
  let initialWorkspaces = [
    { id: 1, name: "Workspace 1" },
    { id: 2, name: "Workspace 2" },
    // Add more workspace objects as needed
  ];

  const [workspaces, setWorkspaces] = useState([]);
  const [pageSize, setPageSize] = useState(4);
  const [openModal, setOpenModal] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState("");
  const [newWorkspaceDescription, setNewWorkspaceDescription] = useState("");
  // Fetch workspaces on component mount (you should replace this with your API call)
  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const fetchWorkspaces = async () => {
    try {
      // Fetch workspaces using the getWorkspaces API function
      const fetchedWorkspaces = await getWorkspaces();
      console.log(fetchedWorkspaces);
      if (fetchedWorkspaces.length === 0) {
        // If no workspaces are fetched, use the initial workspaces
        setWorkspaces(initialWorkspaces);
      } else {
        // Otherwise, update the state with the fetched workspaces
        setWorkspaces(fetchedWorkspaces);
      }
    } catch (error) {
      console.error("Error fetching workspaces:", error);
    }
  };
  const handleCreateWorkspace = async () => {
    try {
      // Perform API call to create a new workspace using the createWorkspace API function
      const newWorkspaceData = {
        name: newWorkspaceName,
        description: newWorkspaceDescription,
      };
      const newWorkspace = await createWorkspace(newWorkspaceData);

      // Add the new workspace to the list and close the modal
      setWorkspaces([...workspaces, newWorkspace]);
      setOpenModal(false);
    } catch (error) {
      console.error("Error creating workspace:", error);
    }
  };

  return (<>
    <Container maxWidth="md" sx={{ paddingTop: "20px" }}>
      <Typography variant="h4" gutterBottom>
        My Workspaces
      </Typography>
      <Grid container spacing={2}>
        {workspaces.map((workspace) => (
          <Grid key={workspace.id} item xs={12} sm={6} md={6}>
            <WorkSpaceCard
              id={workspace._id}
              title={workspace.name}
              projectNum={workspace.projects.length}
              content={workspace.description}
            />
          </Grid>
        ))}
      </Grid>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenModal(true)}
      >
        Create New Workspace
      </Button>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Container
          maxWidth="xs"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
     

      
          <Typography variant="h6" gutterBottom>
            Create New Workspace
          </Typography>
          <TextField
            label="Workspace Name"
            fullWidth
            value={newWorkspaceName}
            onChange={(e) => setNewWorkspaceName(e.target.value)}
            sx={{ marginBottom: "10px" }}
          />

          <TextField
            label="Workspace Description"
            fullWidth
            value={newWorkspaceDescription}
            onChange={(e) => setNewWorkspaceDescription(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: "10px" }}
            onClick={handleCreateWorkspace}
          >
            Create
          </Button>
         
        </Container>
      </Modal>

      <Container maxWidth="md" sx={{ paddingTop: "20px",display:'flex',justifyContent:'center',alignItems:'center', marginTop:'10px',marginBottom:"20px" }}>
    <Pagination count={Math.ceil((workspaces.length)/pageSize)} color="primary" />
    </Container>
    </Container>
 </>
  );
};

export default DashBoard;

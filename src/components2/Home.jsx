import React, { useState, useEffect } from "react";
// import { Link } from 'react-router-dom';
import { getWorkspaces } from "../api/workspaceApi";
import WorkspaceCard from "./WorkSpaceCard";
import "./css/Home.css"; // Import the CSS file for grid styles

function Home() {
  const [workspaces, setWorkspaces] = useState([]);

  useEffect(() => {
    // Fetch and set the list of workspaces
    getWorkspaces()
      .then(setWorkspaces)
      .catch((error) => console.error("Error fetching workspaces:", error));
  }, []);

  return (
    <div>
      <h2>Workspaces</h2>

      <div className="grid-container">
      
        {workspaces.map((workspace) => (
        <div className="grid-item" key={workspace._id}>
        
     
          <WorkspaceCard
            key={workspace._id}
            title={workspace.name}
            description={workspace.description}
            projectNum={workspace.projects.length}
          />
             </div>
        ))}
      </div>
      {/* <Link to="/create/workspace">Create New Workspace</Link> */}
    </div>
  );
}

export default Home;

import React from 'react';
import './css/WorkspaceCard.css'

const WorkspaceCard = ({ title, image, description,projectNum ,key}) => {
  
    return (
    <div className="card">
      {/* <img src={image} alt={title} className="card-image" /> */}
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>
        <p className="card-description">{projectNum} projects</p>
      </div>
    </div>
  );
};

export default WorkspaceCard;

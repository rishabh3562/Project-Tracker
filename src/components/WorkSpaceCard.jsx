
import React, { useState,useEffect } from "react";
import { Card, CardHeader, CardContent, CardActions, IconButton, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { red, blue, green } from "@mui/material/colors";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TelegramIcon from "@mui/icons-material/Telegram";

import { styled } from "@mui/material/styles";




import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";


import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

import MoreVertIcon from "@mui/icons-material/MoreVert";




import UpdateIcon from "@mui/icons-material/Update";
import EditIcon from "@mui/icons-material/Edit";
import { deleteWorkspaceById,getWorkspaceById,getWorkspaces,createWorkspace } from "../api/workspaceApi";
// import { getWorkspaces, createWorkspace } from "../api/workspaceApi";

const WorkSpaceCard = ({ id, title, projectNum, content, onDelete }) => {
  const [expanded, setExpanded] = useState(false);
  const [truncatedContent, setTruncatedContent] = useState(
    content.length > 50 ? content.slice(0, 50) + "..." : content
  );
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
    if (!expanded) {
      setTruncatedContent(content);
    } else {
      setTruncatedContent(
        content.length > 50 ? content.slice(0, 50) + "..." : content
      );
    }
  };

  const handleShareModalOpen = () => {
    setShareModalOpen(true);
  };

  const handleShareModalClose = () => {
    setShareModalOpen(false);
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(content).then(() => {
      alert("Content copied to clipboard!");
    });
  };

  const handleWhatsAppShare = () => {
    const shareURL = `whatsapp://send?text=${encodeURIComponent(content)}`;
    window.location.href = shareURL;
  };

  const handleTelegramShare = () => {
    const shareURL = `tg://msg?text=${encodeURIComponent(content)}`;
    window.location.href = shareURL;
  };

  const handleDeleteClick = () => {
    onDelete(); // Call the onDelete function passed from the parent component
  };

  return (
    <>
      <Card>
        <CardHeader
          sx={{ wordWrap: "break-word" }}
          avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="workspace" />}
          title={title}
          subheader={projectNum + " projects"}
        />

        <CardContent sx={{ wordWrap: "break-word" }}>
          <Typography variant="body2" color="text.secondary">
            {truncatedContent}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            aria-label="delete workspace"
            onClick={handleDeleteClick}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            aria-label="share"
            onClick={handleShareModalOpen}
          >
            <ShareIcon />
          </IconButton>
          <IconButton
            aria-label="show more"
            onClick={handleExpandClick}
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>

        {/* Share Modal */}
        <Dialog open={shareModalOpen} onClose={handleShareModalClose}>
          <DialogTitle>Share Workspace</DialogTitle>
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Button
              onClick={handleCopyClick}
              startIcon={<FileCopyIcon sx={{ color: blue[500] }} />}
              color="primary"
              sx={{ marginBottom: 1 }}
            >
              Copy URL
            </Button>
            <Button
              onClick={handleWhatsAppShare}
              startIcon={<WhatsAppIcon sx={{ color: green[500] }} />}
              color="primary"
              sx={{ marginBottom: 1 }}
            >
              Share on WhatsApp
            </Button>
            <Button
              onClick={handleTelegramShare}
              startIcon={<TelegramIcon sx={{ color: blue[500] }} />}
              color="primary"
            >
              Share on Telegram
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleShareModalClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        {/* Additional Buttons */}
      </Card>
    </>
  );
};

export default WorkSpaceCard;

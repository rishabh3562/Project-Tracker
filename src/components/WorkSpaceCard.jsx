import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red, blue, green } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TelegramIcon from "@mui/icons-material/Telegram";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import EditIcon from "@mui/icons-material/Edit";
import { deleteWorkspaceById } from "../api/workspaceApi";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const WorkSpaceCard = ({ id, title, projectNum, content }) => {
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
    // Copy the content to the clipboard
    navigator.clipboard.writeText(content).then(() => {
      alert("Content copied to clipboard!");
    });
  };

  const handleWhatsAppShare = () => {
    // Share via WhatsApp
    const shareURL = `whatsapp://send?text=${encodeURIComponent(content)}`;
    window.location.href = shareURL;
  };

  const handleTelegramShare = () => {
    // Share via Telegram
    const shareURL = `tg://msg?text=${encodeURIComponent(content)}`;
    window.location.href = shareURL;
  };

  const handleDeleteWorkspace = async () => {
    console.log(id);
    try {
      // Perform API call to delete the workspace using the deleteWorkspace API function
      await deleteWorkspaceById(id);
      console.log("Workspace deleted successfully!");

      // Remove the deleted workspace from the state
    } catch (error) {
      console.error("Error deleting workspace:", error);
    }
  };

  const handleUpdateWorkspace = () => {
    // Implement the logic to update the workspace using the 'id' prop
    // For example:
    // updateWorkspace(id, updatedData);
    alert(`Workspace with ID ${id} will be updated!`);
  };

  return (
    <>
      <Card>
        <CardHeader
          sx={{ wordWrap: "break-word" }}
          avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="workspace" />}
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={title}
          subheader={projectNum + " projects"}
        />

        <CardContent sx={{ wordWrap: "break-word" }}>
          <Typography variant="body2" color="text.secondary">
            {truncatedContent}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton
            aria-label="delete workspace"
            onClick={handleDeleteWorkspace}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            aria-label="update workspace"
            onClick={handleUpdateWorkspace}
          >
            <EditIcon />
          </IconButton>
          <IconButton aria-label="share" onClick={handleShareModalOpen}>
            <ShareIcon />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
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

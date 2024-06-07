import React, { useState, useEffect, Children } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const CommentPopup = ({
  open,
  handleClose,
  comments,
  yourComments,
  handleAddComment,
}) => {
  yourComments.forEach((element) => {
    element.isUser = true;
  });
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (open) {
      setNewComment("");
    }
  }, [open]);

  const handleInputChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleSubmit = () => {
    if (newComment.trim() !== "") {
      handleAddComment({
        content: newComment,
        date: new Date().toISOString(),
        isUser: true,
      });
      setNewComment("");
    }
  };

  const mergedComments = [...comments, ...yourComments].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        style: { maxHeight: "calc(100% - 200px)" },
      }}
    >
      <DialogTitle>
        Comments
        <IconButton
          onClick={handleClose}
          style={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers style={{ overflowY: "auto" }}>
        <List>
          {mergedComments.map((comment, index) => (
            <ListItem
              key={index}
              style={{
                justifyContent: comment.isUser ? "flex-end" : "flex-start",
              }}
            >
              <ListItemText
                primary={comment.content}
                secondary={new Date(comment.date).toLocaleString()}
                style={{ textAlign: comment.isUser ? "right" : "left" }}
              />
            </ListItem>
          ))}
        </List>
        <TextField
          value={newComment}
          onChange={handleInputChange}
          fullWidth
          variant="outlined"
          placeholder="Add a comment..."
          multiline
          rows={2}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Add Comment
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CommentPopup;

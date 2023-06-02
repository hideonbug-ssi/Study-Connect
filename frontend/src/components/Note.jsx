import React from "react";
import { Card, CardContent, Typography, IconButton, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

function Note({note}) {
  const instance = axios.create({
    withCredentials: true,
  });
  const navigate = useNavigate();
  const noteId = note.id;
  const handleEdit = () => {
    localStorage.setItem("noteId", noteId);
    navigate(`/edit-notes/${noteId}/edit`);
  };

  const handleDelete = () => {
    const userToken = Cookies.get("UserToken");
    const userId = localStorage.getItem("userId");
    instance
      .delete(`http://localhost:4000/note/notes/?noteId=${noteId}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then(() => {
        navigate(`/notes/${userId}`);
      })
      .catch((error) => {
        console.log(error);
      });
      window.location.reload();
  };

  return (
    <Card sx={{ backgroundColor: "#c5c6d0" }}>
      <CardContent>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {note.title}
          </Typography>
          <IconButton aria-label="Edit" onClick={handleEdit}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="Delete" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            marginTop: "1rem",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {note.content}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Note;

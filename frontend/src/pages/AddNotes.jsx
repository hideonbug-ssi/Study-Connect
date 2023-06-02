import React, { useState } from "react";
import SideBar from "../components/SideBar";
import {
  Box,
  TextField,
  Button,
  Toolbar,
  Typography,
  Icon,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddNotes() {
  const navigate = useNavigate();
  const instance = axios.create({
    withCredentials: true,
  });

  const userId = localStorage.getItem("userId");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    const token = localStorage.getItem("token");

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    instance.post(
      "http://localhost:4000/note",
      {
        title: title,
        content: content,
        userId: userId,
      },
      config
    )
    .then((res) => {
      console.log(res);
      navigate(`/notes/${userId}`)
    })
    .catch((err) => {
      console.log(err);
    })
  };

  const handleCancel = () => {
    navigate(`/notes/${userId}`)
    };
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const validateForm = () => {
    const fields = [title, content];
    for (const field of fields) {
      if (!field || !field.trim()) {
        console.log('Please fill all the fields');
        return false;
      }
    }
    return true;
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  }

  const handleContentChange = (event) => {
    setContent(event.target.value);
  }

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Box sx={{ width: { sm: "100px", md: "280px" } }}>
        <SideBar />
      </Box>

      {/* Main content */}
      <Box flexGrow={1} p={2}>
        <Toolbar />
        <Box
          sx={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}
        >
          <Typography variant="h5" gutterBottom>
            Create Note
          </Typography>
          <Icon
            component={CreateIcon}
            sx={{
              fontSize: "1.5rem",
              marginLeft: "1rem",
              marginTop: "-0.5rem",
            }}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box sx={{ width: "50%" }}>
            <form onSubmit={handleSubmit}>
              <TextField
                required
                margin="dense"
                id="title"
                name="title"
                label="Title"
                fullWidth
                variant="outlined"
                value={title}
                onChange={handleTitleChange}
              />
              <TextField
                required
                multiline
                margin="dense"
                id="description"
                name="description"
                label="Description"
                rows={10}
                placeholder="Write your note here..."
                fullWidth
                value={content}
                onChange={handleContentChange}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "1rem",
                }}
              >
                <Button
                  variant="outlined"
                  onClick={handleCancel}
                  sx={{ color: "red", border: "none" }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ border: "none" }}
                >
                  Submit
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default AddNotes;

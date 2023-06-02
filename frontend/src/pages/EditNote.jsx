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
import Cookies from "js-cookie";
import { useEffect } from "react";

function EditNote() {
  const [note, setNote] = useState(
    
  );
  const instance = axios.create({
    withCredentials: true,
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotes();
  }, []);

  const userId = localStorage.getItem("userId");
  const noteId = localStorage.getItem("noteId");

  const fetchNotes = async () => { 
    const userToken = Cookies.get("user");
    // console.log(noteId);
    await instance
      .get(`http://localhost:4000/note/notes/?noteId=${noteId}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => {
        console.log(res.data);
        setNote(res.data[0]);
        setTitle(res.data[0].title);
        setContent(res.data[0].content);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    const token = localStorage.getItem("token");

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    instance
      .patch(
        `http://localhost:4000/note/notes/?noteId=${noteId}`,
        {
          title: title,
          content: content,
        },
        config
      )
      .then((res) => {
        console.log(res);
        navigate(`/notes/${userId}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCancel = () => {
    navigate(`/notes/${userId}`);
  };

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const validateForm = () => {
    const fields = [title, content];
    for (const field of fields) {
      if (!field || !field.trim()) {
        console.log("Please fill all the fields");
        return false;
      }
    }
    return true;
  };

  const handleTitleChange = (event) => {
    // setNote((prevState) => ({
    //   ...prevState,
    //   title: event.target.value,
    // }));
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    // setNote((prevState) => ({
    //   ...prevState,
    //   content: event.target.value,
    // }));
    setContent(event.target.value);
  };

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
            Edit Note
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
                  Save
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default EditNote;

import React, { useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import {
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";
import SharedNote from "../components/SharedNote";
import Cookies from "js-cookie";
// import { useNavigate } from "react-router-dom";

function OtherNotes() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery("(max-width: 768px) and (max-height: 1024px)");
  const instance = axios.create({
    withCredentials: true,
  });
  // const navigate = useNavigate();
  const [notes, setNotes] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const userId = localStorage.getItem("userId");
    const userToken = Cookies.get("user");
    await instance
      .get(
        "http://localhost:4000/note/sharednotes",
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      )
      .then((res) => {
        console.log(res.data);
        setNotes(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  return (
    <Box>
      <SideBar />
      <Box
        sx={{
          flexGrow: 1,
          paddingLeft: isMobile ? 0 : isTablet ? "100px" : "280px",
        }}
      >
        <Box
          sx={{
            marginLeft: "1.5rem",
            marginRight: "1.5rem",
            marginTop: isMobile ? "0" : "1rem",
          }}
        >
          {notes &&
            notes.map((note) => (
              <Box
                key={note.id}
                sx={{
                  marginBottom: "1rem",
                  maxWidth: isMobile ? "100%" : "96%",
                }}
              >
                <SharedNote note={note} />
              </Box>
            ))}
        </Box>
      </Box>
    </Box>
  );
}

export default OtherNotes;

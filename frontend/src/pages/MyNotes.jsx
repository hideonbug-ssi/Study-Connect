import React, { useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import {
  Box,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";
import Note from "../components/Note";
import Cookies from "js-cookie";
// import { useNavigate } from "react-router-dom";

function MyNotes() {
  const [greetText, setGreetText] = useState("");
  const [currentDate, setCurrentDate] = useState("");
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
    // console.log(Cookies.get("user"));
  }, []);

  const fetchNotes = async () => {
    const userId = localStorage.getItem("userId");
    const userToken = Cookies.get("user");
    await instance
      .get(`http://localhost:4000/note/notes/${userId}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => {
        console.log(res.data);
        setNotes(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const currentDate = new Date();
    const day = currentDate.toLocaleDateString("default", { weekday: "long" });
    const month = currentDate.toLocaleString("default", { month: "long" });
    const date = `${day}, ${month} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;
    setCurrentDate(date);

    let currentHour = currentDate.getHours();
    if (currentHour < 12) setGreetText("Good Morning!");
    else if (currentHour < 18) setGreetText("Good Afternoon!");
    else setGreetText("Good Evening!");
  }, []);

  return (
    <Box>
      <SideBar />
      <Box sx={{ flexGrow: 1, paddingLeft: isMobile ? 0 : (isTablet ? "100px" : "280px") }}>
        <Toolbar sx={{ justifyContent: isMobile ? "space-between" : (isTablet ? "center" : "flex-start"), marginTop: isMobile ? "4rem" : "1rem" }}>
          <Typography variant="h6" sx={{flexGrow: isMobile ? 1 : (isTablet ? 0.9 : 0.945)}}>
            {greetText}
          </Typography>
          <Typography variant="body1">
            {currentDate}
          </Typography>
        </Toolbar>
        <Box sx={{ marginLeft: "1.5rem", marginRight: "1.5rem", marginTop: isMobile ? "0" : "1rem" }}>
          {notes &&
            notes.map((note) => (
              <Box key={note.id} sx={{ marginBottom: "1rem", maxWidth: isMobile ? "100%" : "96%" }}>
                <Note note={note} />
              </Box>
            ))}
        </Box>
      </Box>
    </Box>
  );
}

export default MyNotes;

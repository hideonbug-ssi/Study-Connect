import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import { Box, TextField } from "@mui/material";
import axios from "axios";

function Setting() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  // const navigate = useNavigate();
  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const instance = axios.create({
    withCredentials: true,
  });

  const handleSubmit = async () => {
    instance.patch("/user/:userId")
      .then(response => {
        console.log("Profile updated successfully");
      })
      .catch(error => {
        console.error("Error updating profile:", error);
      });
  };

  useEffect(() => {
    axios.get("/user/:userId")
      .then(response => {
        setProfileInfo(response.data);
      })
      .catch(error => {
        console.error("Error fetching profile information:", error);
      });
  }, []);

  

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Box sx={{ width: { sm: "100px", md: "280px" } }}>
        <SideBar />
      </Box>
      <Box>
        <h1>Profile</h1>
      </Box>
    </Box>
  );
}

export default Setting;
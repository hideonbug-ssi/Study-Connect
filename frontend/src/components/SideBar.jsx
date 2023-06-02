import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  AppBar,
  Box,
  Icon,
  IconButton,
  ListItemText,
  SwipeableDrawer,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  NoteAdd as NoteIcon,
  Add as AddIcon,
  Settings as SettingsIcon,
  Share as ShareIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import "../styles/SideBar.css";

const resDisplay = {
  width: { xs: "5rem", md: "14.5rem" },
  fontSize: { xs: "120%", md: "210%" },
  display: { xs: "none", md: "block" },
};

const userId = localStorage.getItem('userId');

const links = [
  { to: `/notes/${userId}`, label: "My Notes", icon: <NoteIcon /> },
  { to: `/add-notes/${userId}`, label: "Add Notes", icon: <AddIcon /> },
  // { to: `/edit-notes/${userId}`, label: "Edit Notes", icon: <EditIcon /> },
  {to: `/shared-notes/${userId}`, label: "Shared Notes", icon: <ShareIcon />},
  { to: `/setting/${userId}`, label: "Settings", icon: <SettingsIcon /> },
];


function SideBar() {
  const [activeLink, setActiveLink] = useState("");
  const [state, setState] = useState({
    top: false,
  });
  const anchor = "top";
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <>
      {/* Responsive (Phone size) */}
      <Box
        sx={{
          position: "fixed",
          top: "0",
          left: "0",
          display: { xs: "block", sm: "none" },
          zIndex: "9999",
        }}
      >
        <AppBar
          position="static"
          sx={{ width: "100vw", backgroundColor: "#333333" }}
        >
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography
              sx={{
                color: "white",
                fontSize: "120%",
                fontWeight: "bolder",
              }}
            >
              Study Connect
            </Typography>

            <React.Fragment key={top}>
              <IconButton
                color="white"
                edge="start"
                sx={{ mr: 2 }}
                onClick={toggleDrawer(anchor, true)}
              >
                <MenuIcon sx={{ color: "white" }} />
              </IconButton>
              {/* Drawer appear when clicking on the button */}
              <SwipeableDrawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
                onOpen={toggleDrawer(anchor, true)}
                disableSwipeToOpen={true}
              >
                <Box
                  sx={{ width: resDisplay.width, marginTop: "3rem" }}
                  onClick={toggleDrawer(anchor, false)}
                  onKeyDown={toggleDrawer(anchor, false)}
                >
                  {links.map(({ to, label }) => (
                    <NavLink
                      key={to}
                      to={to}
                      className="inactive-link"
                      activeClassName="active-link" // Update activeclassname to activeClassName
                      onClick={() => setActiveLink(to)}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          color: "black",
                          width: "100vw",
                          padding: "1rem",
                        }}
                      >
                        <ListItemText sx={{ fontWeight: "bolder" }}>
                          {label}
                        </ListItemText>
                      </Box>
                    </NavLink>
                  ))}
                </Box>
              </SwipeableDrawer>
            </React.Fragment>
          </Toolbar>
        </AppBar>
      </Box>
      <Box
        id="sidebar"
        sx={{ width: resDisplay.width, display: { xs: "none", sm: "block" } }}
      >
        <Box
          id="logo"
          sx={{
            paddingTop: { xs: "25%", md: "8%" },
            paddingBottom: { xs: "0%", md: "8%" },
          }}
        >
          <Box id="logoicon" sx={{ fontSize: resDisplay.fontSize }}>
            Study Connect
          </Box>
        </Box>

        {links.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            className="inactive-link"
            activeclassname="active-link"
            onClick={() => setActiveLink(to)}
          >
            <Box
              id="sidebarbutton"
              sx={{ paddingLeft: { xs: "1.75rem", md: "2.5rem" } }}
            >
              <Icon id="sidebaricon">{icon}</Icon>
              <Box sx={{ display: resDisplay.display }}>
                <h4>{label}</h4>
              </Box>
            </Box>
          </NavLink>
        ))}
      </Box>
    </>
  );
}

export default SideBar;

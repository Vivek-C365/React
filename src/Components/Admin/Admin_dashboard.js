import React, { useState } from "react";
import { Box, Avatar, Menu, MenuItem, ListItemIcon, Divider, IconButton, Tooltip } from "@mui/material";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import "../../Assets/css/Admin.css";
import QuestionsLogo from "../../Assets/images/Question_logo_1.png";
import DashboardImg from "../../Assets/images/Admin/Home.png";
import LanguageImg from "../../Assets/images/Admin/Coding.png";
import DocumentImg from "../../Assets/images/Admin/Document.png";
import avatar from '../../Assets/images/Admin/avatar.png'

const AdminDashboard = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <section className="wrapper">
      <section className="side_nav">
        <div className="logo_img">
          <img src={QuestionsLogo} alt="Questions Logo" />
        </div>

        <div className="tabs">
          {tab("Dashboard", DashboardImg)}
          {tab("Language", LanguageImg)}
          {tab("Add Questions", DocumentImg)}
        </div>
      </section>

      <section className="main_content">
        <div className="profile_tab">
          <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }}>
                  <img className="avatar_profile_img" src={avatar} alt="" />
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": { width: 32, height: 32, ml: -0.5, mr: 1 },
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleClose}>
              <Avatar /> My account
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
              <ListItemIcon><Settings fontSize="small" /></ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon><Logout fontSize="small" /></ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </div>
      </section>
    </section>
  );
};

const tab = (text, image) => (
  <div className="dashboard_tab tab_common">
    <div className="dashboard_tab_img tab_common_img">
      <img src={image} alt={text} />
    </div>
    <div className="dashboard_tab_text">
      <span>{text}</span>
    </div>
  </div>
);

export default AdminDashboard;

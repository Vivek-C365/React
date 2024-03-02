import React, { useState } from "react";
import { Box, Avatar, Menu, MenuItem, ListItemIcon, Divider, IconButton, Tooltip } from "@mui/material";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import "../../Assets/css/Admin.css";
import QuestionsLogo from "../../Assets/images/Question_logo_1.png";
import DashboardImg from "../../Assets/images/Admin/Home.png";
import LanguageImg from "../../Assets/images/Admin/Coding.png";
import DocumentImg from "../../Assets/images/Admin/Document.png";
import avatar from '../../Assets/images/Admin/avatar.png';

const AdminDashboard = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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

  return (
    <>
      <nav className="side_nav">
        <div className="logo_img">
          <img src={QuestionsLogo} alt="Questions Logo" />
        </div>

        <div className="tabs">
          {tab("Dashboard", DashboardImg)}
          {tab("Language", LanguageImg)}
          {tab("Add Questions", DocumentImg)}
        </div>
      </nav>

      
        
    
    </>
  );
};

export default AdminDashboard;

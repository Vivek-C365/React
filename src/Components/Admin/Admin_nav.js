import React from "react";
import "../../Assets/css/Admin.css";
import QuestionsLogo from "../../Assets/images/Question_logo_1.png";
import DashboardImg from "../../Assets/images/Admin/Home.png";
import LanguageImg from "../../Assets/images/Admin/Coding.png";
import DocumentImg from "../../Assets/images/Admin/Document.png";
import { NavLink} from "react-router-dom";

const AdminDashboard = () => {

  

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
          <NavLink to="/Admin/Dashboard" exact activeClassName="active">

          {tab("Dashboard", DashboardImg)}
          </NavLink>

          <NavLink to="/Admin/Language">

          {tab("Language", LanguageImg)}
          </NavLink>
          {tab("Add Questions", DocumentImg)}
        </div>
      </nav>

      
        
    
    </>
  );
};

export default AdminDashboard;

import React from "react";
import Questions_logo from "../Assets/images/Question_logo.jpg";
import "../Assets/css/Question.css";
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

function Nav2() {
  const logout = () => {
    // Your login logic here

    // Redirect to the new page upon successful login
    window.location.href = "/"; // Assuming "/Questions" is the URL of the new page
  };
  return (
    <nav class="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
      <div class="container-fluid nav_container">
        <img src={Questions_logo} alt="" />
        <div class="dropdown">
          <button
            class="account_btn btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Account
          </button>
          <ul class="dropdown-menu">
            <div className="profile_btn account_dropdown_btn">
              <PersonOutlineIcon/>
              <button className="profile_context">Profile</button>

            </div>
            <div className="logout_btn account_dropdown_btn">
              <LogoutIcon/>
              <button
                className="logout_context"
                value="Logout"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav2;

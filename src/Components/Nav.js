import React from "react";
import { NavLink } from "react-router-dom";
import "../Assets/css/Nav.css";
import Login_logo from "../Assets/images/login_icon/icons8-login-96.png";
import Registration_logo from "../Assets/images/registration/icons8-registration-96.png";

function Nav() {
  return (
    <>
      <div className="form_context">
        <div className="Form_name">
          <div className="login_context form_name_text">
            <div className="login_logo">
              <img src={Login_logo} alt="login IMG" />
            </div>
            <div className="login_text">
            <NavLink className="login_text" to="/">
                <span>LOGIN</span>
              </NavLink>
            </div>
          </div>
          <div className="registration_context form_name_text">
            <div className="registration_logo">
              <img src={Registration_logo} alt="IMG" />
            </div>
            <div className="registration_text">
              <NavLink className="registration_text" to="/Registration">
                <span>REGISTRATION</span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Nav;

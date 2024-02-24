import React from "react";
import Nav from "./Nav";

function Registration() {
  return (
    <>
      <div className="Credintal_context">
        <Nav />
        <div className="Registration_container">
          <h1>Registration</h1>
          <form className="credential_detail" action="/action_page.php" method="post">
            <div className="name_input field_input">
              <label for="name">Name:</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="username_input field_input">
              <label for="username">Username</label>
              <input type="text" id="username" name="username" required />
            </div>
            <div className="email_input">
              <label for="email">Email:</label>
              <input type="email" id="email" name="email" required />
            </div>

            <div className="password_input">
              <label for="password">Password:</label>
              <input type="password" id="password" name="password" required />
            </div>
            <div className="submit_btn">
              <input type="submit" value="Register" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Registration;

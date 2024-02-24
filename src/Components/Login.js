import React from "react";
import "../Assets/css/credentials.css";
import Nav from "./Nav";

function Login() {

  const login = () => {
    // Your login logic here

    // Redirect to the new page upon successful login
    window.location.href = "/Questions"; // Assuming "/Questions" is the URL of the new page
  };
  return (
    <>
      <div className="Credintal_context">
        <Nav />
        <div className="login_container">
          <h1>Login</h1>
          <form  className="credential_detail"action="/action_page.php" method="post">
            <div className="email_input">
              <label for="email">Email:</label>
              <input type="text" id="email" name="email" required />
            </div>

            <div className="password_input">
              <label for="password">Password:</label>
              <input type="password" id="password" name="password" required />
            </div>
            <div className="submit_btn">
              <input type="submit" value="Login" onClick={login} />
            </div>
          </form>

        </div>
      </div>
    </>
  );
}

export default Login;

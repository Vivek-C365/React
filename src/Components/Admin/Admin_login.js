import React from "react";
// import "../../Assets/css/sb-admin-2.min.css";

function Admin_login() {
    const admin_login = () => {
        // Redirect to the new page upon successful login
        window.location.href = "/Admin/Dashboard"; 
      };
  return (
    <>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-10 col-lg-12 col-md-9">
            <div class="card o-hidden border-0 shadow-lg my-5">
              <div class="card-body p-0">
                <div class="row">
                  <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
                  <div class="col-lg-6">
                    <div class="p-5">
                      <div class="text-center">
                        <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                      </div>
                      <form class="user" method="post">
                        <div class="form-group">
                          <input
                            type="text"
                            class="form-control form-control-user"
                            name="username"
                            id="username"
                            aria-describedby="emailHelp"
                            placeholder="Enter UserName..."
                            required
                          />
                        </div>
                        <div class="form-group">
                          <input
                            type="password"
                            class="form-control form-control-user"
                            name="passwd"
                            id="passwd"
                            placeholder="Password"
                            required
                          />
                        </div>
                        <div class="form-group">
                          <div class="custom-control custom-checkbox small">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="customCheck"
                            />
                            <label
                              class="custom-control-label"
                              for="customCheck"
                            >
                              Remember Me
                            </label>
                          </div>
                        </div>
                        <div class="submit_btn">
                          <button type="submit" class="btn btn-primary btn-user btn-block" onClick={admin_login}>
                            <span>Login</span>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin_login;

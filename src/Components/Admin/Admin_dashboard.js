import React from 'react';

function AdminDashboard() {
  return (
    <>
      <div id="wrapper">
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
          <a className="sidebar-brand d-flex align-items-center justify-content-center" href="#">
            <div className="sidebar-brand-icon rotate-n-15">
              <i className="fas fa-laugh-wink"></i>
            </div>
            <div className="sidebar-brand-text mx-3">Admin </div>
          </a>
          <hr className="sidebar-divider my-0" />
          <li className="nav-item active">
            <a className="nav-link" href="#">
              <i className="fas fa-fw fa-tachometer-alt"></i>
              <span>Dashboard</span>
            </a>
          </li>
          <hr className="sidebar-divider" />
          <div className="sidebar-heading">Interface</div>
        </ul>
      </div>
    </>
  );
}

export default AdminDashboard;

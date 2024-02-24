import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './Assets/css/bootstrap.min.css'
import "./App.css";
import Admin from './Components/Admin/Admin_login'
import Dashboard from './Components/Admin/Admin_dashboard'
import Login from "./Components/Login";
import Registration from "./Components/Registration";
import Questions from "./Components/Questions";
import Python from './Components/Python'
import Result from './Components/Result'
import Test from './Components/test'

function App() {
  // useEffect(() => {
  //   function disableRightClick(event) {
  //     event.preventDefault();
  //   }

  //   document.addEventListener('contextmenu', disableRightClick);

  //   return () => {
  //     document.removeEventListener('contextmenu', disableRightClick);
  //   };
  // }, []);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/test" element={<Test />} />
          <Route path="/Admin/Login" element={<Admin />} />
          <Route path="/Admin/Dashboard" element={<Dashboard />} />
          <Route path="/Registration" element={<Registration />} />
          <Route path="/Questions" element={<Questions />} />
          <Route path="/Python" element={<Python />} />
          <Route path="/Result" element={<Result />} />
        </Routes>

        {/* <Footer/> */}
      </Router>
    </>
  );
}

export default App;

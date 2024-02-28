import React from "react";
import { useLocation , useNavigate} from 'react-router-dom'
import Question_nav from "../Components/Question_nav";
import "../Assets/css/result.css";
import Frame from "../Assets/images/Frame.png";
import Tick from "../Assets/images/Tick_Box.png";
import Cross from "../Assets/images/Cross Mark Button.png";
function Result() {
  const navigate = useNavigate()
  const location= useLocation()

  const handleSubmit = () =>{
    navigate("/Questions" )
  } 
  

  
  return (
    <>
      <Question_nav />
      <section className="result_details">
        <div className="result">
          <div className="result_number result_content">
            <span>{location.state.Score}</span>
            <div className="result_img">
              <img src={Frame} alt="" />
            </div>
          </div>
          <div className="result_content">
            <h2 className="text">Congratulations</h2>
            <span>You Score {location.state.Score} out of {location.state.Question_number}</span>
            <div className="correct_wrong">
              <div className="correct_context">
                <img src={Tick} alt="" />
                <span>{location.state.Score} Correct</span>
              </div>
              <div className="wrong_context">
                <img src={Cross} alt="" />
                {/* <span>{location.state.Wrong_sc - location.state.Score}  Incorrect</span> */}
                <span>{location.state.Question_number - location.state.Score}  Incorrect</span>
              </div>
            </div>
          </div>
          <div className="dashboard_btn">
            <button onClick={handleSubmit}>Dashboard</button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Result;


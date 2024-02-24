import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink , useNavigate } from "react-router-dom";
import Question_nav from "./Question_nav";
import "../Assets/css/Question.css";
import NavigateBeforeTwoToneIcon from "@mui/icons-material/NavigateBeforeTwoTone";
import 'react-toastify/dist/ReactToastify.css';

function Python() {
  const [MCQs, setMCQs] = useState([]);
  const [choice, setChoice] = useState([]);
  const [locks, setLocks] = useState(false); // Manage locks for each question
  const [score, setScore] = useState(0)
  const [wrong , setWrong] = useState(0)
  const navigate = useNavigate()
  const letterMapping = ["A", "B", "C", "D"]

  useEffect(() => {
    async function getallquestions() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/questions/?language=1"
        );
        setMCQs(response.data);
      } catch (error) {}
    }
    getallquestions();
  }, []);

  useEffect(() => {
    async function getallchoice() {
      try {
        const choiceresponse = await axios.get("http://127.0.0.1:8000/api/choice");
        setChoice(choiceresponse.data);
      } catch (error) {
        console.log(error);
      }
    }
    getallchoice();
  }, []);

  const checkAns = (options, choiceItem, questionId) => {
    if (!locks[questionId]) {
      const isCorrect = choiceItem.is_correct;
      if (isCorrect) {
        options.target.classList.add("correct");
        setScore(prev=>prev+1)
      } else {
        options.target.classList.add("wrong");
        setWrong(wrong_ans=>wrong_ans+1)
      }
      const updatedLocks = { ...locks, [choiceItem]: true };
      console.log('update lock',updatedLocks)
      console.log('isCorrect',isCorrect)
      setLocks(updatedLocks);
    }
  };
 
  const handleSubmit = () =>{
    // toast(`Your Score: ${score} out of ${MCQs.length}`);
    navigate("/Result",{state : {Score : `${score}` , Wrong_sc : `${wrong}` , Question_number: `${MCQs.length}`}} )
  } 


  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 5;

  return (
    <>
      <Question_nav />
      <section className="top_header">
        <NavLink className="main_page" to="/Questions">
          <div className="main_page common">
            <span>
              <NavigateBeforeTwoToneIcon />
            </span>
            <p>Back to all Questions</p>
          </div>
        </NavLink>
        <div className="language_name">
          <h3>Python Questions</h3>
          <p>
            Test, rate and improve your Python knowledge with these questions.
          </p>
        </div>
      </section>

      <section className="questions_bank">
        <div className="questions_list">
          {MCQs.length > 0 &&
            MCQs.map((MCQ, index) => (
              <div className="question_one" key={index}>
                <div className="question_number">
                  <span> {index + 1 } </span>
                </div>
                <div className="mcq_content">
                  <div className="question_title">
                    <h3>{MCQ.text}</h3>
                  </div>
                  <div className="answers_option">
                    <ul>
                      {choice.filter(item => item.question === MCQ.id).map((choiceItem, choiceIndex) => (
                          <>
                          <div className="opt">

                          <span >
                          {letterMapping[choiceIndex]}
                          </span>
                          <li key={choiceIndex} onClick={options => checkAns(options, choiceItem, MCQ.id)}>
                            {choiceItem.text}
                          </li>
                          </div>
                          </>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="pagination">
          <button>
            Prev
          </button>
          <button>
            Next
          </button>
          <button className="submit_btn" onClick={handleSubmit}>Submit</button>
        </div>
      </section>
    </>
  );
}

export default Python;







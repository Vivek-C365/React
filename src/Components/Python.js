import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import Question_nav from "./Question_nav";
import "../Assets/css/Question.css";
import NavigateBeforeTwoToneIcon from "@mui/icons-material/NavigateBeforeTwoTone";

function Python() {
  const [MCQs, setMCQs] = useState([]);
  const [choice, setChoice] = useState([]);
  const [score, setScore] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 5; // Number of questions to display per page
  const navigate = useNavigate();
  const letterMapping = ["A", "B", "C", "D"];
  // Logic to paginate questions
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = MCQs.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );

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
        const choiceresponse = await axios.get(
          "http://127.0.0.1:8000/api/choice"
        );
        setChoice(choiceresponse.data);
      } catch (error) {
        console.log(error);
      }
    }
    getallchoice();
  }, []);

  //////////////////////////////////////////////////////////

  // Initialize an object to keep track of selected options for each question
  const selectedOptions = {};
  const correctCountsArray = [0]; // Array to store correct count values
 
  const checkAns = (options, choiceItem, questionId) => {
    const isCorrect = choiceItem.is_correct;
    // console.log("Is correct? ", isCorrect);

    // Check if the user has already answered this question
    if (selectedOptions[questionId]) {
      // If yes, remove the previously selected option's classes
      selectedOptions[questionId].target.classList.remove("correct", "wrong");
    }

    // Store the current selection for this question
    selectedOptions[questionId] = options;

    // Apply appropriate classes based on correctness
    if (isCorrect) {
      options.target.classList.add("correct");
    } else {
      options.target.classList.add("wrong");
    }

    const cor_option = document.querySelectorAll(".opt li");

    // Initialize count for correct answers
    let correctCount = score;

    // Loop through each li element
    cor_option.forEach((option) => {
      // Check if the li element has the "correct" class
      if (option.classList.contains("correct")) {
        // Increment the count if it's correct
        correctCount++;
      }
    });
    // Push the correctCount value into the array
    correctCountsArray[correctCountsArray.length - 1] = correctCount;
    console.log(correctCountsArray);
    // console.log(correctCountsArray[correctCountsArray.length-1]);
  };

  //////////////////////////////////////////////////

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    const sum =correctCountsArray.reduce((previousValue, currentValue) => previousValue + currentValue, 0)
    setScore(sum)
    console.log(sum)
    const options = document.querySelectorAll(".opt li");
    options.forEach((option) => {
      option.classList.remove("correct", "wrong");
    });
  };

  const handleSubmit = () => {
    // Additionally, you can navigate to the result page or perform any other action here
    navigate("/Result", {
      state: {
        Score: `${correctCountsArray}`,
        Question_number: `${MCQs.length}`,
      },
    });
  };

  return (
    <>
      <Question_nav />
      <section className="python_content">
        <section className="top_header">
          <div className="question_link">
            <NavLink className="main_page" to="/Questions">
              <div className="main_page common">
                <span>
                  <NavigateBeforeTwoToneIcon />
                </span>
                <p>Back to all Questions</p>
              </div>
            </NavLink>
          </div>
          <div className="instructions_content">
            <h5>Instructions</h5>
            <ol type="1">
              <li>Select one answer from the given choices.</li>
              <li>You can select only one option at a time.</li>
              <li>
                Once you have submitted your answer, you cannot change it.
              </li>
            </ol>
          </div>
        </section>

        <section className="questions_bank">
          <div className="language_name">
            <h3>Python Questions</h3>
            <p>
              Test, rate and improve your Python knowledge with these questions.
            </p>
          </div>
          <div className="questions_list">
            {currentQuestions.map((MCQ, index) => (
              <div className="question_one" key={index}>
                <div className="question_number">
                  <span>
                    {" "}
                    {index + 1 + (currentPage - 1) * questionsPerPage}{" "}
                  </span>
                </div>
                <div className="mcq_content">
                  <div className="question_title">
                    <h3>{MCQ.text}</h3>
                  </div>
                  <div className="answers_option">
                    <ul>
                      {choice
                        .filter((item) => item.question === MCQ.id)
                        .map((choiceItem, choiceIndex) => (
                          <>
                            <div className="opt">
                              <span>{letterMapping[choiceIndex]}</span>
                              <li
                                key={choiceIndex}
                                onClick={(options) =>
                                  checkAns(options, choiceItem, MCQ.id)
                                }
                              >
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
          {/* Pagination */}
          <div className="pagination">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={
                currentPage === Math.ceil(MCQs.length / questionsPerPage)
              }
            >
              Next
            </button>
            <button className="submit_btn" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </section>
      </section>
    </>
  );
}

export default Python;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useNavigate , useLocation } from "react-router-dom";
import QuestionNav from "./Question_nav";
import "../Assets/css/Question.css";
import NavigateBeforeTwoToneIcon from "@mui/icons-material/NavigateBeforeTwoTone";
import Button from "@mui/material/Button";

function Python() {
  const [MCQs, setMCQs] = useState([]);
  const [choice, setChoice] = useState([]);
  const [score, setScore] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const questionsPerPage = 5; // Number of questions to display per page
  const navigate = useNavigate();
  const location= useLocation()
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
          `http://127.0.0.1:8000/api/questions/?language=${location.state.languageId}`
        );
        setMCQs(response.data);
        console.log(response.data.length)
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    }
    getallquestions();
  }, [location.state.languageId]);

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
  const choice_value = {};

  const checkAns = (options, choiceItem, questionId) => {
    const isCorrect = choiceItem.is_correct;

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

    let cor_option = document.querySelectorAll(".opt li");

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

    choice_value[questionId] = {
      option: options.target.textContent,
      isCorrect: isCorrect,
    };

    console.log(choice_value);
  };

  //////////////////////////////////////////////////

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    const sum = correctCountsArray.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      0
    );
    setScore(sum);
    console.log(sum);

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
      <QuestionNav />
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
              <li>
                You'll be presented with 5 question at a time. Read each
                question carefully.
              </li>
              <li>
                Select your answer by tapping/clicking on one of the provided
                options.
              </li>
              <li>You can select only one option at a time.</li>
              <li>
                After answering all 5 questions, You wont able to go back and
                change the selected option{" "}
              </li>
              <li>Finally, submit your responses to see how you've done!</li>
            </ol>
          </div>
        </section>

        <section className="questions_bank">
          <div className="language_name">
            <h3>{location.state.languageName} Questions</h3>
            <p>
              Test, rate and improve your {location.state.languageName} knowledge with these questions.
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
            <Button className="next_btn" variant="contained" color="error" onClick={() => paginate(currentPage + 1)}
              disabled={
                currentPage === Math.ceil(MCQs.length / questionsPerPage)
              }>
              Next
            </Button>
            <Button className="submit_btn" variant="contained" color="success" onClick={handleSubmit}>
            Submit
            </Button>
          </div>
        </section>
      </section>
    </>
  );
}

export default Python;

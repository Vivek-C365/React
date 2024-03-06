import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import AdminNav from "./Admin_nav";
import AdminProfile from "./Admin_profile";

function Add_question() {
  const location = useLocation();
  const [add_question, setAdd_question] = useState("");
  const [choices, setChoices] = useState([
    { text: "", is_correct: false },
    { text: "", is_correct: false },
    { text: "", is_correct: false },
    { text: "", is_correct: false },
  ]);

  const AddQuestion = async () => {
    try {
      const data = {
        text: add_question,
        language: location.state.languageId,
      };

      const response = await axios.post(
        "http://127.0.0.1:8000/api/add_question/",
        data
      );
      console.log(response.data);

      // Assuming response.data includes the ID of the newly added question
      const questionId = response.data.id;

      try {
        const choicePromises = choices.map((choice) => {
          return axios.post("http://127.0.0.1:8000/api/add_choice/", {
            text: choice.text,
            is_correct: choice.is_correct,
            question: questionId,
          });
        });

        await Promise.all(choicePromises);

        // Reset the state after successfully adding the question
        setAdd_question("");
        setChoices([
          { text: "", is_correct: false },
          { text: "", is_correct: false },
          { text: "", is_correct: false },
          { text: "", is_correct: false },
        ]);

        alert(`A new question with id ${questionId} has been created.`);
      } catch (error) {
        console.error("Error adding choices:", error);
      }
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  const handleChoiceChange = (index, value) => {
    const newChoices = [...choices];
    newChoices[index].text = value;
    setChoices(newChoices);
  };

  const handleCorrectChange = (index) => {
    const newChoices = [...choices];
    newChoices.forEach((choice, i) => {
      newChoices[i].is_correct = i === index;
    });
    setChoices(newChoices);
  };

  return (
    <>
      <section className="wrapper">
        <AdminNav />
        <section className="main_content">
          <AdminProfile />
          <section className="add_question_content">
            <div className="Tab_heading">
              <h1>Create a New Question</h1>
            </div>
            <div className="topic_heading question_common">
              <h2>Topic</h2>
              <input
                type="text"
                name="language"
                id="language"
                value={location.state.languageName}
                disabled
              />
            </div>
            <div className="add_question_field question_common">
              <h2>Question</h2>
              <input
                placeholder="Enter Question Here..."
                type="text"
                name="text"
                id="text"
                value={add_question}
                onChange={(e) => setAdd_question(e.target.value)}
              />
            </div>
            <div className="options_container question_common">
              <div className="top_container">
                <h2>Enter the options</h2>
                <h4>Mark the correct options</h4>
              </div>
              <div className="options_submission">
                <div className="enter_options">
                  {choices.map((choice, index) => (
                    <div className="options_fields" key={index}>
                      <div>
                        <label htmlFor={`option_${index + 1}`}>
                          Option {index + 1}
                        </label>
                        <div className="input_field">
                          <input
                            type="radio"
                            checked={choice.is_correct}
                            onChange={() => handleCorrectChange(index)}
                          />
                          <input
                            placeholder="Enter Option..."
                            type="text"
                            value={choice.text}
                            onChange={(e) =>
                              handleChoiceChange(index, e.target.value)
                            }
                            name={`option_${index + 1}`}
                            id={`option_${index + 1}`}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="create_btn">
                  <button type="submit" onClick={AddQuestion}>
                    Create
                  </button>
                </div>
              </div>
            </div>
          </section>
        </section>
      </section>
    </>
  );
}

export default Add_question;

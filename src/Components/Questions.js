import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Question_nav from './Question_nav';
import '../Assets/css/Question.css';
import { NavLink } from "react-router-dom";

function Questions() {
    const [language, setLanguage] = useState([]); // array of languages

    useEffect(() => {
        async function getallLanguage() {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/language/");
                // console.log(response.data);
                setLanguage(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        getallLanguage();
    }, []);

    return (
        <>
            <Question_nav />
            <section className="Questions_Heading">
                <div className="Heading_bar">
                    <h1>Questions</h1>
                </div>
                <div className="secondary_heading">
                    <p>Quizzes to help you test and improve your knowledge and skill up</p>
                </div>
            </section>
            <section className="Question_content">
                {language.length > 0 &&
                    language.map((languages, id) => (
                        <NavLink className="language_card" to={`/${languages.name}`}  key={id}>
                            <h5>{languages.name} Questions</h5>
                            <span>75 Questions</span>
                        </NavLink>
                    ))}
            </section>
        </>
    );
}

export default Questions;

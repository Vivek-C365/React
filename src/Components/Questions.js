import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuestionNav from './Question_nav';
import '../Assets/css/Question.css';
import { useNavigate } from "react-router-dom";

function Questions() {
    const [languages, setLanguages] = useState([]); // array of languages
    const navigate = useNavigate();

    useEffect(() => {
        async function getAllLanguages() {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/language/");
                setLanguages(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        getAllLanguages();
    }, []);

    const handleLanguageClick = (language) => {
        navigate(`/Quiz`, {
            state: {
                languageName: language.name,
                languageId: language.id,
            },
        });
    };

    return (
        <>
            <QuestionNav />
            <section className="Questions_Heading">
                <div className="Heading_bar">
                    <h1>Questions</h1>
                </div>
                <div className="secondary_heading">
                    <p>Quizzes to help you test and improve your knowledge and skill up</p>
                </div>
            </section>
            <section className="Question_content">
                {languages.length > 0 &&
                    languages.map((language, id) => (
                        <div className="language_card" key={id} onClick={() => handleLanguageClick(language)}>
                            <h5>{language.name} Questions</h5>
                            <span>75 Questions</span>
                        </div>
                    ))}
            </section>
        </>
    );
}

export default Questions;

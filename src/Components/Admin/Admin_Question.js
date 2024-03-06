import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminNav from "./Admin_nav";
import AdminProfile from "./Admin_profile";
import Python_img from "../../Assets/images/Admin/python.png";

function Admin_Question() {
  const [language, setLanguage] = useState([]); // array of languages
  const navigate = useNavigate();

  //   Display all Languages
  useEffect(() => {
    async function getallLanguage() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/language/");
        setLanguage(response.data);
      } catch (error) {}
    }
    getallLanguage();
  }, []);

  const handleLanguageClick = (language) => {
    navigate(`/Admin/Add_Questions`, {
      state: {
        languageName: language.name,
        languageId: language.id,
      },
    });
  };
  const handleEditquestion = (language) => {
    navigate(`/Admin/Edit_Quesitons`, {
      state: {
        languageName: language.name,
        languageId: language.id,
      },
    });
  };

  return (
    <>
      <section className="wrapper">
        <AdminNav />
        <section className="main_content">
          <AdminProfile />

          <div className="admin-question">
            <div className="Subject_title">
              <h1>Subjects</h1>
            </div>
            <section className="add_questions_cards">
              {language.length > 0 &&
                language.map((languages, index) => (
                  <>
                    <div className="subject_card" key={index}>
                      <div className="subject_img">
                        <img src={Python_img} alt="" />
                      </div>
                      <div className="subject_card_content">
                        <div className="card_title">
                          <h4>{languages.name} Programming</h4>
                        </div>
                        <div className="card_secondary_title">
                          <p>
                            Learn high-level programming languages like Python
                          </p>
                        </div>
                        <div className="add_question_btn">
                          <button
                            onClick={() => handleLanguageClick(languages)}
                          >
                            Add Questions
                          </button>

                          <button onClick={() => handleEditquestion(languages)}>
                            Edit Questions
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
            </section>
          </div>
        </section>
      </section>
    </>
  );
}

export default Admin_Question;

import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNav from "./Admin_nav";
import AdminProfile from "./Admin_profile";
import Table from "react-bootstrap/Table";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';

function Admin_langugae() {
  const [language, setLanguage] = useState([]); // array of languages

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

//  Delete Languages

const handleDelete = async (languageId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/language/${languageId}`);
      setLanguage(language.filter(language => language.id !== languageId));
    } catch (error) {
      console.error("Error deleting language:", error);
    }
  };

  return (
    <>
      <section className="wrapper">
        <AdminNav />
        <section className="main_content">
          <AdminProfile />
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Sr No.</th>
                <th>Language Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {language.length > 0 &&
                language.map((languages, index) => (
                  <>
                    <tr key={index}>
                      {/* <li key={index}>{languages.name}</li> */}
                      <td>{index + 1}</td>
                      <td>{languages.name}</td>
                      <td>
                        <Fab size="small" color="success" aria-label="edit">
                          <EditIcon />
                        </Fab>
                        <Fab
                          size="small"
                          color="error"
                          aria-label="delete"
                          onClick={() => handleDelete(languages.id)}
                        >
                          <DeleteIcon />
                        </Fab>
                      </td>
                    </tr>
                  </>
                ))}
            </tbody>
          </Table>
        </section>
      </section>
    </>
  );
}

export default Admin_langugae;

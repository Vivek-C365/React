import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNav from "./Admin_nav";
import AdminProfile from "./Admin_profile";
import Table from "react-bootstrap/Table";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";

function Admin_langugae() {
  const [language, setLanguage] = useState([]); // array of languages
  const [editingLanguage, setEditingLanguage] = useState(null);
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
      await axios.delete(
        `http://127.0.0.1:8000/api/languages/${languageId}/delete/`
      );
      setLanguage(language.filter((language) => language.id !== languageId));
    } catch (error) {
      console.error("Error deleting language:", error);
    }
  };

  //  Update Languages
  const handleEdit = (languageId) => {
    const langToEdit = language.find((lang) => lang.id === languageId);
    setEditingLanguage(langToEdit);
  };

  const handleCancelEdit = () => {
    setEditingLanguage(null);
  };

  const handleSaveEdit = async (editedLanguage) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/languages/${editedLanguage.id}/update/`,
        editedLanguage
      );
      console.log(response.data);
      setLanguage(
        language.map((lang) =>
          lang.id === editedLanguage.id ? editedLanguage : lang
        )
      );
      setEditingLanguage(null);
    } catch (error) {
      console.error("Error updating language:", error);
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
              {language.map((lang, index) => (
                <tr key={lang.id}>
                  <td>{index + 1}</td>
                  <td>
                    {editingLanguage && editingLanguage.id === lang.id ? (
                      <input
                        className="update_language_field"
                        type="text"
                        value={editingLanguage.name}
                        onChange={(e) =>
                          setEditingLanguage({
                            ...editingLanguage,
                            name: e.target.value,
                          })
                        }
                      />
                    ) : (
                      lang.name
                    )}
                  </td>
                  <td>
                    {editingLanguage && editingLanguage.id === lang.id ? (
                      <>
                        <Button
                          onClick={() => handleSaveEdit(editingLanguage)}
                          variant="contained"
                          color="success"
                        >
                          Save
                        </Button>
                        <Button onClick={handleCancelEdit}variant="outlined" color="error">
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Fab
                          size="small"
                          color="success"
                          aria-label="edit"
                          className="float-right ml-2"
                          onClick={() => handleEdit(lang.id)}
                        >
                          <EditIcon />
                        </Fab>
                        <Fab
                          size="small"
                          color="error"
                          aria-label="delete"
                          onClick={() => handleDelete(lang.id)}
                        >
                          <DeleteIcon />
                        </Fab>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </section>
      </section>
    </>
  );
}

export default Admin_langugae;

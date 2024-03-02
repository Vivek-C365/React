import React, { useState, useEffect } from "react";
import axios from "axios";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Admin_nav from "./Admin_nav";
import Admin_profile from "./Admin_profile";
import Coding_black from "../../Assets/images/Admin/Coding_black.png";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Admin_dashboard() {
  const [language, setLanguage] = useState([]); // array of languages
  const [open, setOpen] = useState(false);
  const [add_language, setAdd_language] = useState("");
  const [alert, setAlert] = useState({ severity: "", message: "" });

  useEffect(() => {
    async function getallLanguage() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/language/");
        setLanguage(response.data);
      } catch (error) {
      }
    }
    getallLanguage();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setAlert({ severity: "", message: "" }); // Reset alert when modal is closed
  };

  const AddLanguage = async () => {
    if (add_language === "") {
        setAlert({ severity: "error", message: "Language name cannot be empty" });
        return;
    }

    try {
        // Check if the language already exists
        const checkResponse = await axios.get("http://127.0.0.1:8000/api/language/");
        
        // Compare each language name with the new language to be added
        const languageExists = checkResponse.data.some(language => language.name === add_language);
        
        if (languageExists) {
            setAlert({ severity: "warning", message: "Language already exists" });
            return;
        }
        
        // If language does not exist, proceed to add it
        const formField = new FormData();
        formField.append("name", add_language);
        
        await axios.post(
            "http://127.0.0.1:8000/api/createlanguage/",
            formField
        );

        setAdd_language("");
        setOpen(false);
        
        const updatedResponse = await axios.get(
            "http://127.0.0.1:8000/api/language/"
        );
        
        setLanguage(updatedResponse.data);
        setAlert({ severity: "success", message: "Language added successfully" });
    } catch (error) {
        setAlert({ severity: "error", message: "Failed to add language" });
    }

    // Close the alert automatically after 3 seconds
    setTimeout(() => {
      setAlert({ severity: "", message: "" });
    }, 3000);
  };

  return (
    <>
      <section className="wrapper">
        <Admin_nav />
        <section className="main_content">
          <Admin_profile />

          <section className="overview_content">
            <div className="stats_card">
              {alert.message && (
                <Alert severity={alert.severity}>{alert.message}</Alert>
              )}

              <div className="dashboard_title">
                <div className="head_content">
                  <div className="head_img">
                    <img src={Coding_black} alt="logo" />
                  </div>
                  <div className="heading">
                    <span>Languages</span>
                  </div>
                </div>
                <Fab
                  onClick={handleOpen}
                  size="small"
                  color="error"
                  aria-label="add"
                >
                  <AddIcon />
                </Fab>

                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  open={open}
                  onClose={handleClose}
                  closeAfterTransition
                  slots={{ backdrop: Backdrop }}
                  slotProps={{
                    backdrop: {
                      timeout: 500,
                    },
                  }}
                >
                  <Fade in={open}>
                    <Box sx={style}>
                      <TextField
                        id="filled-basic"
                        label="Add Language"
                        variant="filled"
                        name="add_language"
                        value={add_language}
                        onChange={(e) => setAdd_language(e.target.value)}
                      />
                      <Button
                        onClick={AddLanguage}
                        variant="contained"
                        color="success"
                        endIcon={<SendIcon />}
                      >
                        Add
                      </Button>
                    </Box>
                  </Fade>
                </Modal>
              </div>
              <div className="language_stats">
                <div className="language_stats_card">
                  <ol type="1">
                    {language.length > 0 &&
                      language.map((languages, index) => (
                        <li key={index}>{languages.name}</li>
                      ))}
                  </ol>
                </div>
              </div>
            </div>
          </section>
        </section>
      </section>
    </>
  );
}

export default Admin_dashboard;




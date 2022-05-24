import React, { useContext, useState, useEffect } from "react";
import axios from "../../../config/axios";
import AppContext from "../../../context/AppContext";
import { ThemeProvider } from "@mui/material/styles";
import { Button, Modal, Typography, Box } from "@mui/material";
import { theme, CssTextField } from "../../../config/theme";
import "./preferences.css";

const style = {
  position: "absolute",
  gap: 2,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Preferences = () => {
  const state = useContext(AppContext);
  const [fileName, setFileName] = useState(null);
  const [fieldFileName, setFieldFileName] = useState("");
  const [openExport, setOpenExport] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleOpenExport = () => setOpenExport(true);
  const handleCloseExport = () => {
    setOpenExport(false);
    if (fieldFileName === "") {
      setFileName("DiagramDesign");
    } else {
      setFileName(fieldFileName);
    }
    state.setSelectedDevice(null);
    setSuccess(true);
  };
  const handleCloseExport2 = () => setOpenExport(false);

  const handleCloseSuccess = () => setSuccess(false);

  useEffect(() => {
    if (fileName !== "" && fileName !== null) {
      axios.get(`/api/export/${fileName}`);
      setFieldFileName("");
      setFileName("");
    }
  }, [fileName]);

  return (
    <ThemeProvider theme={theme}>
      <div className="prefContainer">
        <div className="prefItems">
          <Button
            id="btnFile"
            size="small"
            variant="contained"
            color="primary"
            onClick={handleOpenExport}
          >
            Export
          </Button>
        </div>
        <div>
          <Modal
            open={openExport}
            onClose={handleCloseExport2}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={style}
              display="flex"
              flex-direction="column"
              alignItems="center"
            >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Name the file
              </Typography>
              <CssTextField
                value={fieldFileName}
                onChange={(event) => {
                  setFieldFileName(event.target.value);
                }}
              />
              <div>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={handleCloseExport}
                >
                  Done!
                </Button>
              </div>
            </Box>
          </Modal>
        </div>
        <div>
          <Modal
            open={success}
            onClose={handleCloseSuccess}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={style}
              display="flex"
              flex-direction="column"
              alignItems="center"
            >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Export Succesful!
              </Typography>
            </Box>
          </Modal>
        </div>
        <div className="prefItems">
          <Button
            id="btnOptions"
            size="small"
            variant="contained"
            color="primary"
            onClick={state.testStuff()}
          >
            Load
          </Button>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Preferences;

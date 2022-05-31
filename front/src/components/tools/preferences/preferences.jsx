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

  const [loadedFile, setLoadedFile] = useState(null);

  const [openExport, setOpenExport] = useState(false);
  const [success, setSuccess] = useState(false);
  const [openHelp, setOpenHelp] = useState(false);
  const [startOver, setStartOver] = useState(false);
  const [loadFile, setLoadFile] = useState(false);
  const [openError, setOpenError] = useState(false);

  const [bigError, setBigError] = useState(false);

  const handleOpenExport = () => {
    state.setSelectedDevice(null);
    setOpenExport(true);
  };
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
  const handleCloseExport2 = () => {
    setFieldFileName("");
    setOpenExport(false);
  };

  const handleCloseSuccess = () => setSuccess(false);
  const handleOpenHelp = () => setOpenHelp(true);
  const handleCloseHelp = () => setOpenHelp(false);
  const handleOpenStartOver = () => {
    state.setSelectedDevice(null);
    setStartOver(true);
  };
  const handleCloseStartOver = () => {
    setStartOver(false);
    state.startOver();
  };
  const handleCloseStartOver2 = () => setStartOver(false);

  const handleCloseLoadFile = () => setLoadFile(false);
  const handleOpenLoadFile = () => {
    state.setSelectedDevice(null);
    setLoadFile(true);
  };
  const handleOpenError = () => setOpenError(true);
  const handleCloseError = () => setOpenError(false);

  const handleFile = (e) => {
    setLoadedFile(e.target.files[0]);
  };

  const handleUpload = (e) => {
    if (loadedFile !== null) {
      let formData = new FormData();
      formData.append("file", loadedFile);
      state.loadFromDB(formData);
      handleCloseLoadFile();
    } else {
      handleOpenError();
      handleCloseLoadFile();
    }
  };

  const exportFileAxios = async (fileName) => {
    await axios.get(`/api/general/export/${fileName}`);
  };

  useEffect(() => {
    if (fileName !== "" && fileName !== null) {
      exportFileAxios(fileName);
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
              <Typography id="modal-modal-title" variant="h6" component="h2">
                In the backend of this project you can find the file. The route
                is back/src/data
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
            onClick={handleOpenLoadFile}
          >
            Load
          </Button>
        </div>

        <div>
          <Modal
            open={loadFile}
            onClose={handleCloseLoadFile}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Select the file
              </Typography>
              <form>
                <input
                  type="file"
                  name="file"
                  onChange={(e) => handleFile(e)}
                />
                <br />
                <button type="button" onClick={(e) => handleUpload(e)}>
                  Upload
                </button>
              </form>
            </Box>
          </Modal>
        </div>
        <div>
          <Modal
            open={openError}
            onClose={handleCloseError}
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
                You must select a file to upload!
              </Typography>
            </Box>
          </Modal>
        </div>

        <div className="prefItems">
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={handleOpenHelp}
          >
            Help
          </Button>
        </div>

        <div>
          <Modal
            open={openHelp}
            onClose={handleCloseHelp}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                User guide
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                - To use the tool and draw the topology, you must select one of
                the devices located at the top and drag it anywhere on the
                screen where you want to place it.
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                - To edit the device values, you must click the device you want
                to configure, then you will see a panel with the device
                configuration, when you finish making changes click on save
                changes otherwise the changes will not be saved.
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                - To create links click once on the device you are starting
                from, then hold and drag on one of the dots to the device you
                want to connect. Remember that it is not possible to connect
                controller to host directly!
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                - And Remember, you can drag the devices once they are on the
                canvas to organize your design
              </Typography>
            </Box>
          </Modal>
        </div>

        <div className="prefItems">
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={handleOpenStartOver}
          >
            Start Again?
          </Button>
        </div>

        <div>
          <Modal
            open={startOver}
            onClose={handleCloseStartOver2}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={style}
              display="flex"
              flex-direction="column"
              alignItems="center"
            >
              <div>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  All your work would be lost, are you sure you want to start
                  from scratch?
                </Typography>
              </div>
              <div>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={handleCloseStartOver}
                >
                  Yes I am sure!
                </Button>
              </div>
            </Box>
          </Modal>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Preferences;

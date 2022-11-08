import React, { useContext, useState, useEffect } from "react";
import AppContext from "../../../context/AppContext";
import { ThemeProvider } from "@mui/material/styles";
import { Button, Modal, Typography, Box, Menu, MenuItem } from "@mui/material";
import { theme, CssTextField } from "../../../config/theme";
import "./preferences.css";

/**
 * Component that displays the preferences of the application
 * @returns The preferences component
 */
const Preferences = () => {
  const state = useContext(AppContext);

  //open menu list
  const [menuOpen, setMenuOpen] = useState(false);
  const handleFileMenuOpen = () => {
    setMenuOpen(true);
  };
  const handleFileMenuClose = () => {
    setMenuOpen(false);
  };

  //load file modal
  const [loadedFile, setLoadedFile] = useState(null);
  const [loadFile, setLoadFile] = useState(false);
  const [openError, setOpenError] = useState(false);
  const handleOpenLoadFile = () => {
    state.setSelectedDevice(null);
    setLoadFile(true);
  };
  const handleCloseLoadFile = () => setLoadFile(false);
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
  const handleOpenError = () => setOpenError(true);
  const handleCloseError = () => setOpenError(false);

  //save file modal
  const [fieldFileName, setFieldFileName] = useState("");
  const [openSaveFile, setOpenSaveFile] = useState(false);
  const handleOpenSaveFile = () => {
    state.setSelectedDevice(null);
    if (state.saveLocation.length > 0) {
      state.saveFile(state.saveLocation);
    } else {
      setOpenSaveFile(true);
    }
  };
  const handleCloseSaveFile = () => {
    setOpenSaveFile(false);

    //check if the location to save exists
    const location = state.saveLocation;
    if (location === "") {
      if (fieldFileName === "") {
        const defaultLocation = "unnamed";
        state.setSaveLocation(defaultLocation);
        state.saveFile(defaultLocation);
      } else {
        state.setSaveLocation(fieldFileName);
        state.saveFile(fieldFileName);
      }
    }
    state.setSelectedDevice(null);
    setSuccess(true);
  };
  const handleCloseSaveFile2 = () => {
    setFieldFileName("");
    setOpenSaveFile(false);
  };
  useEffect(() => {
    setFieldFileName("");
  }, [state?.saveLocation]);

  //success modal
  const [success, setSuccess] = useState(false);
  const handleCloseSuccess = () => setSuccess(false);

  //help modal
  const [openHelp, setOpenHelp] = useState(true);
  const handleOpenHelp = () => setOpenHelp(true);
  const handleCloseHelp = () => setOpenHelp(false);

  //new modal
  const [startOver, setStartOver] = useState(false);
  const handleOpenStartOver = () => {
    state.setSelectedDevice(null);
    setStartOver(true);
  };
  const handleCloseStartOver = () => {
    setStartOver(false);
    state.startOver();
  };
  const handleCloseStartOver2 = () => setStartOver(false);

  //run modal
  const [runSuccessModal, setRunSuccessModal] = useState(false);
  const handleOpenRunSuccessModal = () => {
    setRunSuccessModal(true);
  };
  const handleCloseRunSuccessModal = () => {
    setRunSuccessModal(false);
  };
  const [runFailModal, setRunFailModal] = useState(false);
  const handleOpenRunFailModal = () => {
    setRunFailModal(true);
  };
  const handleCloseRunFailModal = () => {
    setRunFailModal(false);
  };
  const handleRunFailModalButton = () => {
    handleCloseRunFailModal();
    handleOpenSaveFile();
  };
  const handleRun = () => {
    const saveLocation = state.saveLocation;
    if (saveLocation.length > 0) {
      handleOpenSaveFile();
      handleOpenRunSuccessModal();
      state.runMininet();
    } else {
      handleOpenRunFailModal();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="prefContainer">
        <div>
          <div>
            <Button id="btn-file" onClick={handleFileMenuOpen}>
              File
            </Button>
          </div>
          <div>
            <Menu
              anchorEl={menuOpen}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(menuOpen)}
              onClose={handleFileMenuClose}
            >
              <MenuItem onClick={handleFileMenuClose}>
                <Button id="btn-new" onClick={handleOpenStartOver}>
                  new
                </Button>
              </MenuItem>
              <MenuItem onClick={handleFileMenuClose}>
                <Button id="btn-open" onClick={handleOpenLoadFile}>
                  open
                </Button>
              </MenuItem>
              <MenuItem onClick={handleFileMenuClose}>
                <Button id="btn-save" onClick={handleOpenSaveFile}>
                  save
                </Button>
              </MenuItem>
              <MenuItem onClick={handleFileMenuClose}>
                <Button id="btn-run" onClick={handleRun}>
                  run
                </Button>
              </MenuItem>
            </Menu>
          </div>
        </div>
        <div>
          <Button id="btn-help" onClick={handleOpenHelp}>
            Help
          </Button>
        </div>

        {/**Modals */}
        <div>
          <Modal
            open={openSaveFile}
            onClose={handleCloseSaveFile2}
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
                  onClick={handleCloseSaveFile}
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
                File Successfully saved!
              </Typography>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                You can find your files in:
              </Typography>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                /home/mininet/Documents/VND
              </Typography>
            </Box>
          </Modal>
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
        <div>
          <Modal
            open={openHelp}
            onClose={handleCloseHelp}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography
                className="help-title"
                id="modal-modal-title"
                variant="h6"
                component="h2"
              >
                User guide
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                - To use the tool and draw the topology, you must select one of
                the devices located at the top and drag it anywhere on the
                screen where you want to place it.
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                - To edit the device values, you must click the device you want
                to configure, the menu will always appear down the toolbar. When
                you finish making changes click on save changes otherwise the
                changes will not be saved.
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                - To close the configuration window without changing or saving
                values you must click again on the same device or click another
                device to configure.
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                - To create links click on a switch once, then click and hold an
                anchor and start moving your mouse to the device that you want
                to connect.
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                And Remember, you can drag the devices once they are on the
                canvas to organize your design.
              </Typography>
            </Box>
          </Modal>
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
        <div>
          <Modal
            open={runSuccessModal}
            onClose={handleCloseRunSuccessModal}
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
                  Your topology will now run on a terminal
                </Typography>
              </div>
            </Box>
          </Modal>
        </div>
        <div>
          <Modal
            open={runFailModal}
            onClose={handleCloseRunFailModal}
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
                  First save your work and try again
                </Typography>
              </div>
              <div>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={handleRunFailModalButton}
                >
                  Okay!
                </Button>
              </div>
            </Box>
          </Modal>
        </div>
      </div>
    </ThemeProvider>
  );
};

/**
 * Preference's modal style
 */
const style = {
  position: "absolute",
  gap: 2,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default Preferences;

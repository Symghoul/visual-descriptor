import React, { useContext, useState, useRef } from "react";
import AppContext from "../../../context/AppContext";
import axios from "../../../config/axios";
import {
  InitName,
  InitMac,
  InitPort,
  InitProtocol,
} from "./initialDeviceValues";
import { ThemeProvider } from "@mui/material/styles";
import { theme, CssTextField } from "../../../config/theme";
import { Button, Box, Typography, Modal } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { number, object, string } from "yup";
import "./switchConfig.css";

//Style of the fields
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

const styledbutton = {
  top: 10,
};

/**
 * This is the form used to update and display the information of a switch
 * @returns The switch form component
 */
const SwitchConfig = () => {
  const state = useContext(AppContext);

  const initialValues = {
    name: InitName(),
    mac: InitMac(),
    port: InitPort(),
    protocol: InitProtocol(),
  };

  const [errorUpdate, setErrorUpdate] = useState(false);
  const errorMessage = useRef("");

  /**
   * Advanced Settings
   */
  const [advancedSettings, setAdvancedSettings] = useState("hidden");
  const unlock = () => {
    if (advancedSettings === "hidden") {
      setAdvancedSettings("text");
    } else {
      setAdvancedSettings("hidden");
    }
  };
  const [advanceSettingMessage, setAdvanceSettingMessage] = useState(false);
  const handleOpenAdvanceSettingMessage = () => setAdvanceSettingMessage(true);
  const handleCloseAdvanceSettingMessage = () =>
    setAdvanceSettingMessage(false);

  const handleOpenError = (msg) => {
    errorMessage.current = msg;
    setErrorUpdate(true);
  };
  const handleCloseError = () => setErrorUpdate(false);

  const handleSubmit = async (data) => {
    let oldSwitch = state.getDevice(state.selectedDevice);
    let name = data.name;
    let mac = data.mac;
    let port = data.port;
    let protocol = data.protocol;
    let update = { ...oldSwitch, name, mac, port, protocol };

    let response = null;

    try {
      response = await axios.put(`/api/switches/${update.indicator}`, update);
    } catch (err) {
      response = err.response;
    }

    if (response.status === 200) {
      const arr = state.switches.map((switche) => {
        if (switche.indicator === oldSwitch.indicator) {
          return update;
        }
        return switche;
      });
      state.setSwitches(arr);
      state.setSelectedDevice(null);
    } else if (response.status === 402) {
      const msg = "Mac already exists in other switch";
      handleOpenError(msg);
    } else if (response.status === 405) {
      const msg = "There is a host with this mac already";
      handleOpenError(msg);
    }
  };

  // format to validate MAC address
  const regex = "^([0-9A-F]{2}[:]){5}([0-9A-F]{2})$";

  /**
   * This Schema has the validations for the information put in the form
   */
  const schema = object({
    name: string().required("Cannot be empty"),
    mac: string().required("Cannot be empty").matches(regex, {
      message: "Invalid Mac address",
      excludeEmptyString: true,
    }),
    port: number()
      .integer("Must be a natural number")
      .required("Cannot be empty"),
  });

  return (
    <div>
      <div>
        <Modal
          open={errorUpdate}
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
              {errorMessage.current}
            </Typography>
          </Box>
        </Modal>
      </div>
      <div>
        <Modal
          open={advanceSettingMessage}
          onClose={handleCloseAdvanceSettingMessage}
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
              <p>
                Please modify this values only if you are experienced with
                Mininet
              </p>
              <br />
              <p>
                Right now the protocol is disabled. The switch would have OVS as
                protocol by default
              </p>
            </Typography>
          </Box>
        </Modal>
      </div>
      <ThemeProvider theme={theme}>
        <div>
          <Formik
            initialValues={initialValues}
            onSubmit={(values, formikHelpers) => {
              handleSubmit(values);
            }}
            validationSchema={schema}
            enableReinitialize
          >
            {({ errors, isValid, touched }) => (
              <Form className="form">
                <div className="fields-container">
                  <div className="field">
                    <Field
                      name="name"
                      type="text"
                      as={CssTextField}
                      label="Host Name"
                      error={Boolean(errors.name) && Boolean(touched.name)}
                      helperText={Boolean(touched.name) && errors.name}
                    />
                  </div>
                  <div className="field">
                    <Field
                      name="mac"
                      type="text"
                      as={CssTextField}
                      label={"Mac Address"}
                      error={Boolean(errors.mac) && Boolean(touched.mac)}
                      helperText={Boolean(touched.mac) && errors.mac}
                    />
                  </div>
                  <div className="field">
                    <Field
                      name="port"
                      type={advancedSettings}
                      as={CssTextField}
                      label={"Port Number"}
                      error={Boolean(errors.port) && Boolean(touched.port)}
                      helperText={Boolean(touched.port) && errors.port}
                      hidden={advancedSettings}
                    />
                  </div>
                  <div className="field">
                    <Field
                      name="protocol"
                      type={advancedSettings}
                      as={CssTextField}
                      placeholder="OVS (Default)"
                      disabled
                      label={"Protocol (OVS)"}
                    />
                  </div>
                  <div className="field">
                    {/** unlocks advanced settings */}
                    <Button
                      color="primary"
                      variant="contained"
                      size="small"
                      sx={styledbutton}
                      onClick={() => {
                        unlock();
                        if (
                          advancedSettings === "hidden" &&
                          advanceSettingMessage === false
                        ) {
                          handleOpenAdvanceSettingMessage();
                        }
                      }}
                    >
                      Advanced Settings
                    </Button>
                  </div>
                </div>
                <div className="buttons-container">
                  <div className="field">
                    <Button
                      color="success"
                      variant="contained"
                      size="small"
                      type="submit"
                      disabled={!isValid}
                    >
                      Save Changes
                    </Button>
                  </div>
                  <div className="field">
                    <Button
                      color="error"
                      variant="contained"
                      size="small"
                      onClick={() => {
                        state.deleteDevice();
                      }}
                    >
                      Delete Switch
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default SwitchConfig;

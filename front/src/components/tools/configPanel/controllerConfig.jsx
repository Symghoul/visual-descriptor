import React, { useContext, useState, useRef } from "react";
import AppContext from "../../../context/AppContext";
import axios from "../../../config/axios";
import { InitName, InitIP, InitPort, InitRemote } from "./initialDeviceValues";
import { ThemeProvider } from "@mui/material/styles";
import { theme, CssTextField } from "../../../config/theme";
import {
  Button,
  Box,
  Modal,
  Typography,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import { number, object, string } from "yup";
import "./controllerConfig.css";

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

/**
 * This is the form used to update and display the information of a controller
 * @returns The controller form component
 */
const ControllerConfig = () => {
  const state = useContext(AppContext);

  const initialValues = {
    name: InitName(),
    ip: InitIP(),
    port: InitPort(),
  };

  const [remote, setRemote] = useState(InitRemote());
  const [errorUpdate, setErrorUpdate] = useState(false);
  const errorMessage = useRef("");

  const handleOpenError = (msg) => {
    errorMessage.current = msg;
    setErrorUpdate(true);
  };

  const handleCloseError = () => setErrorUpdate(false);

  const handleSubmit = async (data) => {
    let oldController = state.getDevice(state.selectedDevice);
    let name = data.name;
    let ip = data.ip;
    let port = data.port;
    let update = { ...oldController, name, ip, port, remote };

    let response = null;

    try {
      response = await axios.put(
        `/api/controllers/${update.indicator}`,
        update
      );
    } catch (err) {
      response = err.response;
    }

    if (response.status === 200) {
      const arr = state.controllers.map((controller) => {
        if (controller.indicator === oldController.indicator) {
          return update;
        }
        return controller;
      });

      state.setControllers(arr);
      state.setSelectedDevice(null);
    } else if (response.status === 401) {
      const msg = "IP already exists";
      handleOpenError(msg);
    } else if (response.status === 403) {
      const msg = "IP already exists within hosts domain";
      handleOpenError(msg);
    }
  };

  /**
   * This Schema has the validations for the information put in the form
   */
  const schema = object({
    name: string().required("Cannot be empty"),
    ip: string()
      .required("Cannot be empty")
      .matches(/(^(\d{1,3}\.){3}(\d{1,3})$)/, {
        message: "Invalid IP address",
        excludeEmptyString: true,
      })
      .test(
        "ipAddress",
        "IP address value should be less or equal to 255",
        (value) => {
          if (value === undefined || value.trim() === "") return true;
          return value.split(".").find((i) => parseInt(i) > 255) === undefined;
        }
      ),
    port: number()
      .integer("Must be a natural number")
      .required("Cannot be empty")
      .positive(),
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
      <ThemeProvider theme={theme}>
        <div>
          <Formik
            initialValues={initialValues}
            onSubmit={(values, formikHelpers) => {
              handleSubmit(values);
            }}
            validationSchema={schema}
          >
            {({ errors, isValid, touched }) => (
              <Form className="form">
                <div className="fields-container">
                  <div className="field">
                    <Field
                      name="name"
                      type="text"
                      as={CssTextField}
                      label={"Controller Name"}
                      error={Boolean(errors.name) && Boolean(touched.name)}
                      helperText={Boolean(touched.name) && errors.name}
                    />
                  </div>
                  <div className="field">
                    <Field
                      name="ip"
                      type="text"
                      as={CssTextField}
                      label={"IP Address"}
                      disabled={!remote}
                      error={Boolean(errors.ip) && Boolean(touched.ip)}
                      helperText={Boolean(touched.ip) && errors.ip}
                    />
                  </div>
                  <div className="field">
                    <Field
                      name="port"
                      type="text"
                      as={CssTextField}
                      label={"Port Number"}
                      disabled={!remote}
                      error={Boolean(errors.port) && Boolean(touched.port)}
                      helperText={Boolean(touched.port) && errors.port}
                    />
                  </div>
                  <div className="field">
                    <FormControlLabel
                      control={
                        <Switch
                          checked={remote}
                          onChange={(event) => setRemote(event.target.checked)}
                        />
                      }
                      label="Remote"
                      labelPlacement="start"
                    />
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
                      Delete Controller
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

export default ControllerConfig;

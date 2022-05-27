import React, { useContext, useState } from "react";
import AppContext from "../../../context/AppContext";
import { InitName, InitIP, InitPort, InitRemote } from "./initialDeviceValues";
import { ThemeProvider } from "@mui/material/styles";
import { theme, CssTextField } from "../../../config/theme";
import { Button, Box, FormControlLabel, Switch } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { number, object, string } from "yup";
import "./controllerConfig.css";

const ControllerConfig = () => {
  const state = useContext(AppContext);

  const [remote, setRemote] = useState(InitRemote());

  const initialValues = {
    name: InitName(),
    ip: InitIP(),
    port: InitPort(),
  };

  const handleSubmit = (data) => {
    let oldController = state.getDevice(state.selectedDevice);
    let name = data.name;
    let ip = data.ip;
    let port = data.port;
    let update = { ...oldController, name, ip, port, remote };

    const arr = state.controllers.map((controller) => {
      if (controller.indicator === oldController.indicator) {
        return update;
      }
      return controller;
    });

    state.setControllers(arr);
    state.setSelectedDevice(null);
  };

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
    <ThemeProvider theme={theme}>
      <div className="container">
        <Formik
          initialValues={initialValues}
          onSubmit={(values, formikHelpers) => {
            handleSubmit(values);
          }}
          validationSchema={schema}
        >
          {({ errors, isValid, touched }) => (
            <Form>
              <Field
                className="field2"
                name="name"
                type="text"
                as={CssTextField}
                label={"Controller Name"}
                error={Boolean(errors.name) && Boolean(touched.name)}
                helperText={Boolean(touched.name) && errors.name}
              />

              <Field
                className="field2"
                name="ip"
                type="text"
                as={CssTextField}
                label={"IP Adress"}
                error={Boolean(errors.ip) && Boolean(touched.ip)}
                helperText={Boolean(touched.ip) && errors.ip}
              />

              <Field
                className="field2"
                name="port"
                type="text"
                as={CssTextField}
                label={"Port Number"}
                error={Boolean(errors.port) && Boolean(touched.port)}
                helperText={Boolean(touched.port) && errors.port}
              />

              <FormControlLabel
                className="field2"
                control={
                  <Switch
                    checked={remote}
                    onChange={(event) => setRemote(event.target.checked)}
                  />
                }
                label="Remote"
                labelPlacement="start"
              />
              <Box className="field2" />

              <Button
                className="field2"
                color="primary"
                variant="contained"
                size="small"
                type="submit"
                disabled={!isValid}
              >
                Save Changes
              </Button>
              <span> </span>
              <Button
                className="field2"
                color="error"
                variant="contained"
                size="small"
                onClick={() => {
                  state.deleteDevice();
                }}
              >
                Delete Controller
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </ThemeProvider>
  );
};

export default ControllerConfig;

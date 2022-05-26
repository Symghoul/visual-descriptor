import React, { useContext } from "react";
import AppContext from "../../../context/AppContext";
import {
  InitName,
  InitMac,
  InitPort,
  InitProtocol,
} from "./initialDeviceValues";
import { ThemeProvider } from "@mui/material/styles";
import { theme, CssTextField } from "../../../config/theme";
import { Button, Box } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { number, object, string } from "yup";
import "./switchConfig.css";

const SwitchConfig = () => {
  const state = useContext(AppContext);

  const initialValues = {
    name: InitName(),
    mac: InitMac(),
    port: InitPort(),
    protocol: InitProtocol(),
  };

  const handleSubmit = (data) => {
    let oldSwitch = state.getDevice(state.selectedDevice);
    let name = data.name;
    let mac = data.mac;
    let port = data.port;
    let protocol = data.protocol;
    let update = { ...oldSwitch, name, mac, port, protocol };

    const arr = state.switches.map((switche) => {
      if (switche.indicator === oldSwitch.indicator) {
        return update;
      }
      return switche;
    });
    state.setSwitches(arr);
    state.updateDevice();
  };

  const regex = "^([0-9A-Fa-f]{2}[:]){5}([0-9A-Fa-f]{2})$";

  const schema = object({
    name: string().required("Cannot be empty"),
    mac: string().required("Cannot be empty").matches(regex, {
      message: "Invalid Mac address",
      excludeEmptyString: true,
    }),
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
                label="Host Name"
                error={Boolean(errors.name) && Boolean(touched.name)}
                helperText={Boolean(touched.name) && errors.name}
              />
              <Field
                className="field2"
                name="mac"
                type="text"
                as={CssTextField}
                label={"Mac Address"}
                error={Boolean(errors.mac) && Boolean(touched.mac)}
                helperText={Boolean(touched.mac) && errors.mac}
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
              <Field
                className="field2"
                name="protocol"
                type="text"
                as={CssTextField}
                label={"Protocol"}
                disabled
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
                Delete Switch
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </ThemeProvider>
  );
};

export default SwitchConfig;

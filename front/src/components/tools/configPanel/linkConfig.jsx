import React, { useContext } from "react";
import AppContext from "../../../context/AppContext";
import { InitDelay, InitLoss, InitBandwidth } from "./initialDeviceValues";
import { ThemeProvider } from "@mui/material/styles";
import { theme, CssTextField } from "../../../config/theme";
import { Button, Box } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { number, object } from "yup";
import "./linkConfig.css";

const LinkConfig = () => {
  const state = useContext(AppContext);

  const initialValues = {
    delay: InitDelay(),
    loss: InitLoss(),
    bandwidth: InitBandwidth(),
  };

  const handleSubmit = (data) => {
    let oldLink = state.getDevice(state.selectedDevice);
    let delay = data.delay;
    let loss = data.loss;
    let bandwidth = data.bandwidth;
    let update = { ...oldLink, delay, loss, bandwidth };

    const arr = state.links.map((link) => {
      if (link.id === oldLink.id) {
        return update;
      }
      return link;
    });

    state.setLinks(arr);
    state.setSelectedDevice(null);
  };

  const schema = object({
    delay: number()
      .integer("Must be a natural number")
      .required("Cannot be empty")
      .positive(),
    loss: number()
      .integer("Must be a natural number")
      .required("Cannot be empty")
      .positive(),
    bandwidth: number()
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
                name="delay"
                type="text"
                as={CssTextField}
                label={"Delay (ms)"}
                error={Boolean(errors.delay) && Boolean(touched.delay)}
                helperText={Boolean(touched.delay) && errors.delay}
              />

              <Field
                className="field2"
                name="loss"
                type="text"
                as={CssTextField}
                label={"Loss (%)"}
                error={Boolean(errors.loss) && Boolean(touched.loss)}
                helperText={Boolean(touched.loss) && errors.loss}
              />

              <Field
                className="field2"
                name="bandwidth"
                type="text"
                as={CssTextField}
                label={"Bandwidth"}
                error={Boolean(errors.bandwidth) && Boolean(touched.bandwidth)}
                helperText={Boolean(touched.bandwidth) && errors.bandwidth}
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
                color="primary"
                variant="contained"
                size="small"
                onClick={() => {
                  state.deleteDevice();
                }}
              >
                Delete Link
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </ThemeProvider>
  );
};

export default LinkConfig;

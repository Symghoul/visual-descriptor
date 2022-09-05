import React, { useContext } from "react";
import AppContext from "../../../context/AppContext";
import axios from "../../../config/axios";
import { InitDelay, InitLoss, InitBandwidth } from "./initialDeviceValues";
import { ThemeProvider } from "@mui/material/styles";
import { theme, CssTextField } from "../../../config/theme";
import { Button } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { number, object } from "yup";
import "./linkConfig.css";

const color = "#6a6fea";

const LinkConfig = () => {
  const state = useContext(AppContext);

  const initialValues = {
    delay: InitDelay(),
    loss: InitLoss(),
    bandwidth: InitBandwidth(),
  };

  const handleSubmit = async (data) => {
    let oldLink = state.getDevice(state.selectedDevice);
    let delay = data.delay;
    let loss = data.loss;
    let bandwidth = data.bandwidth;
    let update = { ...oldLink, delay, loss, bandwidth, color };

    await axios.put(`/api/links/${update.indicator}`, update);

    const arr = state.links.map((link) => {
      if (link.indicator === oldLink.indicator) {
        return update;
      }
      return link;
    });

    state.setLinks(arr);
    state.setSelectedDevice(null);
    state.setSelectedLink(null);
  };

  const schema = object({
    delay: number()
      .integer("Must be a natural number")
      .required("Cannot be empty")
      .min(0, "Must be positive or cero"),
    loss: number()
      .integer("Must be a natural number")
      .required("Cannot be empty")
      .min(0, "Must be positive or cero"),
    bandwidth: number()
      .integer("Must be a natural number")
      .required("Cannot be empty")
      .min(0, "Must be positive or cero"),
  });

  return (
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
                    name="delay"
                    type="text"
                    as={CssTextField}
                    label={"Delay (ms)"}
                    error={Boolean(errors.delay) && Boolean(touched.delay)}
                    helperText={Boolean(touched.delay) && errors.delay}
                  />
                </div>
                <div className="field">
                  <Field
                    name="loss"
                    type="text"
                    as={CssTextField}
                    label={"Loss (%)"}
                    error={Boolean(errors.loss) && Boolean(touched.loss)}
                    helperText={Boolean(touched.loss) && errors.loss}
                  />
                </div>
                <div className="field">
                  <Field
                    name="bandwidth"
                    type="text"
                    as={CssTextField}
                    label={"Bandwidth (Mb/s)"}
                    error={
                      Boolean(errors.bandwidth) && Boolean(touched.bandwidth)
                    }
                    helperText={Boolean(touched.bandwidth) && errors.bandwidth}
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
                    Delete Link
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </ThemeProvider>
  );
};

export default LinkConfig;

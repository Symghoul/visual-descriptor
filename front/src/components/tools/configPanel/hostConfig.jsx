import React, { useContext } from "react";
import AppContext from "../../../context/AppContext";
import { InitName, InitMac, InitIP, InitMask } from "./initialDeviceValues";
import { ThemeProvider } from "@mui/material/styles";
import { theme, CssTextField } from "../../../config/theme";
import { Button, Box } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { object, string } from "yup";
import "./hostConfig.css";

const HostConfig = () => {
  const state = useContext(AppContext);

  const initialValues = {
    name: InitName(),
    mac: InitMac(),
    ip: InitIP(),
    mask: InitMask(),
  };

  const handleSubmit = (data) => {
    let oldHost = state.getDevice(state.selectedDevice);
    let name = data.name;
    let mac = data.mac;
    let ip = data.ip;
    let mask = data.mask;
    let update = { ...oldHost, name, mac, ip, mask };

    const arr = state.hosts.map((host) => {
      if (host.indicator === oldHost.indicator) {
        return update;
      }
      return host;
    });

    state.setHosts(arr);
    state.updateDevice();
  };

  const regex = "^([0-9A-Fa-f]{2}[:]){5}([0-9A-Fa-f]{2})$";

  const schema = object({
    name: string().required("Cannot be empty"),
    mac: string().required("Cannot be empty").matches(regex, {
      message: "Invalid Mac address",
      excludeEmptyString: true,
    }),
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
    mask: string()
      .required("Cannot be empty")
      .matches(/(^(\d{1,3}\.){3}(\d{1,3})$)/, {
        message: "Invalid mask",
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
                name="ip"
                type="text"
                as={CssTextField}
                label={"IP Adress"}
                error={Boolean(errors.ip) && Boolean(touched.ip)}
                helperText={Boolean(touched.ip) && errors.ip}
              />
              <Field
                className="field2"
                name="mask"
                type="text"
                as={CssTextField}
                label={"Subnet Mask"}
                error={Boolean(errors.mask) && Boolean(touched.mask)}
                helperText={Boolean(touched.mask) && errors.mask}
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
                Delete Host
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </ThemeProvider>
  );
};

export default HostConfig;

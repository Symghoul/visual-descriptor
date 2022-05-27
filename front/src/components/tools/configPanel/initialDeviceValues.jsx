import { useContext } from "react";
import AppContext from "../../../context/AppContext";

const InitialDeviceValues = () => {};

const InitName = () => {
  const state = useContext(AppContext);
  if (state.selectedDevice !== null) {
    const device = state.getDevice(state.selectedDevice);
    if (device) {
      return device.name;
    } else return "";
  }
};

const InitMac = () => {
  const state = useContext(AppContext);
  if (state.selectedDevice !== null) {
    const device = state.getDevice(state.selectedDevice);
    if (device) {
      return device.mac;
    } else return "";
  }
};

const InitIP = () => {
  const state = useContext(AppContext);
  if (state.selectedDevice !== null) {
    const device = state.getDevice(state.selectedDevice);
    if (device) {
      return device.ip;
    } else return "";
  }
};

const InitMask = () => {
  const state = useContext(AppContext);
  if (state.selectedDevice !== null) {
    const device = state.getDevice(state.selectedDevice);
    if (device) {
      return device.mask;
    } else return "";
  }
};

const InitPort = () => {
  const state = useContext(AppContext);
  if (state.selectedDevice !== null) {
    const device = state.getDevice(state.selectedDevice);
    if (device) {
      return device.port;
    } else return 0;
  }
};

const InitProtocol = () => {
  const state = useContext(AppContext);
  if (state.selectedDevice !== null) {
    const device = state.getDevice(state.selectedDevice);
    if (device) {
      return device.protocol;
    } else return "";
  }
};

const InitRemote = () => {
  const state = useContext(AppContext);
  if (state.selectedDevice !== null) {
    const device = state.getDevice(state.selectedDevice);
    if (device) {
      return device.remote;
    } else return false;
  }
};

const InitDelay = () => {
  const state = useContext(AppContext);
  if (state.selectedDevice !== null) {
    const device = state.getDevice(state.selectedDevice);
    if (device) {
      return device.delay;
    } else return 0;
  }
};

const InitLoss = () => {
  const state = useContext(AppContext);
  if (state.selectedDevice !== null) {
    const device = state.getDevice(state.selectedDevice);
    if (device) {
      return device.loss;
    } else return 0;
  }
};

const InitBandwidth = () => {
  const state = useContext(AppContext);
  if (state.selectedDevice !== null) {
    const device = state.getDevice(state.selectedDevice);
    if (device) {
      return device.bandwidth;
    } else return 0;
  }
};

export {
  InitName,
  InitMac,
  InitIP,
  InitMask,
  InitPort,
  InitProtocol,
  InitRemote,
  InitDelay,
  InitLoss,
  InitBandwidth,
};

export default InitialDeviceValues;

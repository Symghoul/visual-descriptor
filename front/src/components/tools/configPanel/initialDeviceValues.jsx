import React, { useContext } from "react";
import AppContext from "../../../context/AppContext";

const InitialDeviceValues = () => {};

const InitName = () => {
  const state = useContext(AppContext);
  if (state.selectedDevice !== null) {
    const device = state.getDevice(state.selectedDevice);
    return device.name;
  }
};

const InitMac = () => {
  const state = useContext(AppContext);
  if (state.selectedDevice !== null) {
    const device = state.getDevice(state.selectedDevice);
    return device.mac;
  }
};

const InitIP = () => {
  const state = useContext(AppContext);
  if (state.selectedDevice !== null) {
    const device = state.getDevice(state.selectedDevice);
    return device.ip;
  }
};

const InitMask = () => {
  const state = useContext(AppContext);
  if (state.selectedDevice !== null) {
    const device = state.getDevice(state.selectedDevice);
    return device.mask;
  }
};

const InitPort = () => {
  const state = useContext(AppContext);
  if (state.selectedDevice !== null) {
    const device = state.getDevice(state.selectedDevice);
    return device.port;
  }
};

const InitProtocol = () => {
  const state = useContext(AppContext);
  if (state.selectedDevice !== null) {
    const device = state.getDevice(state.selectedDevice);
    return device.protocol;
  }
};

const InitRemote = () => {
  const state = useContext(AppContext);
  if (state.selectedDevice !== null) {
    const device = state.getDevice(state.selectedDevice);
    return device.remote;
  }
};

const InitDelay = () => {
  const state = useContext(AppContext);
  if (state.selectedDevice !== null) {
    const device = state.getDevice(state.selectedDevice);
    return device.delay;
  }
};

const InitLoss = () => {
  const state = useContext(AppContext);
  if (state.selectedDevice !== null) {
    const device = state.getDevice(state.selectedDevice);
    return device.loss;
  }
};

const InitBandwidth = () => {
  const state = useContext(AppContext);
  if (state.selectedDevice !== null) {
    const device = state.getDevice(state.selectedDevice);
    return device.bandwidth;
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

import React, { useEffect, useRef, useState } from "react";
import * as uuid from "uuid";

import axios from "../config/axios";

const AppContext = React.createContext();

//const usePreviousSelectedDevice = (prevSelDevice) => {
//  const ref = useRef();
//  useEffect(() => {
//    ref.current = prevSelDevice;
//  }, [prevSelDevice]);
//  return ref.current;
//};
//const prevSelDevice = usePreviousSelectedDevice(selectedDevice);

export const AppContextWrapper = (props) => {
  const [selectedDevice, setSelectedDevice] = useState(null);

  const [controllers, setControllers] = useState([]);
  const [switches, setSwitches] = useState([]);
  const [hosts, setHosts] = useState([]);
  const [links, setLinks] = useState([]);

  // ----------- Main methods -----------

  const exportData = () => {
    //console.log(controllers, switches, hosts, links);
  };

  const testConnection = () => {
    axios.get("/").then((res) => console.log(res));
  };

  function getDevice(device) {
    let foundDevice = null;
    if (device.type === "controller") {
      foundDevice = controllers.find(
        (controller) => controller.id === device.id
      );
      return foundDevice;
    } else if (device.type === "host") {
      foundDevice = hosts.find((host) => host.id === device.id);
      return foundDevice;
    } else if (device.type === "switch") {
      foundDevice = switches.find((switche) => switche.id === device.id);
      return foundDevice;
    } else if (device.type === "link") {
      foundDevice = links.find((link) => link.id === device.id);
      return foundDevice;
    } else {
      return foundDevice;
    }
  }

  const deleteDevice = () => {
    const device = getDevice(selectedDevice);

    if (device.type === "controller") {
      deleteLinks(device);
      const arr = controllers.filter(
        (controller) => controller.id !== device.id
      );
      setControllers(arr);
    } else if (device.type === "switch") {
      deleteLinks(device);
      const arr = switches.filter((switche) => switche.id !== device.id);
      setSwitches(arr);
    } else if (device.type === "host") {
      deleteLinks(device);
      const arr = hosts.filter((host) => host.id !== device.id);
      setHosts(arr);
    } else if (device.type === "link") {
      const arr = links.filter((link) => link.id !== device.id);
      setLinks(arr);
    }
    setSelectedDevice(null);
  };

  const deleteLinks = (device) => {
    const arr = links.filter(
      (link) => link.to.id !== device.id || link.from.id !== device.id
    );
    setLinks(arr);
    console.log(links);
  };

  // ----------- Controller methods -----------

  const updateControllerName = (device, name) => {
    const controller = getDevice(device);
    controller.name = name;
    const controllersArr = [
      ...controllers.filter(
        (oldController) => oldController.id !== controller.id
      ),
    ];
    setControllers(controllersArr, controller);
  };

  const saveController = (name, port, type, ip) => {
    const newController = {
      id: uuid.v1(),
      name,
      port,
      type,
      ip,
    };
    const newControllers = [...controllers, newController];
    setControllers(newControllers);
  };

  const deleteController = (controllerId) => {
    const controllersArr = controllers.filter(
      (controller) => controller.id !== controllerId
    );
    setControllers(controllersArr);
  };

  // ----------- Switch methods -----------

  const saveSwitch = (name, protocol, port, mac) => {
    const newSwitch = {
      id: uuid.v1(),
      name,
      protocol,
      port,
      mac,
    };
    const newSwitchs = [...switches, newSwitch];
    setSwitches(newSwitchs);
  };

  const deleteSwitch = (switchId) => {
    const switchesArr = switches.filter(
      (oldSwitch) => oldSwitch.id !== switchId
    );
    setControllers(switchesArr);
  };

  // ----------- Host methods -----------

  const saveHost = (name, ip, mask, mac) => {
    const newHost = {
      id: uuid.v1(),
      name,
      ip,
      mask,
      mac,
    };
    const newHosts = [...hosts, newHost];
    setHosts(newHosts);
  };

  const deleteHost = (hostId) => {
    const hostsArr = hosts.filter((host) => host.id !== hostId);
    setHosts(hostsArr);
  };

  // ----------- Link methods -----------

  const saveLink = (name, source, destiny, delay, loss, bandwith) => {
    const newLink = {
      id: uuid.v1(),
      name,
      source,
      destiny,
      delay,
      loss,
      bandwith,
    };
    const newLinks = [...links, newLink];
    setLinks(newLinks);
  };

  const deleteLink = (linkId) => {
    const linksArr = links.filter((link) => link.id !== linkId);
    setLinks(linksArr);
  };

  // ----------- exported states and methods -----------

  const state = {
    exportData,
    testConnection,

    selectedDevice,
    setSelectedDevice,
    getDevice,
    deleteDevice,

    controllers,
    setControllers,
    updateControllerName,
    saveController,
    deleteController,

    switches,
    setSwitches,
    saveSwitch,
    deleteSwitch,
    hosts,
    setHosts,
    saveHost,
    deleteHost,
    links,
    setLinks,
    saveLink,
    deleteLink,
  };

  return (
    <AppContext.Provider value={state} displayName="AppContext">
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;

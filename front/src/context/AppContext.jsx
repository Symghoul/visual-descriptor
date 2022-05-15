/**
 * Here lies the context of the aplication
 */

import React, { useState } from "react";
import * as uuid from "uuid";

const AppContext = React.createContext();

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
    } else {
      return foundDevice;
    }
  }

  // ----------- Controller methods -----------
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

    selectedDevice,
    setSelectedDevice,
    getDevice,

    controllers,
    setControllers,
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

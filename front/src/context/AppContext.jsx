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

  var controllerSymbol = 0;

  // ----------- Main methods -----------

  const exportData = () => {
    //console.log(controllers, switches, hosts, links);
  };

  const getControllerSymbol = () => {
    controllerSymbol = controllerSymbol + 1;
    return controllerSymbol;
  };

  const testConnection = async () => {
    axios.get("/").then((res) => console.log(res));
    /*
    //Metodo GET para traer TODOS los dispositivos
    const controllers = await axios.get("/api/controllers");
    const switches = await axios.get("/api/switches");
    const hosts = await axios.get("/api/hosts");
    const links = await axios.get("/api/links");*/

    /*
    //Metodo GET CON ID para traer un dispositivo
    const controller = await axios.get("/api/controllers" + AQUI PONGA EL ID DEL CONTROLADOR);
    const switch = await axios.get("/api/switches" + AQUI PONGA EL ID DEL switch);
    const host = await axios.get("/api/hosts" + AQUI PONGA EL ID DEL host);
    const link = await axios.get("/api/links" + AQUI PONGA EL ID DEL link);
    */

    /*
    //Metodo POST para crear un dispositivo
    await axios.post("/api/controllers", AQUI PONGA EL OBJETO MI SO);
    await axios.post("/api/switches", AQUI PONGA EL OBJETO MI SO);
    await axios.post("/api/hosts", AQUI PONGA EL OBJETO MI SO);
    await axios.post("/api/links", AQUI PONGA EL OBJETO MI SO);
    */

    /*
    //Metodo PUT para modificar un dispositivo
    await axios.put("/api/controllers" + AQUI PONGA EL ID DEL CONTROLADOR, AQUI PONGA EL OBJETO MI SO);
    await axios.put("/api/switches" + AQUI PONGA EL ID DEL switch, AQUI PONGA EL OBJETO MI SO);
    await axios.put("/api/hosts" + AQUI PONGA EL ID DEL host, AQUI PONGA EL OBJETO MI SO);
    await axios.put("/api/links" + AQUI PONGA EL ID DEL link, AQUI PONGA EL OBJETO MI SO);
    */

    /*
    //Metodo DELETE para eliminar un dispositivo
    await axios.delete("/api/controllers/" + AQUI PONGA EL ID DEL CONTROLADOR);
    await axios.delete("/api/switches/" + AQUI PONGA EL ID DEL switch);
    await axios.delete("/api/hosts/" + AQUI PONGA EL ID DEL host);
    await axios.delete("/api/links/" + AQUI PONGA EL ID DEL link);
    */
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

  const saveDevice = async (device) => {
    if (device.type === "controller") {
      await axios.post("/api/controllers", device);
      const datos = await axios.get("/api/controllers").then((res) => {
        return res.data;
      });
      setControllers(datos);
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
    saveDevice,
    deleteDevice,

    getControllerSymbol,

    controllers,
    setControllers,
    updateControllerName,
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

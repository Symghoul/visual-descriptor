import React, { useEffect, useRef, useState } from "react";
import * as uuid from "uuid";

import axios from "../config/axios";

const AppContext = React.createContext();

const usePreviousSelectedDevice = (prevSelDevice) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = prevSelDevice;
  }, [prevSelDevice]);
  return ref.current;
};

export const AppContextWrapper = (props) => {
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [selectedLink, setSelectedLink] = useState(null);
  const prevSelDevice = usePreviousSelectedDevice(selectedDevice);

  const [controllers, setControllers] = useState([]);
  const [switches, setSwitches] = useState([]);
  const [hosts, setHosts] = useState([]);
  const [links, setLinks] = useState([]);

  const controllerSymbol = useRef(0);
  const switchSymbol = useRef(0);
  const hostSymbol = useRef(0);
  const ipAddress = useRef(0);
  const macAddress = useRef(0);
  const portNumber = useRef(0);

  // ----------- Main methods -----------

  const exportData = () => {
    //console.log(controllers, switches, hosts, links);
  };

  const testStuff = () => {
    let testIP = "";
    let testMAC = "";

    const ipTestMethod = () => {
      //codigo
      testIP = "ip";
    };

    const macTestMethod = () => {
      //codigo
      testMAC = "mac";
    };

    //ipTestMethod();
    //macTestMethod();
    //console.log(testIP);
    //console.log(testMAC);
  };

  const getControllerSymbol = () => {
    controllerSymbol.current = controllerSymbol.current + 1;
    return controllerSymbol.current;
  };

  const getSwitchSymbol = () => {
    switchSymbol.current = switchSymbol.current + 1;
    return switchSymbol.current;
  };

  const getHostSymbol = () => {
    hostSymbol.current = hostSymbol.current + 1;
    return hostSymbol.current;
  };

  const getIpAddress = () => {
    ipAddress.current = ipAddress.current + 1;
    return ipAddress.current;
  };

  const getMacAddress = () => {
    macAddress.current = macAddress.current + 1;
    return macAddress.current;
  };

  const getPortNumber = () => {
    portNumber.current = portNumber.current + 1;
    return portNumber.current;
  };

  const testConnection = async () => {
    await axios.get("/").then((res) => console.log(res));
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

  /**
   * This effect update the changes made in a device
   */
  useEffect(() => {
    if (prevSelDevice) {
      if (prevSelDevice.type === "controller") {
        axios.get(`/api/controllers/${prevSelDevice.id}`).then((res) => {
          if (res.status === 200) {
            axios.put(
              `/api/controllers/${prevSelDevice.id}`,
              getDevice(prevSelDevice)
            );
          }
        });
      }
      if (prevSelDevice.type === "switch") {
        axios.get(`/api/switches/${prevSelDevice.id}`).then((res) => {
          if (res.status === 200) {
            axios.put(
              `/api/switches/${prevSelDevice.id}`,
              getDevice(prevSelDevice)
            );
          }
        });
      }
      if (prevSelDevice.type === "host") {
        axios.get(`/api/hosts/${prevSelDevice.id}`).then((res) => {
          if (res.status === 200) {
            axios.put(
              `/api/hosts/${prevSelDevice.id}`,
              getDevice(prevSelDevice)
            );
          }
        });
      }
      if (prevSelDevice.type === "link") {
        axios.get(`/api/links/${prevSelDevice.id}`).then((res) => {
          if (res.status === 200) {
            axios.put(
              `/api/links/${prevSelDevice.id}`,
              getDevice(prevSelDevice)
            );
          }
        });
      }
    }
  }, [selectedDevice]);

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
      if (foundDevice) {
        return foundDevice;
      } else {
        foundDevice = null;
      }
    } else {
      return foundDevice;
    }
  }

  const saveDevice = async (device) => {
    if (device.type === "controller") {
      await axios.post("/api/controllers", device);
    } else if (device.type === "switch") {
      await axios.post("/api/switches", device);
    } else if (device.type === "host") {
      await axios.post("/api/hosts", device);
    } else if (device.type === "link") {
      await axios.post("/api/links", device);
    }
  };

  const deleteDevice = () => {
    const device = getDevice(selectedDevice);

    if (device.type === "controller") {
      deleteLinks(device);
      const arr = controllers.filter(
        (controller) => controller.id !== device.id
      );
      setControllers(arr);
      axios.delete(`/api/controllers/${device.id}`);
    } else if (device.type === "switch") {
      deleteLinks(device);
      const arr = switches.filter((switche) => switche.id !== device.id);
      setSwitches(arr);
      axios.delete(`/api/switches/${device.id}`);
    } else if (device.type === "host") {
      deleteLinks(device);
      const arr = hosts.filter((host) => host.id !== device.id);
      setHosts(arr);
      axios.delete(`/api/hosts/${device.id}`);
    } else if (device.type === "link") {
      const arr = links.filter((link) => link.id !== device.id);
      setLinks(arr);
      setSelectedLink(null);
      axios.delete(`/api/links/${device.id}`);
    }
    setSelectedDevice(null);
  };

  const deleteLinks = async (device) => {
    const arr = links.filter((link) => link.to.id !== device.id);
    const arr2 = arr.filter((link) => link.from.id !== device.id);
    setLinks(arr2);

    //database cleaning
    const oldLinks = (await axios.get("/api/links")).data;
    oldLinks.map((link) => {
      //map indicator to id
      let idLink = { ...link, id: link.indicator };
      axios.delete(`/api/links/${idLink.id}`);
    });
  };

  // ----------- exported states and methods -----------

  const state = {
    exportData,
    testStuff,

    selectedDevice,
    setSelectedDevice,
    selectedLink,
    setSelectedLink,
    getDevice,

    saveDevice,
    deleteDevice,

    getControllerSymbol,
    getSwitchSymbol,
    getHostSymbol,
    getIpAddress,
    getMacAddress,
    getPortNumber,

    controllers,
    setControllers,
    switches,
    setSwitches,
    hosts,
    setHosts,
    links,
    setLinks,
  };

  return (
    <AppContext.Provider value={state} displayName="AppContext">
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;

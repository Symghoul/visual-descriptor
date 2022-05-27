import React, { useRef, useState, useEffect } from "react";
import { wait } from "@testing-library/user-event/dist/utils";
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
  const [error, setError] = useState("");

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

  function getDevice(device) {
    let foundDevice = null;
    if (device.type === "controller") {
      foundDevice = controllers.find(
        (controller) => controller.indicator === device.indicator
      );
      return foundDevice;
    } else if (device.type === "host") {
      foundDevice = hosts.find((host) => host.indicator === device.indicator);
      return foundDevice;
    } else if (device.type === "switch") {
      foundDevice = switches.find(
        (switche) => switche.indicator === device.indicator
      );
      return foundDevice;
    } else if (device.type === "link") {
      foundDevice = links.find((link) => link.indicator === device.indicator);
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

  /**
   * This effect update the changes made in a device
   */
  useEffect(() => {
    if (prevSelDevice) {
      if (prevSelDevice.type === "controller") {
        const updateController = async () => {
          let response = await axios.get(
            `/api/controllers/${prevSelDevice.indicator}`
          );
          if (response.status === 200) {
            response = await axios.put(
              `/api/controllers/${prevSelDevice.indicator}`,
              getDevice(prevSelDevice)
            );
          }
        };
        updateController();
      }
      if (prevSelDevice.type === "switch") {
        const updateSwitch = async () => {
          let response = await axios.get(
            `/api/switches/${prevSelDevice.indicator}`
          );
          if (response.status === 200) {
            response = await axios.put(
              `/api/switches/${prevSelDevice.indicator}`,
              getDevice(prevSelDevice)
            );
          }
        };
        updateSwitch();
      }
      if (prevSelDevice.type === "host") {
        const updateHost = async () => {
          let response = await axios.get(
            `/api/hosts/${prevSelDevice.indicator}`
          );
          if (response.status === 200) {
            response = await axios.put(
              `/api/hosts/${prevSelDevice.indicator}`,
              getDevice(prevSelDevice)
            );
          }
        };
        updateHost();
      }
      if (prevSelDevice.type === "link") {
        const updateLink = async () => {
          let response = await axios.get(
            `/api/links/${prevSelDevice.indicator}`
          );
          if (response.status === 200) {
            response = await axios.put(
              `/api/links/${prevSelDevice.indicator}`,
              getDevice(prevSelDevice)
            );
          }
        };
        updateLink();
      }
    }
    console.log(selectedDevice);
  }, [selectedDevice]);

  const deleteDevice = async () => {
    const device = getDevice(selectedDevice);

    if (device.type === "controller") {
      deleteLinks(device);
      const arr = controllers.filter(
        (controller) => controller.indicator !== device.indicator
      );
      await axios.delete(`/api/controllers/${device.indicator}`);
      setControllers(arr);
    } else if (device.type === "switch") {
      deleteLinks(device);
      const arr = switches.filter(
        (switche) => switche.indicator !== device.indicator
      );
      await axios.delete(`/api/switches/${device.indicator}`);
      setSwitches(arr);
    } else if (device.type === "host") {
      deleteLinks(device);
      const arr = hosts.filter((host) => host.indicator !== device.indicator);
      await axios.delete(`/api/hosts/${device.indicator}`);
      setHosts(arr);
    } else if (device.type === "link") {
      const arr = links.filter((link) => link.indicator !== device.indicator);
      setLinks(arr);
      await axios.delete(`/api/links/${device.indicator}`);
      setSelectedLink(null);
    }
    setSelectedDevice(null);
  };

  const deleteLinks = async (device) => {
    const delArr = links.filter(
      (link) => link.to.indicator === device.indicator
    );
    const delArr2 = links.filter(
      (link) => link.from.indicator === device.indicator
    );
    const arr = links.filter((link) => link.to.indicator !== device.indicator);
    const arr2 = arr.filter((link) => link.from.indicator !== device.indicator);
    setLinks(arr2);

    //database cleaning
    if (delArr.length !== 0) {
      delArr.map((link) => {
        axios.delete(`/api/links/${link.indicator}`);
      });
    }
    if (delArr2.length !== 0) {
      delArr2.map((link) => {
        axios.delete(`/api/links/${link.indicator}`);
      });
    }
  };

  const startOver = () => {
    axios.get("/api/general/erase");
    setSelectedDevice(null);
    setSelectedDevice(null);
    setSelectedLink(null);
    setControllers([]);
    setHosts([]);
    setSwitches([]);
    setLinks([]);
  };

  const loadFromDB = async (formData) => {
    await axios.get("/api/general/erase");
    await axios.post(`/api/general/load/`, formData);

    wait(5000);

    let DBControllers = await axios.get("/api/controllers");
    let DBSwitches = await axios.get("/api/switches");
    let DBHosts = await axios.get("/api/hosts");
    let DBLinks = await axios.get("/api/links");

    setControllers(DBControllers.data);
    setSwitches(DBSwitches.data);
    setHosts(DBHosts.data);
    setLinks(DBLinks.data);

    DBControllers = await axios.get("/api/controllers");
    DBSwitches = await axios.get("/api/switches");
    DBHosts = await axios.get("/api/hosts");
    DBLinks = await axios.get("/api/links");

    setControllers(DBControllers.data);
    setSwitches(DBSwitches.data);
    setHosts(DBHosts.data);
    setLinks(DBLinks.data);

    console.log(controllers, "controller");
    console.log(switches, "switches");
    console.log(hosts, "hosts");
    console.log(links, "links");
  };

  // ----------- exported states and methods -----------

  const state = {
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

    startOver,
    loadFromDB,
    error,
    setError,
  };

  return (
    <AppContext.Provider value={state} displayName="AppContext">
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;

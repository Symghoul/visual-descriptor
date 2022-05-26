import React, { useEffect, useRef, useState } from "react";

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

  const updateDevice = () => {
    if (selectedDevice) {
      if (selectedDevice.type === "controller") {
        const updateController = async () => {
          await axios
            .get(`/api/controllers/${selectedDevice.indicator}`)
            .then((res) => {
              if (res.status === 200) {
                axios.put(
                  `/api/controllers/${selectedDevice.indicator}`,
                  getDevice(selectedDevice)
                );
              }
            });
        };
        updateController();
      }
      if (selectedDevice.type === "switch") {
        const updateSwitch = async () => {
          await axios
            .get(`/api/switches/${selectedDevice.indicator}`)
            .then((res) => {
              if (res.status === 200) {
                axios.put(
                  `/api/switches/${selectedDevice.indicator}`,
                  getDevice(selectedDevice)
                );
              }
            });
        };
        updateSwitch();
      }
      if (selectedDevice.type === "host") {
        const updateHost = async () => {
          console.log("host");
          let response = await axios.get(
            `/api/hosts/${selectedDevice.indicator}`
          );
          console.log(response, "1st response");
          if (response.status === 200) {
            console.log("existe");
            response = await axios.put(
              `/api/hosts/${selectedDevice.indicator}`,
              getDevice(selectedDevice)
            );
            console.log(response, "2nd response");
            if (response.status === 401) {
              console.log(response.status);
              state.setError("IP");
            }
            if (response.status === 402) {
              console.log(response.status);
              state.setError("MACs");
            }
          }
        };
        updateHost();
      }
      if (selectedDevice.type === "link") {
        const updateLink = async () => {
          await axios
            .get(`/api/links/${selectedDevice.indicator}`)
            .then((res) => {
              if (res.status === 200) {
                axios.put(
                  `/api/links/${selectedDevice.indicator}`,
                  getDevice(selectedDevice)
                );
              }
            });
        };
        updateLink();
      }
    }
    setSelectedDevice(null);
  };

  const deleteDevice = () => {
    const device = getDevice(selectedDevice);

    if (device.type === "controller") {
      deleteLinks(device);
      const arr = controllers.filter(
        (controller) => controller.indicator !== device.indicator
      );
      setControllers(arr);
      axios.delete(`/api/controllers/${device.indicator}`);
    } else if (device.type === "switch") {
      deleteLinks(device);
      const arr = switches.filter(
        (switche) => switche.indicator !== device.indicator
      );
      setSwitches(arr);
      axios.delete(`/api/switches/${device.indicator}`);
    } else if (device.type === "host") {
      deleteLinks(device);
      const arr = hosts.filter((host) => host.indicator !== device.indicator);
      setHosts(arr);
      axios.delete(`/api/hosts/${device.indicator}`);
    } else if (device.type === "link") {
      const arr = links.filter((link) => link.indicator !== device.indicator);
      setLinks(arr);
      setSelectedLink(null);
      axios.delete(`/api/links/${device.indicator}`);
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
    axios.get("/api/general/erase").then((res) => console.log(res.data));
    setSelectedDevice(null);
    setSelectedDevice(null);
    setSelectedLink(null);
    setControllers([]);
    setHosts([]);
    setSwitches([]);
    setLinks([]);
  };

  const loadFromDB = async () => {
    const DBControllers = await axios.get("/api/controllers");
    const DBSwitches = await axios.get("/api/switches");
    const DBHosts = await axios.get("/api/hosts");
    const DBLinks = await axios.get("/api/links");

    DBControllers.map((controller) => {
      //
    });
  };

  // ----------- exported states and methods -----------

  const state = {
    selectedDevice,
    setSelectedDevice,
    selectedLink,
    setSelectedLink,
    getDevice,

    saveDevice,
    updateDevice,
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

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

  const modalHelp = () =>{
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
      User guide
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
      - To use the tool and draw the topology, you must select one of the devices located at the bottom and drag it anywhere on the screen where you want to place it.
      - to edit the device values, you must click the device you want to configure, there you will see a panel with the device configuration, when you finish making changes click the device again to close the panel, or click a link or another device to configure it.
      - To create links click once on the device you are starting from, then click on one of the balls and hold and drag the ball to the device you want to connect. Remember that it is not possible to connect controller to host directly.
      </Typography>
    </Box>
  </Modal>
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

  /**
   * This effect update the changes made in a device
   */
  useEffect(() => {
    if (prevSelDevice) {
      if (prevSelDevice.type === "controller") {
        const deleteController = async () => {
          await axios
            .get(`/api/controllers/${prevSelDevice.id}`)
            .then((res) => {
              if (res.status === 200) {
                axios.put(
                  `/api/controllers/${prevSelDevice.id}`,
                  getDevice(prevSelDevice)
                );
              }
            });
        };
      }
      if (prevSelDevice.type === "switch") {
        const deleteSwitch = async () => {
          await axios.get(`/api/switches/${prevSelDevice.id}`).then((res) => {
            if (res.status === 200) {
              axios.put(
                `/api/switches/${prevSelDevice.id}`,
                getDevice(prevSelDevice)
              );
            }
          });
        };
      }
      if (prevSelDevice.type === "host") {
        const deleteHost = async () => {
          await axios.get(`/api/hosts/${prevSelDevice.id}`).then((res) => {
            if (res.status === 200) {
              axios.put(
                `/api/hosts/${prevSelDevice.id}`,
                getDevice(prevSelDevice)
              );
            }
          });
        };
      }
      if (prevSelDevice.type === "link") {
        const deleteLink = async () => {
          await axios.get(`/api/links/${prevSelDevice.id}`).then((res) => {
            if (res.status === 200) {
              axios.put(
                `/api/links/${prevSelDevice.id}`,
                getDevice(prevSelDevice)
              );
            }
          });
        };
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
    const delArr = links.filter((link) => link.to.id === device.id);
    const delArr2 = links.filter((link) => link.from.id === device.id);
    const arr = links.filter((link) => link.to.id !== device.id);
    const arr2 = arr.filter((link) => link.from.id !== device.id);
    setLinks(arr2);

    //database cleaning
    if (delArr.length !== 0) {
      delArr.map((link) => {
        axios.delete(`/api/links/${link.id}`);
      });
    }
    if (delArr2.length !== 0) {
      delArr2.map((link) => {
        axios.delete(`/api/links/${link.id}`);
      });
    }
  };

  // ----------- exported states and methods -----------

  const state = {
    testStuff,
    modalHelp,

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

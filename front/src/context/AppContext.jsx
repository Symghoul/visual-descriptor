import React, { useRef, useState } from "react";
import axios from "../config/axios";
import mac from "../config/macService";

const AppContext = React.createContext();

//const usePreviousSelectedDevice = (prevSelDevice) => {
//  const ref = useRef();
//  useEffect(() => {
//    ref.current = prevSelDevice;
//  }, [prevSelDevice]);
//  return ref.current;
//};

export const AppContextWrapper = (props) => {
  /**
   * States to control the behavior of the application
   */
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [selectedLink, setSelectedLink] = useState(null);
  //const prevSelDevice = usePreviousSelectedDevice(selectedDevice);
  const [error, setError] = useState("");

  /**
   * States to collect all the devices created by the user
   */
  const [controllers, setControllers] = useState([]);
  const [switches, setSwitches] = useState([]);
  const [hosts, setHosts] = useState([]);
  const [links, setLinks] = useState([]);

  /**
   * States to handle default information and data the user cannot touch
   */
  const symbol = useRef(0);
  const ipAddress = useRef(1);
  const macAddress = useRef("00:00:00:00:00:00");
  const portNumber = useRef(0);

  const getSymbol = () => {
    symbol.current = symbol.current + 1;
    return symbol.current;
  };

  const getIpAddress = () => {
    ipAddress.current = ipAddress.current + 1;
    return ipAddress.current;
  };

  const getMacAddress = () => {
    let address = macAddress.current;
    macAddress.current = mac(address);
    return macAddress.current;
  };

  const getPortNumber = () => {
    portNumber.current = portNumber.current + 1;
    return portNumber.current;
  };

  /**
   * Method that returns a device from the states
   * @param {*} device to look at
   * @returns a device
   */
  const getDevice = (device) => {
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
  };

  /**
   * Saves a device on db
   * @param {*} device
   */
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
   * Deletes a device from the state and the db
   */
  const deleteDevice = async () => {
    const device = getDevice(selectedDevice);

    // check what kind of device it is
    if (device.type === "controller") {
      deleteLinks(device); // deletes the links it had
      //delete on state
      const arr = controllers.filter(
        (controller) => controller.indicator !== device.indicator
      );
      //delete on bd
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

  /**
   * This method looks for all the connection the device had and delet them
   * @param {*} device to get deleted its links
   */
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

  /**
   * Erase everything in states and db, also reset default values
   */
  const startOver = () => {
    axios.get("/api/general/erase");
    setSelectedDevice(null);
    setSelectedDevice(null);
    setSelectedLink(null);
    setControllers([]);
    setHosts([]);
    setSwitches([]);
    setLinks([]);

    symbol.current = 1;
    ipAddress.current = 1;
    macAddress.current = "00:00:00:00:00:00";
    portNumber.current = 0;
  };

  /**
   * Loads from db to the states the information of a design
   * @param {*} formData
   */
  const loadFromDB = async (formData) => {
    await axios.get("/api/general/erase");
    await axios.post(`/api/general/load/`, formData);

    let DBControllers = await axios.get("/api/controllers");
    let DBSwitches = await axios.get("/api/switches");
    let DBHosts = await axios.get("/api/hosts");
    let DBLinks = await axios.get("/api/links");

    setControllers(DBControllers.data);
    setSwitches(DBSwitches.data);
    setHosts(DBHosts.data);
    setLinks(DBLinks.data);
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

    getSymbol,
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

import React, { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { Stage, Layer, Text, Line, Image } from "react-konva";
import { Modal, Typography, Box } from "@mui/material";
import useImage from "use-image";
import { SIZE } from "./config";
import * as uuid from "uuid";
import Border from "./border";
import axios from "../../config/axios";
import "./canva.css";

const style = {
  position: "absolute",
  gap: 2,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const createConnectionPoints = (source, destination) => {
  return [source.x, source.y, destination.x, destination.y];
};

const Canva = () => {
  const bgColor = "#90caf9";
  const linkColor = "#6a6fea";

  const state = useContext(AppContext);

  /**
   * This modal is used to alert that a connection is not allowed
   */
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  /**
   * pictures used for the devices
   */
  const [controllerImage] = useImage("/images/controller.png");
  const [switchImage] = useImage("/images/switch.png");
  const [hostImage] = useImage("/images/host.png");

  /**
   * Allows to see the line that forms while we drag an anchor from a device to other device
   */
  const [connectionPreview, setConnectionPreview] = useState(null);

  /**
   * This modal is used to alert that a connection is not allowed
   * @returns An error Modal
   */
  const ModalError = () => {
    return (
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          display="flex"
          flex-direction="column"
          alignItems="center"
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            You cannot do that!
          </Typography>
        </Box>
      </Modal>
    );
  };

  /**
   * Get mouse position
   * @param {*} e event
   * @returns a json with x and y
   */
  const getMousePos = (e) => {
    const position = e.target.position();
    const stage = e.target.getStage();
    const pointerPosition = stage.getPointerPosition();
    return {
      x: pointerPosition.x - position.x,
      y: pointerPosition.y - position.y,
    };
  };

  /**
   * This method updates the selected device.
   * This allows that a device shows its anchors to be connected to other devices.
   * If the selected "device" was a link, then its color is updated to make it stand over the other links.
   * @param {*} device
   */
  const handleSelection = (device) => {
    //nothing selected
    if (
      //nothing selected
      state.selectedDevice === null
    ) {
      state.setSelectedDevice(device);
    } else if (
      // a previous device is selectedm but there was another device connected
      state.selectedDevice.indicator !== device.indicator
    ) {
      if (state.selectedLink !== null) {
        changeLinkColor(state.getDevice(state.selectedLink), linkColor);
        state.setSelectedLink(null);
      }
      state.setSelectedDevice(null);
      state.setSelectedDevice(device);
    } else {
      state.setSelectedDevice(null);
    }
  };

  /**
   * This method is used to change a link's color.
   * @param {*} link a link
   * @param {*} color new color
   */
  const changeLinkColor = (link, color) => {
    let prevLinks = [
      ...state.links.filter(
        (foundlink) => foundlink.indicator !== link.indicator
      ),
    ];
    const prevLink = state.getDevice(link);
    prevLink.color = color;
    prevLinks = [...prevLinks, prevLink];
    state.setLinks(prevLinks);
  };

  /**
   * This method handles what happens to a link when it is selected and when it stops being selected
   * @param {*} link a link
   */
  const handleLinkSelection = (link) => {
    // if the last device was a link and now there is nothing selected then the link's color would be turn back to normal
    if (state.selectedDevice === null) {
      changeLinkColor(link, "black");
      state.setSelectedLink(state.getDevice(link));
      state.setSelectedDevice(state.getDevice(link));
    } else {
      // if previously there was a link selected and now there a new link selected then change the color of the two links
      if (state.selectedDevice.indicator !== link.indicator) {
        if (state.selectedLink !== null) {
          changeLinkColor(state.selectedLink, linkColor);
        }
        changeLinkColor(link, "black");
        state.setSelectedLink(state.getDevice(link));
        state.setSelectedDevice(state.getDevice(link));
        // the previous device was not a link, now the selected device is a link, change color.
      } else if (state.selectedDevice.indicator === link.indicator) {
        changeLinkColor(state.getDevice(link), linkColor);
        state.setSelectedDevice(null);
        state.setSelectedLink(null);
      }
    }
  };

  /**
   * This method updates the position of a device
   * @param {*} e event
   * @param {*} device device being moved
   * @param {*} index
   */
  const handleDeviceDrag = (e, device, index) => {
    const position = e.target.position();
    const deviceFound = state.getDevice(device);

    if (deviceFound.type === "controller") {
      const devices = [...state.controllers];
      devices[index].x = position.x;
      devices[index].y = position.y;
      state.setControllers(devices);
    } else if (deviceFound.type === "host") {
      const devices = [...state.hosts];
      devices[index].x = position.x;
      devices[index].y = position.y;
      state.setHosts(devices);
    } else if (deviceFound.type === "switch") {
      const devices = [...state.switches];
      devices[index].x = position.x;
      devices[index].y = position.y;
      state.setSwitches(devices);
    }
  };

  /**
   * When checking for a connection this method tell us if the mouse is inside the area of a device.
   * @param {*} position x and y of the mouse
   * @param {*} device device to check if there is an interception with it
   * @returns
   */
  const hasIntersection = (position, device) => {
    const deviceFound = state.getDevice(device);
    return !(
      deviceFound.x > position.x ||
      deviceFound.x + SIZE < position.x ||
      deviceFound.y > position.y ||
      deviceFound.y + SIZE < position.y
    );
  };

  /**
   * This method checks if when we are dragging an anchor, the mouse is over a device.
   * @param {*} position x and y of the mouse
   * @param {*} device device to check if there is an interception with it
   * @returns
   */
  const detectConnection = (position, device) => {
    let intersectingDevice = null;

    // all devices in the canva at the moment
    const devices = [...state.controllers, ...state.hosts, ...state.switches];

    // check if the mouse if over any device
    intersectingDevice = devices.find(
      (dev) =>
        dev.indicator !== device.indicator && hasIntersection(position, dev)
    );

    return intersectingDevice ?? null;
  };

  /**
   * Creates a line from the anchor to the position of the mouse
   * @param {*} e drag event
   */
  const handleAnchorDragStart = (e) => {
    const position = e.target.position();
    setConnectionPreview(
      <Line
        x={position.x}
        y={position.y}
        points={createConnectionPoints(position, position)}
        stroke="black"
        strokeWidth={2}
      />
    );
  };

  /**
   * Updates the length of the line between the anchor and the mouse position
   * @param {*} e drag event
   */
  const handleAnchorDragMove = (e) => {
    const position = e.target.position();
    const mousePos = getMousePos(e);
    setConnectionPreview(
      <Line
        x={position.x}
        y={position.y}
        points={createConnectionPoints({ x: 0, y: 0 }, mousePos)}
        stroke="black"
        strokeWidth={2}
      />
    );
  };

  /**
   * Method that handles what happen when we stop the anchor movement
   * @param {*} e drag event
   * @param {*} device device where the drag ended
   */
  const handleAnchorDragEnd = async (e, device) => {
    setConnectionPreview(null);
    const stage = e.target.getStage();
    const mousePos = stage.getPointerPosition();

    // detects if there is a connection between devices
    const connectionTo = detectConnection(mousePos, device);
    //if there is any connection
    if (connectionTo !== null) {
      //beforehand are there even links?
      if (state.links.length !== 0) {
        //check that the new connection is not going to repeat
        const repeated = state.links.filter((link) => {
          if (
            link.source === device.symbol &&
            link.destination === connectionTo.symbol
          ) {
            return link;
          } else {
            //there are no repeated connections
            return null;
          }
        });

        //check that a switch is not going to connect to more than one controller
        const isThereAcontroller = state.links.filter((link) => {
          if (link.source === device.symbol && link.to.type === "controller") {
            return link;
          }
        });

        // check if I'am connecting to a controller
        let connectController =
          connectionTo.type === "controller" ? true : false;

        if (isThereAcontroller.length > 0 && connectController === true) {
          //launch error
          handleModalOpen();
        } else if (repeated.length !== 0) {
          //launch error
          handleModalOpen();
        } else {
          // the new connection is not repeated
          await createConectionTo(device, connectionTo);
        }
      } else {
        //there are no links, we proceed with np
        await createConectionTo(device, connectionTo);
      }
    }
  };

  /**
   * createsa link between devices save it on state and DB
   * @param {*} origin origin device
   * @param {*} destiny destiny device
   */
  const createConectionTo = async (origin, destiny) => {
    //update switch assignated controller
    if (destiny.type === "controller") {
      const arr = state.switches.map((eachSwitch) => {
        if (eachSwitch.symbol === origin.symbol) {
          //update eachSwitch.controller
          let controller = destiny.symbol;
          return {
            ...eachSwitch,
            controller,
          };
        } else {
          return eachSwitch;
        }
      });
      state.setSwitches(arr);
      //update on db the switch
      const update = arr.filter((switche) => {
        if (switche.symbol === origin.symbol) {
          return switche;
        }
      });
      try {
        await axios.put(`/api/switches/${update[0].indicator}`, update[0]);
      } catch (err) {
        // console.log("error mongo", err);
      }
    }

    if (destiny !== null) {
      const link = {
        indicator: uuid.v1(),
        delay: 0,
        loss: 0,
        bandwidth: 0,
        from: origin,
        to: destiny,
        source: origin.symbol,
        destination: destiny.symbol,
        type: "link",
        color: linkColor,
      };
      state.setLinks([...state.links, link]);
      state.saveDevice(link);
    }
  };

  /**
   * Controller component displayed on the canvas to be dragged and create new controllers
   * @returns a new controller when dragged on the canvas
   */
  const CanvaController = () => {
    let xp = 10;
    let yp = 1;
    return (
      <div className="canva_device">
        <div className="canva_device_picture">
          <Image
            image={controllerImage}
            x={xp}
            y={yp}
            width={SIZE}
            height={SIZE}
            draggable
            //new controller
            onDragEnd={(e) => {
              let controller = {
                indicator: uuid.v1(),
                name: "Controller",
                symbol: `c${state.getSymbol()}`,
                ip: `192.168.0.${state.getIpAddress()}`,
                port: `300${state.getPortNumber()}`,
                remote: true,
                type: "controller",
                x: e.target.x(),
                y: e.target.y(),
              };
              //save on state
              state.setControllers((prevControllers) => [
                ...prevControllers,
                controller,
              ]);
              //save on db
              state.saveDevice(controller);
            }}
          />
        </div>
        <div>
          <Text text="Controller" x={xp} y={yp + 52} />
        </div>
      </div>
    );
  };

  /**
   * Displays all created controllers on canvas
   */
  const allControllers = state.controllers.map((eachController, index) => {
    return (
      <div>
        <Image
          image={controllerImage}
          indicator={eachController.indicator}
          type={eachController.type}
          x={eachController.x}
          y={eachController.y}
          width={SIZE}
          height={SIZE}
          fill={bgColor}
          draggable
          perfectDrawEnabled={false}
          onClick={() => handleSelection(eachController)}
          onDragMove={(e) => handleDeviceDrag(e, eachController, index)}
          onDragEnd={() => {
            const controller = state.getDevice(eachController);
            axios.put(`/api/controllers/${controller.indicator}`, controller);
          }}
        />
        <Text
          text={eachController.name}
          x={eachController.x}
          y={eachController.y + SIZE}
        />
      </div>
    );
  });

  /**
   * Switch component displayed on the canvas to be dragged and create new switchs
   * @returns a new switch when dragged on the canvas
   */
  const CanvaSwitch = () => {
    let xp = 80;
    let yp = 1;
    return (
      <div>
        <Image
          image={switchImage}
          x={xp}
          y={yp}
          width={SIZE}
          height={SIZE}
          draggable
          // new switch
          onDragEnd={(e) => {
            let switche = {
              indicator: uuid.v1(),
              name: "Switch",
              symbol: `s${state.getSymbol()}`,
              protocol: "OVS",
              port: `300${state.getPortNumber()}`,
              mac: `${state.getMacAddress()}`,
              controller: "notLinkedYet",
              type: "switch",
              x: e.target.x(),
              y: e.target.y(),
            };
            //save on state
            state.setSwitches((prevSwitches) => [...prevSwitches, switche]);
            //save on db
            state.saveDevice(switche);
          }}
        />
        <Text text="Switch" x={xp + 5} y={yp + 52} />
      </div>
    );
  };

  /**
   * Displays all the created switches
   */
  const allSwitches = state.switches.map((eachSwitch, index) => {
    return (
      <div>
        <Image
          image={switchImage}
          indicator={eachSwitch.indicator}
          type={eachSwitch.type}
          x={eachSwitch.x}
          y={eachSwitch.y}
          width={SIZE}
          height={SIZE}
          fill={bgColor}
          draggable
          perfectDrawEnabled={false}
          onClick={() => handleSelection(eachSwitch)}
          onDragMove={(e) => handleDeviceDrag(e, eachSwitch, index)}
          onDragEnd={() => {
            const switche = state.getDevice(eachSwitch);
            axios.put(`/api/switches/${switche.indicator}`, switche);
          }}
        />
        <Text text={eachSwitch.name} x={eachSwitch.x} y={eachSwitch.y + SIZE} />
      </div>
    );
  });

  /**
   * Host component displayed on the canvas to be dragged and create new hosts
   * @returns a new host when dragged on the canvas
   */
  const CanvaHost = () => {
    let xp = 150;
    let yp = 1;
    return (
      <div>
        <Image
          image={hostImage}
          x={xp}
          y={yp}
          width={SIZE}
          height={SIZE}
          draggable
          //new host
          onDragEnd={(e) => {
            const host = {
              indicator: uuid.v1(),
              name: "Host",
              symbol: `h${state.getSymbol()}`,
              ip: `192.168.0.${state.getIpAddress()}`,
              mask: "255.255.255.0",
              mac: `${state.getMacAddress()}`,
              active: true,
              type: "host",
              x: e.target.x(),
              y: e.target.y(),
            };
            //save on state
            state.setHosts((prevHosts) => [...prevHosts, host]);
            //save on db
            state.saveDevice(host);
          }}
        />
        <Text text="Host" x={xp + 10} y={yp + 52} />
      </div>
    );
  };

  /**
   * Displays all hosts created
   */
  const allHosts = state.hosts.map((eachHost, index) => {
    return (
      <div>
        <Image
          image={hostImage}
          indicator={eachHost.indicator}
          type={eachHost.type}
          x={eachHost.x}
          y={eachHost.y}
          width={SIZE}
          height={SIZE}
          fill={bgColor}
          draggable
          perfectDrawEnabled={false}
          onClick={() => handleSelection(eachHost)}
          onDragMove={(e) => handleDeviceDrag(e, eachHost, index)}
          onDragEnd={() => {
            const host = state.getDevice(eachHost);
            axios.put(`/api/hosts/${host.indicator}`, host);
          }}
        />
        <Text text={eachHost.name} x={eachHost.x} y={eachHost.y + SIZE} />
      </div>
    );
  });

  /**
   * Renders all links between devices
   */
  const allLinks = state.links.map((connection) => {
    const fromDevice = state.getDevice(connection.from);
    const toDevice = state.getDevice(connection.to);
    const lineEnd = {
      x: toDevice.x - fromDevice.x,
      y: toDevice.y - fromDevice.y,
    };

    /**
     * Renders the points used to connect devices
     */
    const points = createConnectionPoints({ x: 0, y: 0 }, lineEnd);
    return (
      <Line
        indicator={connection.indicator}
        type={connection.type}
        x={fromDevice.x + SIZE / 2}
        y={fromDevice.y + SIZE / 2}
        points={points}
        stroke={connection.color}
        strokeWidth={5}
        onClick={() => handleLinkSelection(connection)}
      />
    );
  });

  /**
   * Render borders of the selected device.
   * However if the device selected is a controller the anchors
   * are not going to be rendered
   */
  const borders =
    state.selectedDevice !== null &&
    state.selectedDevice.type !== "link" &&
    state.selectedDevice.type !== "controller" &&
    state.selectedDevice.type !== "host" ? (
      <Border
        indicator={state.selectedDevice.indicator}
        device={state.getDevice(state.selectedDevice)}
        onAnchorDragEnd={async (e) =>
          await handleAnchorDragEnd(e, state.selectedDevice)
        }
        onAnchorDragMove={handleAnchorDragMove}
        onAnchorDragStart={handleAnchorDragStart}
      />
    ) : null;

  /**
   * Renders everything on the canva
   */
  return (
    <div className="canva_container">
      <div>
        <Stage width={window.innerWidth} height={window.innerHeight}>
          <Layer>
            <CanvaController />
            <CanvaSwitch />
            <CanvaHost />
            {allLinks}
            {allControllers}
            {allSwitches}
            {allHosts}
            {borders}
            {connectionPreview}
          </Layer>
        </Stage>
      </div>
      <div>
        <ModalError />
      </div>
    </div>
  );
};

export default Canva;

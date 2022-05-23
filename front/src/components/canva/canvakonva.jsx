import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import { Stage, Layer, Rect, Text, Line } from "react-konva";
import { SIZE } from "./config";
import * as uuid from "uuid";
import Border from "./border";
import axios from "../../config/axios";

function createConnectionPoints(source, destination) {
  return [source.x, source.y, destination.x, destination.y];
}

function Canva() {
  const state = useContext(AppContext);

  const [connectionPreview, setConnectionPreview] = useState(null);

  function getMousePos(e) {
    const position = e.target.position();
    const stage = e.target.getStage();
    const pointerPosition = stage.getPointerPosition();
    return {
      x: pointerPosition.x - position.x,
      y: pointerPosition.y - position.y,
    };
  }

  function handleSelection(device) {
    if (state.selectedDevice === null) {
      state.setSelectedDevice(device);
    } else if (state.selectedDevice.id !== device.id) {
      if (state.selectedLink !== null) {
        changeLinkColor(state.getDevice(state.selectedLink), "orange");
        state.setSelectedLink(null);
      }
      state.setSelectedDevice(device);
    } else {
      state.setSelectedDevice(null);
    }
  }

  const changeLinkColor = (link, color) => {
    let prevLinks = [
      ...state.links.filter((foundlink) => foundlink.id !== link.id),
    ];
    const prevLink = state.getDevice(link);
    prevLink.color = color;
    prevLinks = [...prevLinks, prevLink];
    state.setLinks(prevLinks);
  };

  function handleLinkSelection(link) {
    if (state.selectedDevice === null) {
      changeLinkColor(link, "black");
      state.setSelectedLink(state.getDevice(link));
      state.setSelectedDevice(state.getDevice(link));
    } else {
      if (state.selectedDevice.id !== link.id) {
        if (state.selectedLink !== null) {
          changeLinkColor(state.selectedLink, "orange");
        }
        changeLinkColor(link, "black");
        state.setSelectedLink(state.getDevice(link));
        state.setSelectedDevice(state.getDevice(link));
      } else if (state.selectedDevice.id === link.id) {
        changeLinkColor(state.getDevice(link), "orange");
        state.setSelectedDevice(null);
        state.setSelectedLink(null);
      }
    }
  }

  function handleDeviceDrag(e, device, index) {
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
  }

  function hasIntersection(position, device) {
    const deviceFound = state.getDevice(device);
    return !(
      deviceFound.x > position.x ||
      deviceFound.x + SIZE < position.x ||
      deviceFound.y > position.y ||
      deviceFound.y + SIZE < position.y
    );
  }

  function detectConnection(position, device) {
    let intersectingDevice = null;

    const devices = [...state.controllers, ...state.hosts, ...state.switches];

    intersectingDevice = devices.find(
      (dev) => dev.id !== device.id && hasIntersection(position, dev)
    );

    return intersectingDevice ?? null;
  }

  function handleAnchorDragStart(e) {
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
  }

  function handleAnchorDragMove(e) {
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
  }

  function handleAnchorDragEnd(e, device) {
    setConnectionPreview(null);
    const stage = e.target.getStage();
    const mousePos = stage.getPointerPosition();

    const connectionTo = detectConnection(mousePos, device);
    if (connectionTo !== null) {
      const link = {
        id: uuid.v1(),
        delay: 0,
        loss: 0,
        bandwidth: 0,
        from: device,
        to: connectionTo,
        source: device.symbol,
        destination: connectionTo.symbol,
        type: "link",
        color: "orange",
      };
      state.setLinks([...state.links, link]);
      state.saveDevice(link);
    }
  }

  function CanvaController() {
    return (
      <div>
        <Rect
          x={50}
          y={580}
          width={SIZE}
          height={SIZE}
          fill="red"
          draggable
          onDragEnd={(e) => {
            let controller = {
              id: uuid.v1(),
              name: "Controller",
              symbol: `c${state.getControllerSymbol()}`,
              ip: `192.161.0.${state.getIpAddress()}`,
              port: `300${state.getPortNumber()}`,
              remote: false,
              type: "controller",
              x: e.target.x(),
              y: e.target.y(),
              color: "red",
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
        <Text text="Controller" x={50} y={632} />
      </div>
    );
  }

  const allControllers = state.controllers.map((eachController, index) => {
    return (
      <div>
        <Rect
          id={eachController.id}
          type={eachController.type}
          x={eachController.x}
          y={eachController.y}
          width={SIZE}
          height={SIZE}
          fill={eachController.color}
          draggable
          perfectDrawEnabled={false}
          onClick={() => handleSelection(eachController)}
          onDragMove={(e) => handleDeviceDrag(e, eachController, index)}
          onDragEnd={() => {
            const controller = state.getDevice(eachController);
            axios.put(`/api/controllers/${controller.id}`, controller);
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

  function CanvaHost() {
    return (
      <div>
        <Rect
          x={160}
          y={580}
          width={SIZE}
          height={SIZE}
          fill="blue"
          draggable
          onDragEnd={(e) => {
            const host = {
              id: uuid.v1(),
              name: "Host",
              symbol: `h${state.getHostSymbol()}`,
              ip: `192.168.0.${state.getIpAddress()}`,
              mask: "255.255.255.0",
              mac: `00:00:00:00:00:0${state.getMacAddress()}`,
              active: true,
              type: "host",
              x: e.target.x(),
              y: e.target.y(),
              color: "blue",
            };
            state.setHosts((prevHosts) => [...prevHosts, host]);
            state.saveDevice(host);
          }}
        />
        <Text text="Host" x={160} y={632} />
      </div>
    );
  }

  const allHosts = state.hosts.map((eachHost, index) => {
    return (
      <div>
        <Rect
          id={eachHost.id}
          type={eachHost.type}
          x={eachHost.x}
          y={eachHost.y}
          width={SIZE}
          height={SIZE}
          fill={eachHost.color}
          draggable
          perfectDrawEnabled={false}
          onClick={() => handleSelection(eachHost)}
          onDragMove={(e) => handleDeviceDrag(e, eachHost, index)}
          onDragEnd={() => {
            const host = state.getDevice(eachHost);
            axios.put(`/api/hosts/${host.id}`, host);
          }}
        />
        <Text text={eachHost.name} x={eachHost.x} y={eachHost.y + SIZE} />
      </div>
    );
  });

  function CanvaSwitch() {
    return (
      <div>
        <Rect
          x={105}
          y={580}
          width={SIZE}
          height={SIZE}
          fill="yellow"
          draggable
          onDragEnd={(e) => {
            const switche = {
              id: uuid.v1(),
              name: "Switch",
              symbol: `s${state.getSwitchSymbol()}`,
              protocol: "OVS",
              port: `300${state.getPortNumber()}`,
              mac: `00:00:00:00:00:0${state.getMacAddress()}`,
              controller: "notLinkedYet",
              type: "switch",
              x: e.target.x(),
              y: e.target.y(),
              color: "yellow",
            };
            state.setSwitches((prevSwitches) => [...prevSwitches, switche]);
            state.saveDevice(switche);
          }}
        />
        <Text text="Switch" x={105} y={632} />
      </div>
    );
  }

  const allSwitches = state.switches.map((eachSwitch, index) => {
    return (
      <div>
        <Rect
          id={eachSwitch.id}
          type={eachSwitch.type}
          x={eachSwitch.x}
          y={eachSwitch.y}
          width={SIZE}
          height={SIZE}
          fill={eachSwitch.color}
          draggable
          perfectDrawEnabled={false}
          onClick={() => handleSelection(eachSwitch)}
          onDragMove={(e) => handleDeviceDrag(e, eachSwitch, index)}
          onDragEnd={() => {
            const switche = state.getDevice(eachSwitch);
            axios.put(`/api/switches/${switche.id}`, switche);
          }}
        />
        <Text text={eachSwitch.name} x={eachSwitch.x} y={eachSwitch.y + SIZE} />
      </div>
    );
  });

  //renders all links between devices
  const allLinks = state.links.map((connection) => {
    const fromDevice = state.getDevice(connection.from);
    const toDevice = state.getDevice(connection.to);
    const lineEnd = {
      x: toDevice.x - fromDevice.x,
      y: toDevice.y - fromDevice.y,
    };

    //renders the points used to connect devices
    const points = createConnectionPoints({ x: 0, y: 0 }, lineEnd);
    return (
      <Line
        id={connection.id}
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

  //render borders of the selected device
  const borders =
    state.selectedDevice !== null && state.selectedDevice.type !== "link" ? (
      <Border
        id={state.selectedDevice.id}
        //device={selectedDevice}
        device={state.getDevice(state.selectedDevice)}
        onAnchorDragEnd={(e) => handleAnchorDragEnd(e, state.selectedDevice)}
        onAnchorDragMove={handleAnchorDragMove}
        onAnchorDragStart={handleAnchorDragStart}
      />
    ) : null;

  //return that renders everything on the canva
  return (
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
  );
}

export default Canva;

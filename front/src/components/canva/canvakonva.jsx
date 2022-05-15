import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import { Stage, Layer, Rect, Text, Line } from "react-konva";
import { INITIAL_STATE, SIZE } from "./config";
import Border from "./border";

function createConnectionPoints(source, destination) {
  return [source.x, source.y, destination.x, destination.y];
}

function hasIntersection(position, device) {
  console.log("has intersection device");
  console.log(device);
  return !(
    device.x > position.x ||
    device.x + SIZE < position.x ||
    device.y > position.y ||
    device.y + SIZE < position.y
  );
}

function detectConnection(position, id, devices) {
  const intersectingDevice = Object.keys(devices).find((key) => {
    console.log("detect conection devices");
    console.log(devices);
    console.log("detect conection id");
    console.log(id);
    console.log("detect conection key");
    console.log(key);
    return key !== id && hasIntersection(position, devices[key]);
  });
  if (intersectingDevice) {
    return intersectingDevice;
  }
  return null;
}

function Canva() {
  const state = useContext(AppContext);

  useEffect(() => {
    console.log("connectionObjs");
    console.log(connections);
  });

  const [selectedDevice, setSelectedDevice] = useState(null);
  const [connectionPreview, setConnectionPreview] = useState(null);
  const [connections, setConnections] = useState([]);
  const [devices, setDevices] = useState(INITIAL_STATE.devices);

  function handleSelection(id, deviceType) {
    if (selectedDevice === id) {
      setSelectedDevice(null);
      state.setSelectedDevice(null);
    } else {
      setSelectedDevice(id);
      state.setSelectedDevice(deviceType);
    }
  }

  function handleDeviceDrag(e, key) {
    const position = e.target.position();
    setDevices({
      ...devices,
      [key]: {
        ...devices[key],
        ...position,
      },
    });
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

  function getMousePos(e) {
    const position = e.target.position();
    const stage = e.target.getStage();
    const pointerPosition = stage.getPointerPosition();
    return {
      x: pointerPosition.x - position.x,
      y: pointerPosition.y - position.y,
    };
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

  function handleAnchorDragEnd(e, id) {
    setConnectionPreview(null);
    const stage = e.target.getStage();
    const mousePos = stage.getPointerPosition();
    console.log("anchor end");
    console.log(id);
    const connectionTo = detectConnection(mousePos, id, devices);
    if (connectionTo !== null) {
      setConnections([
        ...connections,
        {
          to: connectionTo,
          from: id,
        },
      ]);
      console.log("conection created");
      console.log(connectionObjs);
    }
  }

  const defaultDevices = Object.keys(devices).map((key) => {
    const { type, x, y, colour } = devices[key];
    return (
      <Rect
        key={key}
        x={x}
        y={y}
        width={SIZE}
        height={SIZE}
        fill={colour}
        onClick={() => handleSelection(key, type)}
        draggable
        onDragMove={(e) => handleDeviceDrag(e, key)}
        perfectDrawEnabled={false}
      />
    );
  });

  const connectionObjs = connections.map((connection) => {
    const fromDevice = devices[connection.from];
    const toDevice = devices[connection.to];
    const lineEnd = {
      x: toDevice.x - fromDevice.x,
      y: toDevice.y - fromDevice.y,
    };

    const points = createConnectionPoints({ x: 0, y: 0 }, lineEnd);
    return (
      <Line
        x={fromDevice.x + SIZE / 2}
        y={fromDevice.y + SIZE / 2}
        points={points}
        stroke="orange"
        strokeWidth={5}
      />
    );
  });

  const borders =
    selectedDevice !== null ? (
      <Border
        id={selectedDevice}
        device={devices[selectedDevice]}
        onAnchorDragEnd={(e) => handleAnchorDragEnd(e, selectedDevice)}
        onAnchorDragMove={handleAnchorDragMove}
        onAnchorDragStart={handleAnchorDragStart}
      />
    ) : null;
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        {defaultDevices}
        {borders}
        {connectionObjs}
        {connectionPreview}
      </Layer>
    </Stage>
  );
}

export default Canva;

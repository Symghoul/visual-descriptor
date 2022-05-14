import React, { useContext, useEffect, useRef, useState } from "react";
import AppContext from "../../context/AppContext";
import { Stage, Layer, Rect, Text, Line } from "react-konva";
import { INITIAL_STATE, SIZE } from "./config";
import * as uuid from "uuid";
import Border from "./border";

function createConnectionPoints(source, destination) {
  return [source.x, source.y, destination.x, destination.y];
}

function Canva() {
  const state = useContext(AppContext);

  useEffect(() => {
    console.log("conections:");
    console.log(connections);
    console.log("controllers:");
    console.log(canvaControllers);
    console.log("connectionObjs");
    console.log(connectionObjs);
  });

  const [selectedDevice, setSelectedDevice] = useState(null);
  const [canvaControllers, setCanvaControllers] = useState([]);
  const [connectionPreview, setConnectionPreview] = useState(null);
  const [connections, setConnections] = useState([]);

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
    console.log(`selected id = ${device.id} and type= ${device.type}`);

    let deviceFound = null;

    if (device.type === "controller") {
      deviceFound = canvaControllers.find(
        (controller) => controller.id === device.id
      );
    }
    console.log(deviceFound);

    if (selectedDevice === null) {
      setSelectedDevice(deviceFound);
      state.setSelectedDevice(deviceFound);
    } else if (selectedDevice.id !== deviceFound.id) {
      setSelectedDevice(deviceFound);
      state.setSelectedDevice(deviceFound);
    } else {
      setSelectedDevice(null);
      state.setSelectedDevice(null);
    }
  }

  function handleDeviceDrag(e, device) {
    const position = e.target.position();

    if (device.type === "controller") {
      const deviceFound = canvaControllers.find(
        (controller) => controller.id === device.id
      );
      console.log(deviceFound);

      // update device
      const updatedDevice = { ...deviceFound, ...position };
      console.log(updatedDevice);

      //delete old controller
      const controllersArr = canvaControllers.filter(
        (controller) => controller.id !== deviceFound.id
      );

      setCanvaControllers([...controllersArr, updatedDevice]);

      //update controllers
      //setCanvaControllers((prevCanvaControllers) => [
      //  ...prevCanvaControllers,
      //  { ...deviceFound, ...position },
      //]);
    }
  }

  function hasIntersection(position, device) {
    if (device.type === "controller") {
      const deviceFound = canvaControllers.find(
        (controller) => controller.id === device.id
      );
      return !(
        deviceFound.x > position.x ||
        deviceFound.x + SIZE < position.x ||
        deviceFound.y > position.y ||
        deviceFound.y + SIZE < position.y
      );
    }
  }

  function detectConnection(position, device) {
    const intersectingDevice = canvaControllers.find((controller) => {
      //first conditional controller different than the start device
      return (
        controller.id !== device.id && hasIntersection(position, controller)
      );
    });
    if (intersectingDevice) {
      return intersectingDevice;
    }
    return null;
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
      setConnections([
        ...connections,
        {
          to: connectionTo,
          from: device,
        },
      ]);
    }
  }

  function CanvaDeviceController() {
    return (
      <div>
        <Rect
          x={50}
          y={580}
          width={SIZE}
          height={SIZE}
          fill="blue"
          draggable
          onDragEnd={(e) => {
            setCanvaControllers((prevCanvaControllers) => [
              ...prevCanvaControllers,
              {
                id: uuid.v1(),
                type: "controller",
                x: e.target.x(),
                y: e.target.y(),
                colour: "blue",
              },
            ]);
          }}
        />
        <Text text="Controller" x={50} y={632} />
      </div>
    );
  }

  const allControllers = canvaControllers.map((eachCanvaController) => {
    return (
      <Rect
        id={eachCanvaController.id}
        type={eachCanvaController.type}
        x={eachCanvaController.x}
        y={eachCanvaController.y}
        width={SIZE}
        height={SIZE}
        fill={eachCanvaController.colour}
        draggable
        perfectDrawEnabled={false}
        onClick={() => handleSelection(eachCanvaController)}
        onDragMove={(e) => handleDeviceDrag(e, eachCanvaController)}
      />
    );
  });

  //renders all lines/connections between devices
  const connectionObjs = connections.map((connection) => {
    //const fromDevice = canvaControllers[connection.from];
    const fromDevice = connection.from;
    const toDevice = connection.to;
    const lineEnd = {
      x: toDevice.x - fromDevice.x,
      y: toDevice.y - fromDevice.y,
    };

    //renders the points used to connect devices
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

  //render borders of the selected device
  const borders =
    selectedDevice !== null ? (
      <Border
        id={selectedDevice.id}
        device={selectedDevice}
        onAnchorDragEnd={(e) => handleAnchorDragEnd(e, selectedDevice)}
        onAnchorDragMove={handleAnchorDragMove}
        onAnchorDragStart={handleAnchorDragStart}
      />
    ) : null;

  //return that renders everything on the canva
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <CanvaDeviceController />
        {allControllers}
        {borders}
        {connectionObjs}
        {connectionPreview}
      </Layer>
    </Stage>
  );
}

export default Canva;

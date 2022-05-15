import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import { Stage, Layer, Rect, Text, Line } from "react-konva";
import { SIZE } from "./config";
import * as uuid from "uuid";
import Border from "./border";

function createConnectionPoints(source, destination) {
  return [source.x, source.y, destination.x, destination.y];
}

function Canva() {
  useEffect(() => {
    //console.log(connections);
    //console.log("conections:");
    //console.log(canvaControllers);
    //console.log("controllers:");
    //console.log(connectionObjs);
    //console.log("connectionObjs");
  });

  const state = useContext(AppContext);

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
    //console.log(`selected id = ${device.id} and type= ${device.type}`);

    let deviceFound = state.getDevice(device);
    //console.log(deviceFound);

    if (state.selectedDevice === null) {
      state.setSelectedDevice(deviceFound);
    } else if (state.selectedDevice.id !== deviceFound.id) {
      state.setSelectedDevice(deviceFound);
    } else {
      state.setSelectedDevice(null);
    }
  }

  function handleDeviceDrag(e, device) {
    const position = e.target.position();
    const deviceFound = state.getDevice(device);

    if (deviceFound.type === "controller") {
      //console.log(deviceFound);

      // update device
      const updatedDevice = { ...deviceFound, ...position };
      //console.log(updatedDevice);

      //delete old controller
      const controllersArr = state.controllers.filter(
        (controller) => controller.id !== deviceFound.id
      );

      state.setControllers([...controllersArr, updatedDevice]);

      //update controllers
      //setCanvaControllers((prevCanvaControllers) => [
      //  ...prevCanvaControllers,
      //  { ...deviceFound, ...position },
      //]);
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
    const intersectingDevice = state.controllers.find((controller) => {
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
            state.setControllers((prevControllers) => [
              ...prevControllers,
              {
                id: uuid.v1(),
                name: "Controller",
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

  const allControllers = state.controllers.map((eachController) => {
    return (
      <div>
        <Rect
          id={eachController.id}
          type={eachController.type}
          x={eachController.x}
          y={eachController.y}
          width={SIZE}
          height={SIZE}
          fill={eachController.colour}
          draggable
          perfectDrawEnabled={false}
          onClick={() => handleSelection(eachController)}
          onDragMove={(e) => handleDeviceDrag(e, eachController)}
        />
        <Text
          text={eachController.name}
          x={eachController.x}
          y={eachController.y + SIZE}
        />
      </div>
    );
  });

  //renders all lines/connections between devices
  const connectionObjs = connections.map((connection) => {
    //validar los dispositivos

    const fromDevice = state.controllers.find(
      (controller) => controller.id === connection.from.id
    );
    const toDevice = state.controllers.find(
      (controller) => controller.id === connection.to.id
    );
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
    state.selectedDevice !== null ? (
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
        <CanvaDeviceController />
        {connectionObjs}
        {borders}
        {allControllers}
        {connectionPreview}
      </Layer>
    </Stage>
  );
}

export default Canva;

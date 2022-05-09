import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Circle, Text, Line } from "react-konva";
import * as uuid from "uuid";

const SIZE = 50;
const points = [0, 0, SIZE, 0, SIZE, SIZE, 0, SIZE, 0, 0];

function Border({ device, id }) {
  const { x, y } = device;
  return (
    <Line
      x={x - 25}
      y={y - 25}
      points={points}
      stroke="black"
      strokeWidth={2}
      perfectDrawEnabled={false}
    />
  );
}

function getAnchorPoints(x, y) {
  const halfSize = SIZE / 2;
  return [
    {
      x: x - 10,
      y: y + halfSize,
    },
    {
      x: x + halfSize,
      y: y - 10,
    },
    {
      x: x + SIZE + 10,
      y: y + halfSize,
    },
    {
      x: x + halfSize,
      y: y + SIZE + 10,
    },
  ];
}

function dragBounds(ref) {
  if (ref.current !== null) {
    return ref.current.getAbsolutePosition();
  }
  return {
    x: 0,
    y: 0,
  };
}

function Anchor({ x, y, id }) {
  const anchor = useRef(null);
  return (
    <Circle
      x={x}
      y={y}
      radius={5}
      fill="black"
      draggable
      dragBoundFunc={() => dragBounds(anchor)}
      perfectDrawEnabled={false}
      ref={anchor}
    />
  );
}

function Canva() {
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [canvaControllers, setCanvaControllers] = useState([]);

  function handleSelection(id) {
    if (selectedDevice === id) {
      setSelectedDevice(null);
    } else {
      setSelectedDevice(id);
    }
  }

  function CanvaDeviceController() {
    return (
      <div>
        <Circle
          id="device"
          type="controller"
          x={50}
          y={600}
          radius={25}
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
                radius: 25,
                fill: "blue",
              },
            ]);
          }}
        />
        <Text text="Controller" x={23} y={628} />
      </div>
    );
  }

  const allControllers = canvaControllers.map((eachCanvaController) => {
    const { id, type, x, y, radius, fill } = eachCanvaController;
    return (
      <Circle
        id={id}
        type={type}
        x={x}
        y={y}
        radius={radius}
        fill={fill}
        draggable
        onClick={() => handleSelection(id)}
        perfectDrawEnabled={false}
      />
    );
  });

  const borders =
    selectedDevice !== null ? (
      <Border
        id={selectedDevice}
        device={canvaControllers
          .filter((device) => device.id === selectedDevice)
          .pop()}
      />
    ) : null;

  return (
    <Stage width={1060} height={640}>
      <Layer>
        <CanvaDeviceController />
        {allControllers}
        {borders}
      </Layer>
    </Stage>
  );
}

export default Canva;

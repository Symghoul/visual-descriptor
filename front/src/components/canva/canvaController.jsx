import React from "react";
import { Circle } from "react-konva";

function CanvaController(props) {
  return (
    <Circle
      name="draggableCircle"
      x={50}
      y={50}
      radius={25}
      fill={props.color}
      draggable
    />
  );
}

export default CanvaController;

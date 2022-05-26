import React, { useRef } from "react";
import { Circle } from "react-konva";

function dragBounds(ref) {
  if (ref.current !== null) {
    return ref.current.getAbsolutePosition();
  }
  return {
    x: 0,
    y: 0,
  };
}

function Anchor({ x, y, indicator, onDragMove, onDragEnd, onDragStart }) {
  const anchor = useRef(null);
  return (
    <Circle
      x={x}
      y={y}
      radius={5}
      fill="#001e86"
      draggable
      onDragStart={(e) => onDragStart(e, indicator)}
      onDragMove={(e) => onDragMove(e, indicator)}
      onDragEnd={(e) => onDragEnd(e, indicator)}
      dragBoundFunc={() => dragBounds(anchor)}
      perfectDrawEnabled={false}
      ref={anchor}
    />
  );
}

export default Anchor;

import React, { useRef } from "react";
import { Circle } from "react-konva";
import "./anchor.css";

/**
 * Used to track where the anchor is dropped
 * @param {*} ref of the current anchor
 * @returns absoluto position of the anchor
 */
function dragBounds(ref) {
  if (ref.current !== null) {
    return ref.current.getAbsolutePosition();
  }
  return {
    x: 0,
    y: 0,
  };
}

/**
 * Anchor component
 * @param {*} properties are the props of the component. Props are obtained after a device is clicked.
 * @returns The Anchor Component
 */
const Anchor = ({ x, y, indicator, onDragMove, onDragEnd, onDragStart }) => {
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
};

export default Anchor;

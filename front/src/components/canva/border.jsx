import React from "react";
import { Line } from "react-konva";
import Anchor from "./anchor";
import { SIZE } from "./config";

// Size is the distance from the center of the the device to the outside
const points = [0, 0, SIZE, 0, SIZE, SIZE, 0, SIZE, 0, 0];

/**
 * Creates an array with the positions of the anchors
 * @param {*} x relative position of the clicked device
 * @param {*} y relative position of the clicked device
 * @returns an array that indicates where the anchors are going to be
 */
function getAnchorPoints(x, y) {
  const halfSize = SIZE / 2;
  return [
    {
      x: x - 15,
      y: y + halfSize,
    },
    {
      x: x + halfSize,
      y: y - 15,
    },
    {
      x: x + SIZE + 15,
      y: y + halfSize,
    },
    {
      x: x + halfSize,
      y: y + SIZE + 15,
    },
  ];
}

/**
 * It's an invisible frame where the anchors are located
 * @param {*} properties are the props of the Border
 * @returns The border component
 */
function Border({
  device,
  indicator,
  onAnchorDragStart,
  onAnchorDragMove,
  onAnchorDragEnd,
}) {
  //if the device clicked exists
  if (device) {
    const { x, y } = device;
    const anchorPoints = getAnchorPoints(x, y); // this array contains 4 anchors
    const anchors = anchorPoints.map((position, index) => (
      <Anchor
        key={`anchor-${index}`}
        indicator={indicator}
        x={position.x}
        y={position.y}
        onDragStart={onAnchorDragStart}
        onDragMove={onAnchorDragMove}
        onDragEnd={onAnchorDragEnd}
      />
    ));
    return (
      <>
        <Line x={x} y={y} points={points} perfectDrawEnabled={false} />
        {anchors}
      </>
    );
  }
}
export default Border;

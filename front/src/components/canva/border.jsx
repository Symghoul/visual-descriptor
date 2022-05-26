import React from "react";
import { Line } from "react-konva";
import Anchor from "./anchor";
import { SIZE } from "./config";

const points = [0, 0, SIZE, 0, SIZE, SIZE, 0, SIZE, 0, 0];

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

function Border({
  device,
  indicator,
  onAnchorDragStart,
  onAnchorDragMove,
  onAnchorDragEnd,
}) {
  const { x, y } = device;
  const anchorPoints = getAnchorPoints(x, y);
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
export default Border;

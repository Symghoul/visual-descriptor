import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import { Stage, Layer, Rect, Text, Line } from "react-konva";
import { INITIAL_STATE, SIZE } from "./config";
import Border from "./border";

function createConnectionPoints(source, destination) {
  return [source.x, source.y, destination.x, destination.y];
}

function hasIntersection(position, step) {
  return !(
    step.x > position.x ||
    step.x + SIZE < position.x ||
    step.y > position.y ||
    step.y + SIZE < position.y
  );
}

/**
 *
 * @param {*} position
 * @param {*} id of the selected device/step
 * @param {*} steps
 * @returns
 */
function detectConnection(position, id, steps) {
  const intersectingStep = Object.keys(steps).find((key) => {
    return key !== id && hasIntersection(position, steps[key]);
  });
  if (intersectingStep) {
    return intersectingStep;
  }
  return null;
}

function Canva() {
  const state = useContext(AppContext);

  useEffect(() => {
    console.log(connections);
  });

  const [selectedStep, setSelectedStep] = useState(null);
  const [connectionPreview, setConnectionPreview] = useState(null);
  const [connections, setConnections] = useState([]);
  const [steps, setSteps] = useState(INITIAL_STATE.steps);

  function handleSelection(id, deviceType) {
    if (selectedStep === id) {
      setSelectedStep(null);
      state.setSelectedDevice(null);
    } else {
      setSelectedStep(id);
      state.setSelectedDevice(deviceType);
    }
  }

  function handleStepDrag(e, key) {
    const position = e.target.position();
    setSteps({
      ...steps,
      [key]: {
        ...steps[key],
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
    const connectionTo = detectConnection(mousePos, id, steps);
    if (connectionTo !== null) {
      setConnections([
        ...connections,
        {
          to: connectionTo,
          from: id,
        },
      ]);
    }
  }

  const stepObjs = Object.keys(steps).map((key) => {
    const { type, x, y, colour } = steps[key];
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
        onDragMove={(e) => handleStepDrag(e, key)}
        perfectDrawEnabled={false}
      />
    );
  });
  const connectionObjs = connections.map((connection) => {
    const fromStep = steps[connection.from];
    const toStep = steps[connection.to];
    const lineEnd = {
      x: toStep.x - fromStep.x,
      y: toStep.y - fromStep.y,
    };
    const points = createConnectionPoints({ x: 0, y: 0 }, lineEnd);
    return (
      <Line
        x={fromStep.x + SIZE / 2}
        y={fromStep.y + SIZE / 2}
        points={points}
        stroke="orange"
        strokeWidth={5}
      />
    );
  });
  const borders =
    selectedStep !== null ? (
      <Border
        id={selectedStep}
        step={steps[selectedStep]}
        onAnchorDragEnd={(e) => handleAnchorDragEnd(e, selectedStep)}
        onAnchorDragMove={handleAnchorDragMove}
        onAnchorDragStart={handleAnchorDragStart}
      />
    ) : null;
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        {stepObjs}
        {borders}
        {connectionObjs}
        {connectionPreview}
      </Layer>
    </Stage>
  );
}

export default Canva;

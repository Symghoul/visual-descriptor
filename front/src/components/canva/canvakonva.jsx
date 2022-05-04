import React, { useState, useRef } from "react";
import { Stage, Layer, Circle, Image } from "react-konva";
import useImage from "use-image";

export default function App() {
  const [circles, setCircles] = useState([]);
  const [ccircles, setCcircles] = useState([]);
  const [controllers, setControllers] = useState([]);
  const stageRef = useRef(null);
  const [image] = useImage(process.env.PUBLIC_URL + "/images/controller.png");

  const DController = () => {
    return (
      <Image
        name="draggableController"
        image={image}
        x={50}
        y={150}
        fill="green"
        draggable
        onDragEnd={(e) => {
          // push new circle to view
          // note that we must push circle first before returning draggable circle
          // because e.target.x returns draggable circle's positions
          setControllers((prevControllers) => [
            ...prevControllers,
            {
              x: e.target.x(),
              y: e.target.y(),
              fill: "red",
            },
          ]);

          // return draggable circle to original position
          // notice the dot (.) before "draggableCircle"
          //var stage = stageRef.current;
          //var draggableController = stage.findOne(".draggableController");
          //draggableController.position({ x: 50, y: 50 });
        }}
      />
    );
  };

  function Circulo() {
    return (
      <Circle
        name="draggableCircle"
        x={50}
        y={50}
        radius={25}
        fill="blue"
        draggable
        onDragEnd={(e) => {
          // push new circle to view
          // note that we must push circle first before returning draggable circle
          // because e.target.x returns draggable circle's positions
          setCircles((prevCircles) => [
            ...prevCircles,
            { x: e.target.x(), y: e.target.y(), fill: "red" },
          ]);

          // return draggable circle to original position
          // notice the dot (.) before "draggableCircle"
          //var stage = stageRef.current;
          //var draggableCircle = stage.findOne(".draggableCircle");
          //draggableCircle.position({ x: 50, y: 50 });
        }}
      />
    );
  }

  function Ccirculo() {
    return (
      <Circle
        name="draggableCcircle"
        x={50}
        y={100}
        radius={25}
        fill="green"
        draggable
        onDragEnd={(e) => {
          // push new circle to view
          // note that we must push circle first before returning draggable circle
          // because e.target.x returns draggable circle's positions
          setCcircles((prevCcircles) => [
            ...prevCcircles,
            { x: e.target.x(), y: e.target.y(), fill: "pink" },
          ]);

          // return draggable circle to original position
          // notice the dot (.) before "draggableCircle"
          //var stage = stageRef.current;
          //var draggableCircle = stage.findOne(".draggableCircle");
          //draggableCircle.position({ x: 50, y: 50 });
        }}
      />
    );
  }

  return (
    <Stage width={1060} height={640} ref={stageRef}>
      <Layer>
        <Circulo />
        {circles.map((eachCircle) => (
          <Circle
            x={eachCircle.x}
            y={eachCircle.y}
            radius={25}
            fill={eachCircle.fill}
          />
        ))}
        <Ccirculo />
        {ccircles.map((eachCcircle) => (
          <Circle
            x={eachCcircle.x}
            y={eachCcircle.y}
            radius={25}
            fill={eachCcircle.fill}
          />
        ))}
        <DController />
        {controllers.map((eachController) => (
          <Image x={eachController.x} y={eachController.y} />
        ))}
      </Layer>
    </Stage>
  );
}

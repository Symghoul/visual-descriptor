import Konva from "konva";
import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Circle, Text, Line } from "react-konva";

import CanvaController from "./canvaController";

function Canva() {
  useEffect(() => {
    console.log(positions);
    console.log(clicks);
  });

  const [clicks, setClicks] = useState(() => setUpClickCount());
  const [positions, setPositions] = useState(() => setUpPositions());

  const [canvaControllers, setCanvaControllers] = useState([]);
  const [canvaSwitches, setCanvaSwitches] = useState([]);
  const [canvaHosts, setCanvaHosts] = useState([]);
  const [canvaEthernets, setCanvaEthernets] = useState([]);
  const [canvaFibers, setCanvaFibers] = useState([]);
  const [canvaLinks, setCanvaLinks] = useState([]);
  const stageRef = useRef(null);

  function CanvaDeviceController() {
    return (
      <div>
        <Circle
          id="device"
          name="controller"
          x={50}
          y={600}
          radius={25}
          fill="blue"
          draggable
          onDragEnd={(e) => {
            //console.log(e.target.attrs);

            // push new circle to view
            // note that we must push circle first before returning draggable circle
            // because e.target.x returns draggable circle's positions
            setCanvaControllers((prevCanvaControllers) => [
              ...prevCanvaControllers,
              { x: e.target.x(), y: e.target.y(), fill: "blue" },
            ]);

            // return draggable circle to original position
            // notice the dot (.) before "draggableCircle"
            //var stage = stageRef.current;
            //var draggableCircle = stage.findOne(".draggableCircle");
            //draggableCircle.position({ x: 50, y: 50 });
          }}
        />
        <Text text="Controller" x={23} y={628} />
      </div>
    );
  }

  function CanvaDeviceSwitch() {
    return (
      <div>
        <Circle
          name="switch"
          x={100}
          y={600}
          radius={25}
          fill="red"
          draggable
          onDragEnd={(e) => {
            setCanvaSwitches((prevCanvaSwitches) => [
              ...prevCanvaSwitches,
              { x: e.target.x(), y: e.target.y(), fill: "red" },
            ]);
          }}
        />
        <Text text="Switch" x={85} y={628} />
      </div>
    );
  }

  function CanvaDeviceHost() {
    return (
      <div>
        <Circle
          name="host"
          x={150}
          y={600}
          radius={25}
          fill="yellow"
          draggable
          onDragEnd={(e) => {
            setCanvaHosts((prevCanvaHosts) => [
              ...prevCanvaHosts,
              { x: e.target.x(), y: e.target.y(), fill: "yellow" },
            ]);
          }}
        />
        <Text text="Host" x={138} y={628} />
      </div>
    );
  }

  function setUpClickCount() {
    return 0;
  }

  function setUpPositions() {
    return {
      posAx: 0,
      posAy: 0,
      posBx: 0,
      posBy: 0,
    };
  }

  //function updateLine(posAx, posAy, posBx, posBy) {
  //  Line.points([posAx, posAy, posBx, posBy]);
  //  Layer.batchDraw();
  //}

  function CreateLink() {
    const newLink = new Konva.Line({
      points: [
        positions.posAx,
        positions.posAy,
        positions.posBx,
        positions.posBy,
      ],
      pointerLength: 10,
      pointerWidth: 10,
      fill: "black",
      stroke: "black",
      strokeWidth: 4,
    });
    const newLinks = [...canvaLinks, newLink];
    setCanvaLinks(newLinks);

    console.log("------------");
    console.log(canvaLinks);
  }

  //useEffect(() => {
  //  if (cliks === 2) {
  //    setCliks(0);
  //  }
  //}, [cliks]);

  function CanvaDeviceEthernet() {
    return (
      <Circle
        name="ethernet"
        x={200}
        y={600}
        radius={25}
        fill="black"
        draggable
        onDragEnd={(e) => {
          setCanvaEthernets((prevCanvaEthernets) => [
            ...prevCanvaEthernets,
            { x: e.target.x(), y: e.target.y(), fill: "black" },
          ]);
        }}
      />
    );
  }

  const allControllers = canvaControllers.map((eachCanvaController) => {
    return (
      <Circle
        x={eachCanvaController.x}
        y={eachCanvaController.y}
        radius={25}
        fill={eachCanvaController.fill}
        draggable
        onClick={(event) => {
          console.log("--->> click");
          console.log(positions);
          console.log(clicks);

          if (clicks === 0) {
            setPositions((pos) => {
              setClicks((prevClicks) => prevClicks + 1);
              return {
                posAx: event.target.attrs.x,
                posAy: event.target.attrs.y,
                posBx: positions.posBx,
                posBy: positions.posBy,
              };
            });
          } else {
            setClicks(0);
            setPositions((pos) => {
              return {
                posAx: positions.posAx,
                posAy: positions.posAy,
                posBx: event.target.attrs.x,
                posBy: event.target.attrs.y,
              };
            });
            CreateLink();
          }
        }}
      />
    );
  });

  const allSwitches = canvaSwitches.map((eachCanvaSwitch) => {
    return (
      <Circle
        x={eachCanvaSwitch.x}
        y={eachCanvaSwitch.y}
        radius={25}
        fill={eachCanvaSwitch.fill}
        onClick={(event) => {
          console.log("--->> click");
          console.log(positions);
          console.log(clicks);

          if (clicks === 0) {
            setPositions((pos) => {
              setClicks((prevClicks) => prevClicks + 1);
              return {
                posAx: event.target.attrs.x,
                posAy: event.target.attrs.y,
                posBx: positions.posBx,
                posBy: positions.posBy,
              };
            });
          } else {
            setClicks(0);
            let posBx = event.target.attrs.x;
            let posBy = event.target.attrs.y;
            CreateLink(positions.posAx, positions.posAy, posBx, posBy);
            Layer.batchDraw();
          }
        }}
      />
    );
  });

  const allHosts = canvaHosts.map((eachCanvaHost) => {
    return (
      <Circle
        x={eachCanvaHost.x}
        y={eachCanvaHost.y}
        radius={25}
        fill={eachCanvaHost.fill}
        onClick={(event) => {
          console.log("--->> click");
          console.log(positions);
          console.log(clicks);

          if (clicks === 0) {
            setPositions((pos) => {
              setClicks((prevClicks) => prevClicks + 1);
              return {
                posAx: event.target.attrs.x,
                posAy: event.target.attrs.y,
                posBx: positions.posBx,
                posBy: positions.posBy,
              };
            });
          } else {
            setClicks(0);
            setPositions((pos) => {
              return {
                posAx: positions.posAx,
                posAy: positions.posAy,
                posBx: event.target.attrs.x,
                posBy: event.target.attrs.y,
              };
            });
          }
        }}
      />
    );
  });

  function CanvaDeviceFiber() {}

  return (
    <Stage width={1060} height={640} ref={stageRef}>
      <Layer>
        <CanvaDeviceController />
        {allControllers}
        <CanvaDeviceSwitch />
        {allSwitches}
        <CanvaDeviceHost />
        {allHosts}
        {canvaLinks.map((eachCanvaLink) => (
          <Line
            points={eachCanvaLink.points}
            pointerLength={eachCanvaLink.pointerLength}
            pointerWidth={eachCanvaLink.pointerWidth}
            fill={eachCanvaLink.fill}
            stroke={eachCanvaLink.stroke}
            strokeWidth={eachCanvaLink.strokeWidth}
            {...console.log("eachCanvaLink")}
            {...console.log(eachCanvaLink)}
          />
        ))}
      </Layer>
    </Stage>
  );
}

export default Canva;

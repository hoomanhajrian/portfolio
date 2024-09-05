import React, { useEffect, useState, Suspense, useRef } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Plane } from "@react-three/drei";
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { Running } from './model/Running';
import { Model } from "./model/Model";
import { Walls } from "../../walls/Walls";



const Game = () => {
  const [modelPos, updateModelPos] = useState([0, -15, 0]);
  const [switchState, updateSwitch] = useState(false);
  // loading textures
  const [wallTexture, wallRoughness, groundTexture, groundRoughness] = useLoader(TextureLoader, ["/textures/wall/brick-wall.jpg", "/textures/wall/brick-wall-rough.jpg"
    , "/textures/ground/asphalt.jpg", "/textures/ground/asphalt-rough.jpg"])
  // screen dimentions
  const [screenDimention, updateScreenDimentions] = useState({
    width: 0,
    height: 0,
  });
  // mouse coords
  const [globalCoords, setGlobalCoords] = useState({ x: 0, y: 0 });
  useEffect(() => {
    updateScreenDimentions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    const screenSizeHandler = () => {
      updateScreenDimentions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    const handleWindowMouseMove = (event) => {
      setGlobalCoords({
        x: event.screenX,
        y: event.screenY,
      });
    };

    window.addEventListener("resize", screenSizeHandler);
    window.addEventListener("mousemove", handleWindowMouseMove);

    return () => {
      window.removeEventListener("resize", screenSizeHandler);
      window.removeEventListener("mousemove", handleWindowMouseMove);
    };
  }, []);




  return (
    <Canvas
      shadows
      style={{
        width: "100%",
        height: "90vh",
        background: 'black',
      }}
      perspectiveCamera={{fov:90}}
    >
      <OrbitControls/>
      <ambientLight intensity={1} />
      {/* walls and ground*/}
      <Walls />
      {/* model */}
      <Running position={modelPos} />;
    </Canvas>
  )
};
export default Game;
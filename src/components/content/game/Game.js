import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Model } from './model/Model';
import { Walls } from "../../menu/Walls";
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";


const Game = () => {
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
    >

      <Physics gravity={[0, 1, 0]} interpolation={false} colliders={false}>
        <RigidBody>
        </RigidBody>
        {/* walls and ground*/}
        <Walls />
        {/* model */}
        <Model />;
        <CuboidCollider position={[0, 0, 0]} args={[20, 0.5, 20]} />
        <OrbitControls />
        <ambientLight intensity={1} />
      </Physics>
    </Canvas>
  )
};
export default Game;
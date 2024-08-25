import React, { useEffect, useState,Suspense } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls,PerspectiveCamera,Plane } from "@react-three/drei";
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import {Model} from "./model/Model";
import {Running} from './model/Running';

const Game = ()=>{
    const [projects, showProjects] = useState(false);
  const [switchState, updateSwitch] = useState(false);
  // loading textures
  const [wallTexture, wallRoughness, groundTexture,groundRoughness] = useLoader(TextureLoader, ["/textures/wall/brick-wall.jpg", "/textures/wall/brick-wall-rough.jpg"
    , "/textures/ground/asphalt.jpg","/textures/ground/asphalt-rough.jpg"])
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


    return(
        <Canvas
        shadows
        style={{
          width: "100%",
          height: "90vh",
          background: 'black',
        }}
      >
        <PerspectiveCamera makeDefault position={[-5, 6, 50]} fov={55}/>
        <OrbitControls />
        <ambientLight intensity={switchState ? 0.2 : 1} />
       
        {/* walls and ground*/}
        <group receiveShadow>
          {/* tv wall */}
          <Plane
            receiveShadow
            position={[0, 0, 0]}
            args={[65, 30]} // Width, height, depth. Default is [1, 1, 1]
          >
            <meshPhongMaterial map={wallTexture} bumpMap={wallRoughness} bumpScale={1.3}/>
          </Plane>
          
          {/* ground */}
          <Plane
            receiveShadow
            position={[0, -15, 32.5]}
            rotation={[-Math.PI / 2, 0, 0]}
            args={[65, 90]} // Width, height, depth. Default is [1, 1, 1]
           >
           <meshPhongMaterial map={groundTexture} bumpMap={groundRoughness} bumpScale={1.3}/>
          </Plane>
        </group>
        <Suspense fallback={null}>
            <Running position={[0, -15, 5]} />
         </Suspense>
      </Canvas>
    )
};
export default Game;
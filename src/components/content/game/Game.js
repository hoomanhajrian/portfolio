import React, { useEffect, useState, Suspense } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Plane } from "@react-three/drei";
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { Running } from './model/Running';
import { Model } from "./model/Model";
import { Walls } from "../../walls/Walls";

const Game = () => {
  const [modelPos,updateModelPos] = useState([0,-15,0]);
  const [modelDir,updateModelDir] = useState(0);
  const [modelState, updateModelState] = useState('idle');
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

  useEffect(() => {
    const handleKeydown = (e) => {
      e.preventDefault();
      const { key, keyCode } = e;
      console.log(key, keyCode);
      switch (keyCode) {
        case 37:
          // left
          updateModelState('turnLeft')
          break;
        case 38:
          // up
          updateModelState('walking');
          updateModelPos((prePos)=>{return [0,prePos[1],prePos[2] + 0.5]});
          break
        case 39:
          // right
          updateModelState('turnRight');
          break;
        case 40:
          // down
          updateModelState('backward');
          updateModelPos((prePos)=>{return [0,prePos[1],prePos[2] - 0.5]})
          break;
        default:
          updateModelState('idle')
          break;
      }
    };
    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
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
      <PerspectiveCamera makeDefault position={[0, 70, -40]} fov={70} />
      <OrbitControls />
      <ambientLight intensity={1} />

      {/* walls and ground*/}
        {(() => {
          switch (modelState) {
            case 'walking':
              return <Running position={modelPos} />;
            case 'backward':
              return <Running position={modelPos} />;
            case 'running':
              return <Running position={modelPos} />;
            case 'turningRight':
              return <Running position={modelPos} />;
            case 'runningLeft':
              return <Running position={modelPos}/>;
            case 'idle':
              return <Model position={modelPos} />;
            default:
              return <Model position={modelPos} />;
          }
        })()}
        <Walls/>
    </Canvas>
  )
};
export default Game;
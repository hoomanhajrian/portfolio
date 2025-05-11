import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import Planet from "./Planet";
import { Card } from "@mui/material";
import { CardHeader } from "@material-ui/core";
import Ring from "./Ring";

const planetData = [
  {
    name: "Sun",
    rotationValue: 0,
    position: [0, 0, 0],
    scale: [30, 30, 30],
    texture: "/textures/8k_sun.jpg",
  },
  {
    name: "Mercury",
    speed: 0.002,
    rotationValue: 50,
    position: [50, 0, 0],
    scale: [0.108, 0.108, 0.108],
    texture: "/textures/mercury.jpg",
    ring: {
      scale: [50, 50, 50],
      attributes: [0.999, 1, 128],
    },
  },
  {
    name: "Venus",
    speed: 0.001,
    rotationValue: 60,
    position: [60, 0, 0],
    scale: [0.26, 0.26, 0.26],
    texture: "/textures/venus.jpg",
    ring: {
      scale: [60, 60, 60],
      attributes: [0.999, 1, 128],
    },
  },
  {
    name: "Earth",
    speed: 0.003,
    rotationValue: 70,
    position: [70, 0, 0],
    scale: [0.27, 0.27, 0.27],
    texture: "/textures/earth.jpg",
    ring: {
      scale: [70, 70, 70],
      attributes: [0.999, 1, 128],
    },
  },
  {
    name: "Mars",
    speed: 0.008,
    rotationValue: 80,
    position: [80, 0, 0],
    scale: [0.14, 0.14, 0.14],
    texture: "/textures/mars.jpg",
    ring: {
      scale: [80, 80, 80],
      attributes: [0.999, 1, 128],
    },
  },
  {
    name: "Jupiter",
    speed: 0.005,
    rotationValue: 90,
    position: [90, 0, 0],
    scale: [2.7, 2.7, 2.7],
    texture: "/textures/jupiter.jpg",
    ring: {
      scale: [90, 90, 90],
      attributes: [0.999, 1, 128],
    },
  },
  {
    name: "Saturn",
    speed: 0.004,
    rotationValue: 100,
    position: [100, 0, 0],
    scale: [2.5, 2.5, 2.5],
    texture: "/textures/saturn.jpg",
    ring: {
      scale: [100, 100, 100],
      attributes: [0.999, 1, 128],
    },
  },
  {
    name: "Neptune",
    speed: 0.007,
    rotationValue: 110,
    position: [110, 0, 0],
    scale: [1.08, 1.08, 1.08],
    texture: "/textures/neptune.jpg",
    ring: {
      scale: [110, 110, 110],
      attributes: [0.999, 1, 128],
    },
  },
  {
    name: "Uranus",
    speed: 0.001,
    rotationValue: 120,
    position: [120, 0, 0],
    scale: [1.09, 1.09, 1.09],
    texture: "/textures/uranus.jpg",
    ring: {
      scale: [120, 120, 120],
      attributes: [0.999, 1, 128],
    },
  },
  {
    name: "Pluto",
    speed: 0.008,
    rotationValue: 130,
    position: [130, 0, 0],
    scale: [0.05, 0.05, 0.05],
    color: "#34cfeb",
    texture: "/textures/uranus.jpg",
    ring: {
      scale: [130, 130, 130],
      attributes: [0.999, 1, 128],
    },
  },
];

function SolarSystem() {
  return (
    <Card className="flowtingbox-card">
      <CardHeader
        title="Solar system"
        subheader="3D using Three.js (rotate using mouse or touch)"
      />
      <Suspense fallback={<p>loading...</p>}>
        <Canvas
          camera={{ position: [0, 100, 50], fov: 90, angle: -70 }}
          style={{
            backgroundColor: "#110626",
            width: "100%",
            height: "100vh",
          }}
        >
          <OrbitControls />
          <Stars />
          <ambientLight intensity={1.2} />
          <pointLight position={[10, 10, 10]} />
          {planetData.map((planet) => (
            <React.Fragment key={planet.name}>
              <Planet
                name={planet.name}
                speed={planet.speed}
                rotationValue={planet.rotationValue}
                position={planet.position}
                scale={planet.scale}
                color={planet.color}
                texture={planet.texture}
              />
              {planet.ring && (
                <Ring
                  scale={planet.ring.scale}
                  attributes={planet.ring.attributes}
                />
              )}
            </React.Fragment>
          ))}
        </Canvas>
      </Suspense>
    </Card>
  );
}

export default SolarSystem;
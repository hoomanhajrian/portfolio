import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, Text, RoundedBox } from "@react-three/drei";
import { keyframes } from "styled-components";

const Project3DCard = ({ position, data }) => {
  const cardContainerRef = useRef();
  const card = useRef();
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  useFrame(({ gl, scene, camera }) => {
    if (camera.position.x > -5) {
      // cardContainerRef.current.position.x =
      //   cardContainerRef.current.position.x + 0.1;
      cardContainerRef.current.position.z =
        cardContainerRef.current.position.z + 0.01;
      camera.position.z = camera.position.z + 0.001;
      camera.position.x = camera.position.x - 0.004;
      camera.rotation.y = camera.rotation.y - 0.0001;
    }
  });

  return (
    <group
      castShadow
      args={[3, 5, 0.3]} // Width, height, depth. Default is [1, 1, 1]
      ref={cardContainerRef}
      onPointerOver={(event) => {
        hover(true);
      }}
      onPointerOut={(event) => {
        hover(false);
      }}
    >
      <RoundedBox
        castShadow
        ref={card}
        position={[position[0], position[1], position[2]]}
        args={[3, 5, 0.3]} // Width, height, depth. Default is [1, 1, 1]
        radius={0.05} // Radius of the rounded corners. Default is 0.05
        smoothness={10} // The number of curve segments. Default is 4
        bevelSegments={4} // The number of bevel segments. Default is 4, setting it to 0 removes the bevel, as a result the texture is applied to the whole geometry.
        creaseAngle={0.4} // Smooth normals everywhere except faces that meet at an angle greater than the crease angle
        // scale={hovered ? 3 : 1}
        onClick={(event) => click(!clicked)}
      >
        <meshPhongMaterial color="lightblue" />
      </RoundedBox>
    </group>
  );
};

export default Project3DCard;

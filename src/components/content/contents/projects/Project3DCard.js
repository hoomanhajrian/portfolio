import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Html, Text, RoundedBox } from "@react-three/drei";

const Project3DCard = ({ position, data }) => {
  const ref = useRef();
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  //   let t = 0;

  //   useFrame((state, delta) => {
  //     t += props.speed ? props.speed : null;
  //     ref.current.position.x = props.rotationValue * Math.cos(t) + 0;
  //     ref.current.position.z = props.rotationValue * Math.sin(t) + 0; // These to strings make it work
  //     ref.current.rotation.y += 0.002;
  //   });

  return (
    <group ref={ref}>
      <RoundedBox
        position={position}
        args={[3, 5, 0.3]} // Width, height, depth. Default is [1, 1, 1]
        radius={0.05} // Radius of the rounded corners. Default is 0.05
        smoothness={4} // The number of curve segments. Default is 4
        bevelSegments={4} // The number of bevel segments. Default is 4, setting it to 0 removes the bevel, as a result the texture is applied to the whole geometry.
        creaseAngle={0.4} // Smooth normals everywhere except faces that meet at an angle greater than the crease angle
        scale={hovered ? 1.2 : 1}
        onClick={(event) => click(!clicked)}
        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}
      >
        <meshPhongMaterial color="lightblue" />
      </RoundedBox>
    </group>
  );
};

export default Project3DCard;

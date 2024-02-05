import React, { useRef, useState } from "react";
import { useFrame,useThree } from "@react-three/fiber";
import { Html, Text, RoundedBox } from "@react-three/drei";

const Project3DCard = ({ position, data }) => {
  const cardContainerRef = useRef();
  const card = useRef();
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  useFrame(({ gl, scene, camera }) => {
    if (cardContainerRef.current.position.x <= position[0] + 30) {
      cardContainerRef.current.position.x = cardContainerRef.current.position.x + 0.1;
      cardContainerRef.current.position.z = cardContainerRef.current.position.z + 0.1;
      camera.position.z = camera.position.z + 0.001;
      camera.position.x = camera.position.x - 0.004;
    }
  })

  // const tryAnimation = ()=>{
  //   let {camera} = useThree();
    
  // };

  return (
    <group ref={cardContainerRef}
      onPointerOver={tryAnimation}
      onPointerOut={(event) => { hover(false);}}>
      <RoundedBox
        ref={card}
        position={[-40 + position[0], position[1], -30 + position[2]]}
        args={[3, 5, 0.3]} // Width, height, depth. Default is [1, 1, 1]
        radius={0.05} // Radius of the rounded corners. Default is 0.05
        smoothness={4} // The number of curve segments. Default is 4
        bevelSegments={4} // The number of bevel segments. Default is 4, setting it to 0 removes the bevel, as a result the texture is applied to the whole geometry.
        creaseAngle={0.4} // Smooth normals everywhere except faces that meet at an angle greater than the crease angle
        scale={hovered ? 3 : 1}
        onClick={(event) => click(!clicked)}
      >
        <meshPhongMaterial color="lightblue" />
      </RoundedBox>
    </group>
  );
};

export default Project3DCard;


import React, {useState } from "react";
import { RoundedBox, Text3D, Image, Html } from "@react-three/drei";
import GitHubIcon from "@mui/icons-material/GitHub";
import LanguageIcon from "@mui/icons-material/Language";
import { useFrame } from "@react-three/fiber";
import { Tooltip } from "../../../tooltip/Tooltip";

const Project3DCard = ({ data, globalCoords, screenDimention }) => {
  const [showText,updateTextShow] = useState(false);
  const [hovered,updateCardHovered] = useState(false);

  useFrame(({camera}, delta, xrFrame)=>{
    if(camera.position.x < -12.5){
      updateTextShow(false);
    }
    else{
      updateTextShow(true);
    }
  })


  return (
    <group 
    onPointerEnter={()=>{
      updateCardHovered(true);
    }}
    onPointerLeave={()=>{
      updateCardHovered(false);
    }}
    >
      <RoundedBox
        castShadow
        position={data.position3D}
        args={[1, 12, 8]} // Width, height, depth. Default is [1, 1, 1]
        radius={0.15} // Radius of the rounded corners. Default is 0.05
        smoothness={10} // The number of curve segments. Default is 4
        bevelSegments={4} // The number of bevel segments. Default is 4, setting it to 0 removes the bevel, as a result the texture is applied to the whole geometry.
        creaseAngle={0.4} // Smooth normals everywhere except faces that meet at an angle greater than the crease angle
     >
        <meshPhongMaterial color={hovered?"lightBlue":"#007bff"} />
      </RoundedBox>
      <Text3D
        position={[data.position3D[0] - 0.5, data.position3D[1] + 4, data.position3D[2] - 3]}
        font={"/Source Sans 3 ExtraLight_Regular.json"}
        letterSpacing={-0.06}
        size={0.8}
        rotation={[0, -Math.PI / 2, 0]}
      >
        {data.name}
      </Text3D>
      <Text3D
        position={[data.position3D[0] - 0.5, data.position3D[1] + 4, data.position3D[2] - 3]}
        font={"/Source Sans 3 ExtraLight_Regular.json"}
        letterSpacing={-0.06}
        size={0.8}
        rotation={[0, -Math.PI / 2, 0]}
      >
        {data.name}
      </Text3D>
      
      {/* tooltip */}
     {hovered?<Tooltip text={data.description} position={data.position3D} offset={[-2,10,0]}/>:<></>}
     {/* links */}
      <Image url={data.imgUrl} position={[data.position3D[0] - 0.6, data.position3D[1] + 0.5, data.position3D[2]]} scale={[8, 6]}
        rotation={[0, -Math.PI / 2, 0]} />
      <Html position={[data.position3D[0] - 0.6, data.position3D[1] - 3, data.position3D[2] - 3]} scale={[8, 6]}
        rotation={[0, -Math.PI / 2, 0]}>
        <div style={{ display: showText ? 'none' : 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '5rem' }}>
          <a href={data.gitHub} target="_blank" rel="noreferrer">
            <GitHubIcon style={{ fontSize: "2rem" }} />
          </a>
          <a href={data.href} target="_blank" rel="noreferrer">
            <LanguageIcon style={{ fontSize: "2rem" }} />
          </a>
        </div>
      </Html>
    </group>
  );
};

export default Project3DCard

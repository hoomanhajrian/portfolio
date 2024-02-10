import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, Text, RoundedBox } from "@react-three/drei";
import GitHubIcon from "@mui/icons-material/GitHub";
import LanguageIcon from "@mui/icons-material/Language";

const Project3DCard = ({ data, globalCoords, screenDimention }) => {
  const cardContainerRef = useRef();
  const card = useRef();
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  useFrame(({ gl, scene, camera, clock }) => {
    // position: [2, 0, 40]

    const mouseCoordsX = Math.floor(globalCoords.x - screenDimention.width / 2);
    const mouseCoordsY = Math.floor(
      globalCoords.y - screenDimention.height / 2
    );

    if (mouseCoordsX > 50 && camera.position.x < 4) {
      camera.position.x = camera.position.x + 0.005;
    }
    if (mouseCoordsX < -50 && camera.position.x > -4) {
      camera.position.x = camera.position.x - 0.005;
    }
    if (mouseCoordsY < -50 && camera.position.y < 2) {
      camera.position.y = camera.position.y + 0.002;
    }
    if (mouseCoordsY > 50 && camera.position.y > -2) {
      camera.position.y = camera.position.y - 0.002;
    }
  });

  return (
    <group
      castShadow
      ref={cardContainerRef}
      onPointerOver={(event) => {
        hover(true);
      }}
      onPointerOut={(event) => {
        hover(false);
      }}
    >
      <Html
        castShadow
        position={[
          data.position3D[0] - 1.7,
          data.position3D[1] + 2.5,
          data.position3D[2],
        ]}
        className="card-scroll-bar"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            width: "6.5rem",
            height: "8.5rem",
            overflowY: "scroll",
            color:
              globalCoords.x - screenDimention.width / 2 > 200 ||
                globalCoords.x - screenDimention.width / 2 < -200
                ? "black"
                : "white",
          }}
        >
          <h3 style={{ fontSize: ".6rem", wordBreak: "no-break" }}>
            {data.name}
          </h3>
          <p style={{ fontSize: ".4rem", margin: "0" }}>{data.year}</p>
          <h4 style={{ fontSize: ".4rem" }}>{data.position}</h4>
          <img
            style={{ width: "100%", height: "100%" }}
            src={data.imgUrl}
            alt={data.name}
          />
          <p style={{ fontSize: ".5rem", margin: "0" }}>{data.description}</p>
        </div>
        <a href={data.gitHub} target="_blank" rel="noreferrer">
          <GitHubIcon style={{ fontSize: ".7rem" }} />
        </a>
        <a href={data.href} target="_blank" rel="noreferrer">
          <LanguageIcon style={{ fontSize: ".7rem" }} />
        </a>
      </Html>
      <RoundedBox
        castShadow
        ref={card}
        position={[data.position3D[0], data.position3D[1], data.position3D[2]]}
        args={[3.6, 5.8, 0.5]} // Width, height, depth. Default is [1, 1, 1]
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

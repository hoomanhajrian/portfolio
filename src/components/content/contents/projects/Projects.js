import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { RoundedBox, OrbitControls, Text3D } from "@react-three/drei";
import Project2DCard from "./Project2DCard";
import Project3DCard from "./Project3DCard";
import Model from "./Model";
import { Button } from "antd";

const projectsData = [
  {
    id: 0,
    name: "Go Hike",
    position: "Full Stack Developer",
    year: " 2020-2021",
    href: "#",
    description:
      "Cordova-based mobile application that shows the hiking trails around the user and the user is able to see the route to the trail and the trail route itself on the map.",
    imgUrl: "/img/gohike.jpg",
    gitHub: "https://github.com/costa-rodrigo/goHike",
    position3D: [-4, 0, 15],
  },
  {
    id: 1,
    name: "Farmer Fresh",
    position: "Full Stack Developer",
    year: " 2021-2022",
    href: "https://farmer-fresh-d266e.web.app/",
    description:
      "Java based mobile application that help farmers share their products and consumers are able to put an order for pick up or delivery.",
    imgUrl: "/img/farmerfresh.jpg",
    gitHub: "https://github.com/hoomanhajrian/FarmerFresh_android-app",
    position3D: [0, 0, 15],
  },
  {
    id: 2,
    name: "Patch App",
    position: "Full Stack Developer",
    year: " 2021-2022",
    href: "https://patch-app-a5afe.web.app/",
    description:
      "Online Platform for kids to learn, how to fix injuries in case of emergency. This platform was based on React Technology with the back end on AWS servers.",
    imgUrl: "/img/patchapp.jpg",
    gitHub: "https://github.com/costa-rodrigo/patch-frontend",
    position3D: [4, 0, 15],
  },

  {
    id: 3,
    name: "Movie Time",
    position: "Front End Developer",
    year: " 2022-2023",
    href: "https://movie-time-54da1.web.app/",
    description:
      "React based application using movie API and more features such as watching and commenting on the movies will be added later.",
    imgUrl: "/img/movie-time.jpg",
    gitHub: "https://github.com/hoomanhajrian/Moive-app",
    position3D: [-4, -6, 15],
  },
  {
    id: 4,
    name: "Wedding Planner",
    position: "Full Stack Developer",
    year: " 2022-2023",
    href: "https://react-redux-auth-544ed.web.app/",
    description:
      "We are here to make sure your event planning will go as perfect as it can be with the least affort using this platform. You can estimate your event total cost and book appointment for consultation about your event.",
    imgUrl: "/img/wedding.jpg",
    gitHub: "https://github.com/hoomanhajrian/EventPlanner",
    position3D: [0, -6, 15],
  },
  {
    id: 5,
    name: "Card Creator",
    position: "Full Stack Developer",
    year: " 2022-2023",
    href: "https://card-creator-9f5f3.web.app/",
    description:
      "Platform for customizing your own business card and ordering it with QR code and NFC features that you can add to your card.",
    imgUrl: "/img/card-creator.jpg",
    gitHub: "https://github.com/hoomanhajrian/card-creator",
    position3D: [4, -6, 15],
  },
  {
    id: 6,
    name: "Tajhiz Aras",
    position: "Full Stack Developer",
    year: " 2022-2023",
    href: "https://tajhizaras.ir/",
    description:
      "Online store for selling industrial kitchen equipment coded fully in React using Redux and many other libraries.(Site in farsi language)",
    imgUrl: "/img/tajhizaras.jpg",
    gitHub: "https://github.com/hoomanhajrian/tajhizaras",
    position3D: [-4, 6, 15],
  },
  {
    id: 7,
    name: "Hesab Ketab",
    position: "Full Stack Developer",
    year: " 2022-2023",
    href: "https://hesabketabapp.com/",
    description:
      "Online web application for small stores accounting and inventory management using React(TypeScript) and Nodejs",
    imgUrl: "/img/hesab.jpg",
    gitHub: "https://github.com/hoomanhajrian/hesabketab",
    position3D: [0, 6, 15],
  },
  {
    id: 8,
    name: "LapseMoon",
    position: "Full Stack Developer",
    year: " 2022-2023",
    href: "https://lapsemoon-hoomanhajrian.vercel.app/",
    description:
      "Web site for photographer introduction and portfolio and resume using Nextjs and Nodejs.",
    imgUrl: "/img/lapsemoon.jpeg",
    gitHub: "https://github.com/hoomanhajrian/lapsemoon",
    position3D: [4, 6, 15],
  },
  {
    id: 9,
    name: "Littlesellca",
    position: "Full Stack Developer",
    year: " 2023-current",
    href: "https://littlesellca.com",
    description:
      "Online Platform to connect web customers to Amazon Market place and the business social media.",
    imgUrl: "/img/littesellca.jpg",
    gitHub: "https://github.com/hoomanhajrian/littlesellca",
    position3D: [-8, 6, 15],
  },
  {
    id: 10,
    name: "Pacivil",
    position: "Full Stack Developer",
    year: " 2023-2024",
    href: "https://pacivil.com",
    description:
      "Website using Next.js technology using react for front end and simple mail service for backend all server side rendered.",
    imgUrl: "/img/pacivil.jpg",
    gitHub: "https://github.com/hoomanhajrian/pacivil",
    position3D: [-8, 0, 15],
  },
];

const Projects = () => {
  const modelRef = useRef();
  const [screenDimention, updateScreenDimentions] = useState({
    width: 0,
    height: 0,
  });
  const [pointerHovered, updatePointerHover] = useState(false);
  const [view3D, update3D] = useState(true);
  const buttonRef = useRef();

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
    if (pointerHovered) {
      document.body.style.cursor = "pointer";
    } else {
      document.body.style.cursor = "default";
    }
  }, [pointerHovered]);

  if (screenDimention.width <= 1200 || !view3D) {
    return (
      <div className="projects">
        <h2 className="projects-header">Project Experience</h2>
        <Button
          disabled={screenDimention.width <= 1200}
          type="primary"
          style={{ marginRight: "auto", marginLeft: "auto", display: "block" }}
          onClick={() => {
            update3D(true);
          }}
        >
          3D View (Desktop Only)
        </Button>
        <div className="cards-container">
          {projectsData.map((data) => {
            return <Project2DCard data={data} update3D={update3D} />;
          })}
        </div>
      </div>
    );
  } else {
    return (
      <Canvas
        shadows
        camera={{ position: [2, 0, 40], fov: 50, angel: 0 }}
        style={{
          width: "100%",
          height: "90vh",
        }}
      >
        {/* <OrbitControls /> */}
        {globalCoords.x - screenDimention.width / 2 > 200 ||
        globalCoords.x - screenDimention.width / 2 < -200 ? (
          <ambientLight intensity={1.25} />
        ) : (
          <ambientLight intensity={0.5} />
        )}

        <Text3D
          position={[-15, -6, 20]}
          font={"/Source Sans 3 ExtraLight_Regular.json"}
          letterSpacing={-0.06}
          size={1.5}
        >
          PROJECTS
          <meshPhongMaterial color={"#000"} />
        </Text3D>
        <RoundedBox
          ref={buttonRef}
          receiveShadow
          position={[12, 0, 15]}
          args={[6, 3, 1]} // Width, height, depth. Default is [1, 1, 1]
          radius={0.1} // Radius of the rounded corners. Default is 0.05
          smoothness={4} // The number of curve segments. Default is 4
          bevelSegments={4} // The number of bevel segments. Default is 4, setting it to 0 removes the bevel, as a result the texture is applied to the whole geometry.
          creaseAngle={0.4} // Smooth normals everywhere except faces that meet at an angle greater than the crease angle
          onPointerOver={() => {
            updatePointerHover(true);
          }}
          onPointerOut={() => {
            updatePointerHover(false);
          }}
          onClick={() => {
            update3D(false);
          }}
        >
          <meshPhongMaterial color={pointerHovered ? "darkblue" : "#1677ff"} />
        </RoundedBox>
        <Text3D
          position={[9, -0.5, 16]}
          font={"/Source Sans 3 ExtraLight_Regular.json"}
          letterSpacing={-0.06}
          size={1}
        >
          2D Version
          <meshPhongMaterial color="#fff" />
        </Text3D>
        {projectsData.map((cardData) => {
          return (
            <Project3DCard
              key={cardData.id}
              data={cardData}
              globalCoords={globalCoords}
              screenDimention={screenDimention}
            />
          );
        })}
        <group receiveShadow>
          <RoundedBox
            receiveShadow
            position={[0, 0, 0]}
            args={[200, 200, 0.5]} // Width, height, depth. Default is [1, 1, 1]
            radius={0.05} // Radius of the rounded corners. Default is 0.05
            smoothness={4} // The number of curve segments. Default is 4
            bevelSegments={4} // The number of bevel segments. Default is 4, setting it to 0 removes the bevel, as a result the texture is applied to the whole geometry.
            creaseAngle={0.4} // Smooth normals everywhere except faces that meet at an angle greater than the crease angle
          >
            <meshPhongMaterial color="#fff" />
          </RoundedBox>
        </group>
        <group receiveShadow>
          <RoundedBox
            receiveShadow
            position={[0, 0, 0]}
            args={[200, 200, 0.5]} // Width, height, depth. Default is [1, 1, 1]
            radius={0.05} // Radius of the rounded corners. Default is 0.05
            smoothness={4} // The number of curve segments. Default is 4
            bevelSegments={4} // The number of bevel segments. Default is 4, setting it to 0 removes the bevel, as a result the texture is applied to the whole geometry.
            creaseAngle={0.4} // Smooth normals everywhere except faces that meet at an angle greater than the crease angle
          >
            <meshPhongMaterial color="#fff" />
          </RoundedBox>
        </group>
        <group>
          <spotLight
            castShadow
            position={[-19, -1, 24]}
            color="white"
            fov={"20"}
            intensity={1.5}
            target={modelRef.current}
          />
          <RoundedBox
            receiveShadow
            position={[-15, 0, 20]}
            args={[10, 5, 0]} // Width, height, depth. Default is [1, 1, 1]
            radius={0.05} // Radius of the rounded corners. Default is 0.05
            smoothness={4} // The number of curve segments. Default is 4
            bevelSegments={4} // The number of bevel segments. Default is 4, setting it to 0 removes the bevel, as a result the texture is applied to the whole geometry.
            creaseAngle={0.4} // Smooth normals everywhere except faces that meet at an angle greater than the crease angle
          >
            <meshPhongMaterial color="red" />
          </RoundedBox>
          <RoundedBox
            receiveShadow
            position={[-15, -2.5, 22.3]}
            args={[10, 0, 4.7]} // Width, height, depth. Default is [1, 1, 1]
            radius={0.05} // Radius of the rounded corners. Default is 0.05
            smoothness={4} // The number of curve segments. Default is 4
            bevelSegments={4} // The number of bevel segments. Default is 4, setting it to 0 removes the bevel, as a result the texture is applied to the whole geometry.
            creaseAngle={0.4} // Smooth normals everywhere except faces that meet at an angle greater than the crease angle
          >
            <meshPhongMaterial color="orange" />
          </RoundedBox>
          <RoundedBox
            receiveShadow
            position={[-20, 0, 22]}
            args={[0, 5, 5]} // Width, height, depth. Default is [1, 1, 1]
            radius={0.05} // Radius of the rounded corners. Default is 0.05
            smoothness={4} // The number of curve segments. Default is 4
            bevelSegments={4} // The number of bevel segments. Default is 4, setting it to 0 removes the bevel, as a result the texture is applied to the whole geometry.
            creaseAngle={0.4} // Smooth normals everywhere except faces that meet at an angle greater than the crease angle
          >
            <meshPhongMaterial color="blue" />
          </RoundedBox>
          <Model position={[-15, -2.4, 22]} ref={modelRef} />
        </group>
      </Canvas>
    );
  }
};

export default Projects;

import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Billboard, Html, Text, RoundedBox } from "@react-three/drei";
import Project2DCard from "./Project2DCard";
import Project3DCard from "./Project3DCard";

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
    position3D: [-4, 0, 0],
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
    position3D: [0, 0, 0],
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
    position3D: [4, 0, 0],
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
    position3D: [-4, -6, 0],
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
    position3D: [0, -6, 0],
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
    position3D: [4, -6, 0],
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
    position3D: [-4, 6, 0],
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
    position3D: [0, 6, 0],
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
    position3D: [4, 6, 0],
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
    position3D: [-8, 6, 0],
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
    position3D: [-8, 0, 0],
  },
];

const Projects = () => {
  const [screenWidth, updateScreenWidth] = useState();
  useEffect(() => {
    updateScreenWidth(window.innerWidth);
    const screenSizeHandler = () => {
      updateScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", screenSizeHandler);
    return () => {
      window.removeEventListener("resize", screenSizeHandler);
    };
  }, []);
  if (screenWidth <= 1200) {
    return (
      <div className="projects">
        <h2 className="projects-header">Project Experience</h2>
        <div className="cards-container">
          {projectsData.map((data) => {
            return <Project2DCard data={data} />;
          })}
        </div>
      </div>
    );
  } else {
    return (
      <Suspense fallback={<p>loading...</p>}>
        <Canvas
          camera={{ position: [18, 6, 25], fov: 50, angel: 0 }}
          style={{
            width: "100%",
            height: "100vh",
          }}
        >
          <ambientLight intensity={1.2} />
          <pointLight position={[-18, 6, 19]} />
          <Billboard position={[4, 1.7, 16]}>
            <Html>
              <h1>Projects</h1>
            </Html>
          </Billboard>
          {projectsData.map((cardData) => {
            return (
              <Project3DCard
                key={cardData.id}
                data={cardData}
                position={cardData.position3D}
              />
            );
          })}
          <RoundedBox
            position={[[0, 0, 0]]}
            args={[12, 12, 12]} // Width, height, depth. Default is [1, 1, 1]
            radius={0.05} // Radius of the rounded corners. Default is 0.05
            smoothness={4} // The number of curve segments. Default is 4
            bevelSegments={4} // The number of bevel segments. Default is 4, setting it to 0 removes the bevel, as a result the texture is applied to the whole geometry.
            creaseAngle={0.4} // Smooth normals everywhere except faces that meet at an angle greater than the crease angle
          >
            <meshPhongMaterial color="#000" />
          </RoundedBox>
        </Canvas>
      </Suspense>
    );
  }
};

export default Projects;

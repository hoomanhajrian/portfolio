import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import GitHubIcon from "@mui/icons-material/GitHub";
import LanguageIcon from "@mui/icons-material/Language";

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
  },
];

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const Projects = () => {
  return (
    <div className="projects">
      <h2 className="projects-header">Project Experience</h2>
      <div className="cards-container">
        {projectsData.map((data) => {
          return (
            <Card key={data.id} className={`project-card card${data.id}`}>
              <CardContent className="project-card-content">
                <Typography
                  className="project-card-text"
                  gutterBottom
                  variant="h4"
                >
                  {data.name}
                </Typography>
                <Typography
                  className="project-card-text"
                  gutterBottom
                  variant="h6"
                >
                  {data.position}
                </Typography>
                <Typography
                  className="project-card-text"
                  gutterBottom
                  variant="h6"
                >
                  {data.year}
                </Typography>
                <CardMedia component="img" image={data.imgUrl} />
                <Typography
                  variant="body1"
                  color="textSecondary"
                  className="project-card-description"
                  component="p"
                >
                  {data.description}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                  }}
                >
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="a"
                    href={data.gitHub}
                    target="_blank"
                    rel="noreferrer"
                    className="project-card-link"
                  >
                    <GitHubIcon />
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="a"
                    href={data.href}
                    target="_blank"
                    rel="noreferrer"
                    className="project-card-link"
                  >
                    <LanguageIcon />
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Projects;

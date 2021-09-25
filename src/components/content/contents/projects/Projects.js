import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';


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

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}


const Projects = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (

        <div className="projects">
            <h2 className="projects-header">Project Experience</h2>
            <div className="cards-container">
                <AppBar position="static">
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                        <Tab label="Farmer Fresh" {...a11yProps(0)} />
                        <Tab label="Patch App" {...a11yProps(1)} />
                        <Tab label="Go Hike" {...a11yProps(2)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} className="card-container" index={0}>
                    <img className="card-image" alt="farmer fresh" src="./img/farmerfresh.jpg" />
                    <Card className="project-card card1">
                        <CardContent>
                            <Typography gutterBottom variant="h4" component="h2">
                                Farmer Fresh
                            </Typography>
                            <Typography gutterBottom variant="h5" component="h2">
                                Project Manager/Full Stack Developer
                            </Typography>
                            <Typography gutterBottom variant="h6" component="h2">
                                2021 - 2022
                            </Typography>
                            <Typography gutterBottom variant="h5" component="h2">
                                <a href="https://farmerfresh.ca/" target="_blank" rel="noreferrer">farmerfresh.ca</a>
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Java based mobile application that help farmers share their products and consumers are able to put an order for pick up or delivery.
                            </Typography>
                        </CardContent>
                    </Card>
                </TabPanel>
                <TabPanel value={value} className="card-container" index={1}>
                    <img className="card-image" alt="patchapp" src="./img/patchapp.jpg" />
                    <Card className="project-card card2">

                        <CardMedia
                            className="card-media"
                            image="/static/images/cards/contemplative-reptile.jpg"
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h4" component="h2">
                                Patch App
                            </Typography>
                            <Typography gutterBottom variant="h5" component="h2">
                                Full Stack Developer
                            </Typography>
                            <Typography gutterBottom variant="h6" component="h2">
                                2020 - 2021
                            </Typography>
                            <Typography gutterBottom variant="h5" component="h2">
                                <a href="https://patch-app.ca/" target="_blank" rel="noreferrer">patch-app.ca</a>
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Online Platform for kids to learn, how to fix injuries in case of emergency. This platform was based on React Technology with the back end on AWS servers.
                            </Typography>
                        </CardContent>

                    </Card>
                </TabPanel>
                <TabPanel value={value} className="card-container" index={2}>
                    <img className="card-image" alt="gohike-app" src="./img/gohike-card-pic.jpg" />
                    <Card className="project-card card3">

                        <CardMedia
                            className="card-media"
                            image="/static/images/cards/contemplative-reptile.jpg"
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h4" component="h2">
                                Go Hike
                            </Typography>
                            <Typography gutterBottom variant="h5" component="h2">
                                Full Stack Developer
                            </Typography>
                            <Typography gutterBottom variant="h6" component="h2">
                                2020 - 2021
                            </Typography>
                            <Typography gutterBottom variant="h5" component="h2">
                                <a href="http://gohike.ca/" target="_blank" rel="noreferrer">goHike.ca</a>
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Cordova-based mobile application that shows the hiking trails around the user and the user is able to see the route to the trail and the trail route itself on the map.
                            </Typography>
                        </CardContent>
                    </Card>
                </TabPanel>
            </div>
        </div>
    )
};


export default Projects;

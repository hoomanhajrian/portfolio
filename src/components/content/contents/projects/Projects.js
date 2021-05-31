import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

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

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: 224,
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}));

const Projects = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="projects">
            <h2 className="projects-header">Project Experience</h2>
            <div className="cards-container">
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    className={classes.tabs}
                >
                    <Tab label="Farmer Fresh" {...a11yProps(0)} />
                    <Tab label="Patch-App" {...a11yProps(1)} />
                    <Tab label="Go Hike" {...a11yProps(2)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <Card className="project-card card1">
                        <CardMedia
                            className="card-media"
                            image="./farmerfresh.jpg"
                            title="farmer fresh project"
                        />
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
                                <a href="https://farmerfresh.ca/" target="_blank">farmerfresh.ca</a>
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Java based mobile application that help farmers share their products and consumers are able to put an order for pick up or delivery.
                            </Typography>
                        </CardContent>
                    </Card>
                </TabPanel>
                <TabPanel value={value} index={1}>
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
                                <a href="https://patch-app.ca/" target="_blank">patch-app.ca</a>
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Online Platform for kids to learn, how to fix injuries in case of emergency. This platfrom was based on React Technology with back end on AWS servers.
        </Typography>
                        </CardContent>

                    </Card>
                </TabPanel>
                <TabPanel value={value} index={2}>
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
                                <a href="http://gohike.ca/" target="_blank">goHike.ca</a>
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Cordova based mobile application that shows the hiking trails around the user and user is able to see the route to the trail and the trail route it self on the map.
        </Typography>
                        </CardContent>
                    </Card>
                </TabPanel>
            </div>
        </div>
    )
};


export default Projects;

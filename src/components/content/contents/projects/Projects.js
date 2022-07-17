import React from 'react';
import { CardActionArea, Card, CardContent, CardMedia } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';



const projectsData = [
    {
        id: 0,
        name: 'Wedding Planner',
        position: 'Full Stack Developer',
        year: ' 2022-2023',
        href: 'https://react-redux-auth-544ed.web.app/',
        description: 'We are here to make sure your event planning will go as perfect as it can be with the least affort using this platform. You can estimate your event total cost and book appointment for consultation about your event.',
        imgUrl: '/img/wedding.jpg'

    },
    {
        id: 1,
        name: 'Farmer Fresh',
        position: 'Full Stack Developer',
        year: ' 2021-2022',
        href: 'https://farmer-fresh-d266e.web.app/',
        description: 'Java based mobile application that help farmers share their products and consumers are able to put an order for pick up or delivery.',
        imgUrl: '/img/farmerfresh.jpg'

    },
    {
        id: 2,
        name: 'Patch App',
        position: 'Full Stack Developer',
        year: ' 2021-2022',
        href: 'https://patch-app-a5afe.web.app/',
        description: 'Online Platform for kids to learn, how to fix injuries in case of emergency. This platform was based on React Technology with the back end on AWS servers.',
        imgUrl: '/img/patchapp.jpg'
    },
    {
        id: 3,
        name: 'Go Hike',
        position: 'Full Stack Developer',
        year: ' 2020-2021',
        href: '#',
        description: 'Cordova-based mobile application that shows the hiking trails around the user and the user is able to see the route to the trail and the trail route itself on the map.',
        imgUrl: '/img/gohike.jpg'
    }
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
                {projectsData.map((data) => {
                    return (
                        <Card key={data.id} className={`project-card card${data.id}`}>
                            <CardActionArea
                                component="a"
                                href={data.href}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <CardContent>
                                    <Typography className='project-card-text' gutterBottom variant="h4" >
                                        {data.name}
                                    </Typography>
                                    <Typography className='project-card-text' gutterBottom variant="h6" >
                                        {data.position}
                                    </Typography>
                                    <Typography className='project-card-text' gutterBottom variant="h6" >
                                        {data.year}
                                    </Typography>
                                    <CardMedia
                                        component='img'
                                        image={data.imgUrl}
                                    />
                                    <Typography variant="body2" color="textSecondary"
                                        className='project-card-description'
                                        component="p">
                                        {data.description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
};


export default Projects;

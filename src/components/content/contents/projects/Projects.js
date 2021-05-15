import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';


const images = ["farmerfresh.jpg", "patchapp.jpg"]

function Projects() {

    return (
        <div className="projects">
            <h2 className="projects-header">Project Experience</h2>
            <div className="cards-container">
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
            </div>
        </div>
    );
}

export default Projects;

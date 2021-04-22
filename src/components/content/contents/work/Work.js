import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';

function Work() {
    return (
        <div className="work">
            <h2 className="work-title">Work Experience</h2>
            <div className="work-card-container">
                <Card className="work-card card1">
                    <CardActionArea>
                        <CardMedia
                            className="card-media"
                            image="./farmerfresh.jpg"
                            title="farmer fresh project"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                PART-TIME CELLPHONE TECHNICIAN / Vancouver, BC
                                </Typography>
                            <Typography gutterBottom variant="h6" component="h2">
                                Feb.2020 - Present
                                </Typography>
                            <Typography gutterBottom variant="h6" component="h2">
                                <a href="https://www.cellclinic.ca/" target="_blank">cellclinic.ca</a>
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Java based mobile application that help farmers share their products and consumers are able to put an order for pick up or delivery.
                                </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Card className="work-card card1">
                    <CardActionArea>
                        <CardMedia
                            className="card-media"
                            image="./farmerfresh.jpg"
                            title="farmer fresh project"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                ONLINE CUSTOMER CARE AND IT CONSULTANT / Gohar Shafa Co. / Tehran, Iran
                                </Typography>
                            <Typography gutterBottom variant="h6" component="h2">
                                Project Manager/Full Stack Developer
                                </Typography>
                            <Typography gutterBottom variant="h6" component="h2">
                                <a href="https://www.goharshafa.com/" target="_blank">goharshafa.com</a>
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Java based mobile application that help farmers share their products and consumers are able to put an order for pick up or delivery.
                                </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Card className="work-card card1">
                    <CardActionArea>
                        <CardMedia
                            className="card-media"
                            image="./farmerfresh.jpg"
                            title="farmer fresh project"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                CUSTOMER SERVICE AND TECH HARDWARE REPAIR / Sun Services / Tehran, Iran
                                </Typography>
                            <Typography gutterBottom variant="h6" component="h2">
                                Project Manager/Full Stack Developer
                                </Typography>
                            <Typography gutterBottom variant="h6" component="h2">
                                <a href="http://sunservice.com/" target="_blank">sunservice.com</a>
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Java based mobile application that help farmers share their products and consumers are able to put an order for pick up or delivery.
                                </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>
        </div>
    );
}

export default Work;

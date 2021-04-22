import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';


function Education() {
    return (
        <div className="education">
            <h2 className="education-title">education</h2>
            <Card className="education-card card1">
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
            <Card className="education-card card1">
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
            <Card className="education-card card1">
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
    );
}

export default Education;

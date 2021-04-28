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
                                <ul>
                                    <li>Repairing Android and IOS phones</li>
                                    <li>Cashier and customer services</li>
                                    <li>Working with designated software for diagnose or repair.</li>
                                </ul>
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
                                Jan.2019-Oct.2019
                                </Typography>
                            <Typography gutterBottom variant="h6" component="h2">
                                <a href="https://www.goharshafa.com/" target="_blank">goharshafa.com</a>
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                <ul>
                                    <li>Conducted online digital customer care and follow-up for clients of the medical equipment company.</li>
                                    <li>Enhanced customer satisfaction by creating a rapport with clients, through
                                    communication and diagnosis of problems and errors, and ensuring the issue was resolved.</li>
                                    <li>Performed on-site technology reports, maintaining the safety and smooth application of products and equipment.</li>
                                </ul>
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
                                Jan.2017-Jan.2019
                                </Typography>
                            <Typography gutterBottom variant="h6" component="h2">
                                <a href="http://sunservice.com/" target="_blank">sunservice.com</a>
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                <ul>
                                    <li>Diagnosed the hardware problem of a device for customers, ranging from mobile phones to desktop computers.</li>
                                    <li>Enhanced device performance through assembly of new parts, reconstruction and chipset manipulation.</li>
                                    <li>Consulted with customers and clients on their tech issues and needs, and performed bespoke repairs and construction based on their feedback and concerns.</li>
                                </ul>
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>
        </div>
    );
}

export default Work;

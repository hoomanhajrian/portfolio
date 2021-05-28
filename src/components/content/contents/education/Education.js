import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


function Education() {
    return (
        <div className="education">
            <h2 className="education-title">Education</h2>
            <div className="education-card-continer">
                <Card className="education-card card1">
                    <CardMedia
                        className="card-media"
                        image="./farmerfresh.jpg"
                        title="farmer fresh project"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Web and Mobile Development and Design
                                    </Typography>
                        <Typography gutterBottom variant="h6" component="h2">
                            Post Baccalaureate Diploma
                                    </Typography>
                        <Typography gutterBottom variant="h6" component="h2">
                            Langara College / Vancouver, BC
                                    </Typography>
                        <Typography gutterBottom variant="h6" component="h2">
                            <a href="https://langara.ca/" rel="noreferrer" target="_blank">langara.ca</a>
                        </Typography>
                    </CardContent>
                </Card>
                <Card className="education-card card2">
                    <CardMedia
                        className="card-media"
                        image="./farmerfresh.jpg"
                        title="farmer fresh project"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Computer Software Engineering
                                    </Typography>
                        <Typography gutterBottom variant="h6" component="h2">
                            Bachelor’s Degree
                                    </Typography>
                        <Typography gutterBottom variant="h6" component="h2">
                            Azad University / Tehran, Iran
                                    </Typography>
                        <Typography gutterBottom variant="h6" component="h2">
                            <a href="http://iauctb.ac.ir/en" rel="noreferrer" target="_blank">iauctb.ac.ir(en)</a>
                        </Typography>
                    </CardContent>
                </Card>
                <Card className="education-card card3">
                    <CardMedia
                        className="card-media"
                        image="./farmerfresh.jpg"
                        title="farmer fresh project"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Computer Hardware Engineering
                                    </Typography>
                        <Typography gutterBottom variant="h6" component="h2">
                            Associate Bachelor’s Degree
                                    </Typography>
                        <Typography gutterBottom variant="h6" component="h2">
                            Azad University / Tehran, Iran
                                    </Typography>
                        <Typography gutterBottom variant="h6" component="h2">
                            <a href="http://iauctb.ac.ir/en" rel="noreferrer" target="_blank">iauctb.ac.ir(en)</a>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default Education;

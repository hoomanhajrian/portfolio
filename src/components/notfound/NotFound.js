import React from 'react';
import Card from '@material-ui/core/Card';
import { CardHeader } from '@mui/material';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    NotFoundCard: {
        width: "60%",
        margin: "40vh auto",
    },
    NotFoundCardHeader: {
        margin: "1rem auto",
        width: "40%",
    },

}));

const NotFound = () => {
    const classes = useStyles();
    return (
        <Card className={classes.NotFoundCard}>
            <CardHeader
                title="404 Page not Found!"
                className={classes.NotFoundCardHeader} />
            <CardMedia
                component="img"
                height="100"
                image={""}
                alt={""}
            />
        </Card>
    )
};

export default NotFound;
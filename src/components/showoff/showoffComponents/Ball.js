import { Button } from 'antd';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';



const Ball = (props) => {

    const useStyles = makeStyles(theme => ({
        theball: {
            position: "relative",
            top: `${props.y - 220}px`,
            left: `${props.x - 100}px`,
            padding: "2rem",
            borderRadius: "50%",
            backgroundColor: "red",
            '& span': {
                display: "none",
            },
        },
    }));

    const classes = useStyles();

    return (
        <Button className={classes.theball} id="theBall" >`</Button>
    )
};

export default Ball;
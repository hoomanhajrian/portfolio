import { Button } from 'antd';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';




const Ball = (props) => {

    const { position, setPosition } = useState(props.position);
    // console.log(props.position);
    console.log(position);
    const useStyles = makeStyles(theme => ({
        theball: {
            position: "relative",
            top: `${position}`,
            left: `${position}`,
            padding: "2rem",
            borderRadius: "50%",
            backgroundColor: "red",
            '& span': {
                display: "none",
            }
        },
    }));
    const classes = useStyles();
    return (
        <Button className={classes.theball} >`</Button>
    )
};

export default Ball;
import { Button } from 'antd';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';



const Ball = (props) => {
    const [winner, setWinner] = useState(true);

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
        resetButton: {
            marginRight: 'auto',
            marginLeft: '30%',
            width: '100px'
        }
    }));

    const classes = useStyles();
    const WinnerObj = () => {
        return (<div>
            <p className="winning-message">You Won!</p>
            <Button type="primary" className={classes.resetButton} onClick={() => setWinner(!winner)}>reset</Button>
        </div>
        );
    };

    return (
        winner ? <Button onClick={() => setWinner(!winner)} className={classes.theball} > </Button > : <WinnerObj />
    )
};

export default Ball;
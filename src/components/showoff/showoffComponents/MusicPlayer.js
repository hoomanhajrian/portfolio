import React, { useState } from "react";
import Card from '@material-ui/core/Card';
import Slider from '@mui/material/Slider';
import { CardHeader } from '@mui/material';
import CardMedia from '@material-ui/core/CardMedia';
import { Button, Typography } from 'antd';


const sampleMusics = [
    {
        id: 1,
        name: "Track One",
        artist: "Good Boy",
        color: "red",
        image: "image",
        length: 233
    },
    {
        id: 2,
        name: "Track Two",
        artist: "Bad Boy",
        color: "green",
        image: "image",
        length: 120
    },
    {
        id: 3,
        name: "Track Three",
        artist: "Medium Boy",
        color: "blue",
        image: "image",
        length: 146
    },
];

const MusicPlayer = () => {
    const [barLoc, changeBarLoc] = useState('');
    const [music, changeMusic] = useState('');
    const [loadedList, changeList] = useState(sampleMusics);


    const changeBar = (e) => {
        changeBarLoc(e.target.value);
        console.log(barLoc);
    };

    const play = setInterval(() => {
        // changeBarLoc(barLoc + 1);
        // console.log(barLoc);
    }, 1000);

    const pause = () => {
        clearInterval(play);
        console.log("Pause" + barLoc);
    };

    return (
        <Card className="music-card">
            <CardHeader
                title="Music Player"
                subheader={loadedList[0].name}
                className="music-card-header"
                style={{ color: "white" }}
            />

            {
                music ? <CardMedia
                    component="img"
                    height="100"
                    image={music.pic}
                    alt={music.pic}
                /> : <p>Empty Player</p>
            }
            <Slider
                aria-label="Small steps"
                className="slider-bitter"
                defaultValue={0}
                onChange={changeBar}
                step={1}
                min={0}
                max={loadedList[0].length}
                valueLabelDisplay="auto"
            />
            <Typography>{`${Math.floor(barLoc / 60)}:${(barLoc % 60)}`}</Typography>
            <div className="music-controller-container">
                <Button className="music-controller-button">Random</Button>
                <Button className="music-controller-button">Pre</Button>
                <Button onClick={play} className="music-controller-button">Play</Button>
                <Button onClick={pause} className="music-controller-button">Pause</Button>
                <Button className="music-controller-button">Next</Button>
                <Button className="music-controller-button">Repeat</Button>
            </div>

        </Card>
    )


};

export default MusicPlayer;
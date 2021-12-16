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
    {
        id: 4,
        name: "Track Four",
        artist: "Lonely One",
        color: "purple",
        image: "image",
        length: 146
    },
    {
        id: 5,
        name: "Track Five",
        artist: "Firefly",
        color: "yellow",
        image: "image",
        length: 146
    },
];

const musicIds = [];
sampleMusics.forEach(x => musicIds.push(x.id));
console.log(musicIds);


const MusicPlayer = () => {
    const [barLoc, changeBarLoc] = useState(0);
    const [selectedMusic, changeSelectedMusic] = useState(5);
    const [loadedList, changeList] = useState(sampleMusics);
    const random = false;

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

    const previous = () => {

        if (musicIds.includes(selectedMusic - 1) || (musicIds.includes(selectedMusic + 1) && selectedMusic !== musicIds[musicIds.length - 1] && selectedMusic !== musicIds[0])) {
            changeSelectedMusic(selectedMusic - 1);
        }
        else {
            changeSelectedMusic(musicIds.length);
        }
    };

    const next = () => {
        if (selectedMusic < musicIds.length && selectedMusic > musicIds[0]) {
            changeSelectedMusic(selectedMusic + 1);
        }
        else if (selectedMusic === musicIds.length) {
            changeSelectedMusic(1);
        }
        else if (selectedMusic === musicIds[0]) {
            changeSelectedMusic(selectedMusic + 1);
        }
        else {
            changeSelectedMusic(1);
        }
    };

    const repeat = () => {

    };

    return (
        <Card className="music-card">
            <CardHeader
                title="Music Player"
                subheader={loadedList[selectedMusic - 1].name}
                className="music-card-header"
                style={{ color: "white" }}
            />

            {
                selectedMusic ? <CardMedia
                    component="img"
                    height="100"
                    image={loadedList[selectedMusic - 1].pic}
                    alt={loadedList[selectedMusic - 1].pic}
                /> : <p>Empty Player</p>
            }
            <Slider
                aria-label="Small steps"
                className="slider-bitter"
                defaultValue={0}
                onChange={changeBar}
                step={1}
                min={0}
                max={loadedList[selectedMusic - 1].length}
                valueLabelDisplay="auto"
            /><div className="music-time-wrapper">
                <Typography>{`${Math.floor(barLoc / 60)}:${(barLoc % 60)}`}</Typography>
                <Typography>{`${Math.floor(loadedList[selectedMusic - 1].length / 60)}:${(loadedList[selectedMusic - 1].length % 60)}`}</Typography>
            </div>
            <div className="music-controller-container">
                <Button onClick={!random} className="music-controller-button">Random</Button>
                <Button onClick={previous} className="music-controller-button">Pre</Button>
                <Button onClick={play} className="music-controller-button">Play</Button>
                <Button onClick={pause} className="music-controller-button">Pause</Button>
                <Button onClick={next} className="music-controller-button">Next</Button>
                <Button onClick={repeat} className="music-controller-button">Repeat</Button>
            </div>

        </Card >
    )


};

export default MusicPlayer;
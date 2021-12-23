import React, { useState } from "react";
import Card from '@material-ui/core/Card';
import Slider from '@mui/material/Slider';
import { CardHeader } from '@mui/material';
import CardMedia from '@material-ui/core/CardMedia';
import { Button } from 'antd';


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
        length: 130
    },
    {
        id: 5,
        name: "Track Five",
        artist: "Firefly",
        color: "yellow",
        image: "image",
        length: 100
    },
];

const musicIds = [];
sampleMusics.forEach(x => musicIds.push(x.id));


const MusicPlayer = () => {
    const [barLoc, changeBarLoc] = useState(0);
    const [selectedMusic, changeSelectedMusic] = useState(5);
    const [loadedList, changeList] = useState(sampleMusics);
    const [playingId, setPlayingId] = useState();

    const random = false;

    const changeBar = (e) => {
        changeBarLoc(e.target.value);
    };

    const play = () => {
        const id = setInterval(
            () => {
                changeBarLoc(barLoc => barLoc + 1);
                console.log(barLoc);
            }, 1000
        )
        setPlayingId(id)
    };

    const pause = () => {
        clearInterval(playingId);
        console.log("Pause" + barLoc);
    };

    const stop = () => {
        changeBarLoc(0);
    };

    const previous = () => {

        if (musicIds.includes(selectedMusic - 1) || (musicIds.includes(selectedMusic + 1) && selectedMusic !== musicIds[musicIds.length - 1] && selectedMusic !== musicIds[0])) {
            changeSelectedMusic(selectedMusic - 1);
        }
        else {
            changeSelectedMusic(musicIds.length);
        }
        changeBarLoc(0);
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
        changeBarLoc(0);
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
                value={barLoc}
                onChange={changeBar}
                step={1}
                min={0}
                max={loadedList[selectedMusic - 1].length}
                valueLabelDisplay="off"
            /><div className="music-time-wrapper">
                <p className="time-elapsed">{`${Math.floor(barLoc / 60)}:${(barLoc % 60)}`}</p>
                <p className="total-time">{`${Math.floor(loadedList[selectedMusic - 1].length / 60)}:${(loadedList[selectedMusic - 1].length % 60)}`}</p>
            </div>
            <div className="music-controller-container">
                <Button onClick={!random} className="music-controller-button random-button"><i class="fas fa-random"></i></Button>
                <Button onClick={previous} className="music-controller-button previous-button"><i class="fas fa-backward"></i></Button>
                <Button onClick={play} className="music-controller-button play-button"><i class="fas fa-play"></i></Button>
                <Button onClick={pause} className="music-controller-button pause-button"><i class="fas fa-pause"></i></Button>
                <Button onClick={stop} className="music-controller-button stop-button"><i class="fas fa-stop"></i></Button>
                <Button onClick={next} className="music-controller-button next-button"><i class="fas fa-forward"></i></Button>
                <Button onClick={repeat} className="music-controller-button repeat-button"><i class="fas fa-redo-alt"></i></Button>
            </div>

        </Card>
    )


};

export default MusicPlayer;
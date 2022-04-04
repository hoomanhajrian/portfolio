import React, { useState } from 'react';
import { CardContent } from '@mui/material';
import Slider from '@mui/material/Slider';
import { Button } from 'antd';
import { FormHelperText, Input } from '@mui/material';

const GuessGame = (props) => {
    const [value, setValue] = useState('');
    const { data: answer, max } = props;
    const [helperText, setHelperText] = useState('');
    const [answered, setAnswered] = useState(false);

    const getSliderValue = (event) => {
        setValue(event.target.value);
    };

    const checkAnswer = () => {
        if (value > answer) {
            setHelperText("Go Lower!");
        }
        else if (value < answer) {
            setHelperText("Go Higher!");
        }
        else {
            setHelperText("Good Job you got it!")
        }

    };

    const setInputValue = () => {



    };

    return (
        <CardContent className='guess-number-card'>
            <Slider
                aria-label="Small steps"
                className="guessgame-slider"
                defaultValue={max / 2}
                onChange={getSliderValue}
                step={1}
                min={0}
                max={max}
                valueLabelDisplay="auto"
            />
            <Input
                onChange={setInputValue}
            />
            <FormHelperText>{helperText}</FormHelperText>
            {!answered ? <Button
                onClick={checkAnswer}
                sx={{ mt: 1, mr: 1 }}
                variant="outlined">
                Submit Answer
            </Button> :
                <Button
                    sx={{ mt: 1, mr: 1 }}
                    variant="outlined">
                    Try Again!
                </Button>}
        </CardContent>
    )

};


export default GuessGame;
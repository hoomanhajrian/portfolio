import React, { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import { Card, CardHeader } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    helperText: {
        color: 'red',
    }
});


const GameContainer = () => {
    const [randomNumber, changeRandomNumber] = useState(1)
    const [difficulty, changeDifficulty] = useState('');
    const [helperText, setHelperText] = useState('');
    const [started, changeGameStatus] = useState(false);
    const classes = useStyles();

    const startGame = () => {

        if (difficulty == '') {
            setHelperText("Please choose a difficulty!")
        }

    };


    const handleRadioChange = (event) => {
        changeDifficulty(event.target.value);
    };

    return (
        <Card className='guess-number-card'>
            <CardHeader
                title="Guess the number"
            />
            {!started ? <form>
                <FormControl sx={{ m: 3 }} variant="standard">
                    <FormLabel id="demo-error-radios">choose difficulty:</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-error-radios"
                        name="numberGame"
                        onChange={handleRadioChange}
                    >
                        <FormControlLabel value="easy" control={<Radio />} label={"easy"} />

                        <FormControlLabel value="medium" control={<Radio />} label={"medium"} />

                        <FormControlLabel value="hard" control={<Radio />} label={"hard"} />
                    </RadioGroup>
                    <FormHelperText className={classes.helperText}>{helperText}</FormHelperText>
                    <Button
                        onClick={startGame}
                        sx={{ mt: 1, mr: 1 }}
                        variant="outlined">
                        Let's do it
                    </Button>
                </FormControl>
            </form> : <div>game</div>}
        </Card>
    )

};

export default GameContainer;
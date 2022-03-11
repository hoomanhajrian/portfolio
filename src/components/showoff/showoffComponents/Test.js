import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';


const testData = [
    {
        id: 0,
        name: 'Continent',
        question: 'Which continent is Canada located in?',
        answers: ['Asia', 'America', 'Africa', 'I do not know'],
        answer: "America"
    },
    {
        id: 1,
        name: 'Province',
        question: 'Where is British columbia located?',
        answers: ['West', 'East', 'North', 'South'],
        answer: "West"
    }
]


const Test = () => {
    const [questions, changeQuestions] = useState(testData);
    const [questionNumber, changeQuestionNumber] = useState(0);
    const [question, changeQuestion] = useState(questions[questionNumber]);
    const [value, setValue] = useState('');
    const [error, setError] = useState(false);


    const handleRadioChange = (event) => {
        setValue(event.target.value);
        setError(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(event);
    };

    const handleNext = () => {
        changeQuestionNumber(questionNumber + 1);
        changeQuestion(questions[questionNumber]);
        console.log(questionNumber);
    };

    const handlePrevious = () => {
        changeQuestionNumber(questionNumber - 1);
        changeQuestion(questions[questionNumber]);
        console.log(questionNumber);
    };


    return (
        <Card className="test-card">
            <CardHeader
                title="Sample Test"
                subheader={question.name}
            />
            <RadioGroup name={question.name}>

            </RadioGroup>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <FormControl sx={{ m: 3 }} error={error} variant="standard">
                        <FormLabel id="demo-error-radios">{question.question}</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-error-radios"
                            name="test"
                            value={value}
                            onChange={handleRadioChange}
                        >
                            {question.answers.map((answer) => {
                                return <FormControlLabel key={answer} value={answer} control={<Radio />} label={answer} />
                            })}
                        </RadioGroup>
                        <Button
                            disabled={question.id === 0}
                            onClick={handlePrevious}
                            sx={{ mt: 1, mr: 1 }}
                            variant="outlined">
                            Previous
                        </Button>

                        {question.id === questions.length - 1
                            ?
                            <Button onClick={handleSubmit} type="submit" sx={{ mt: 1, mr: 1 }} variant="outlined">
                                Submit
                            </Button>
                            :
                            <Button onClick={handleNext} sx={{ mt: 1, mr: 1 }} variant="outlined">
                                Next
                            </Button>}

                    </FormControl>
                </form>
            </CardContent>

        </Card>
    )

};

export default Test;
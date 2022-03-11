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
        question: 'Which continent is Canada Located in?',
        answer1: 'Asia',
        answer2: 'America',
        answer3: 'Africa',
        answer4: 'I do not know',
        answer: "Answer2"
    },
    {
        id: 1,
        name: 'Province',
        question: 'Where is British columbia located?',
        answer1: 'West',
        answer2: 'East',
        answer3: 'North',
        answer4: 'South',
        answer: "Answer2"
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

    return (
        <Card className="test-card">
            <CardHeader
                title="Sample Test"
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
                            <FormControlLabel value={question.answer1} control={<Radio />} label={question.answer1} />
                            <FormControlLabel value={question.answer2} control={<Radio />} label={question.answer2} />
                            <FormControlLabel value={question.answer3} control={<Radio />} label={question.answer3} />
                            <FormControlLabel value={question.answer4} control={<Radio />} label={question.answer4} />
                        </RadioGroup>
                        <Button
                            disabled={question.id === 0}
                            sx={{ mt: 1, mr: 1 }}
                            variant="outlined">
                            Previous
                        </Button>
                        <Button sx={{ mt: 1, mr: 1 }} variant="outlined">
                            {question.id === questions.length - 1 ? "Submit" : "Next"}
                        </Button>
                    </FormControl>
                </form>
            </CardContent>

        </Card>
    )

};

export default Test;
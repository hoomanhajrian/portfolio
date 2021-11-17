import React from "react";
import Card from '@material-ui/core/Card';
import { CardHeader } from '@mui/material';
import { Input } from "@material-ui/core";
import { Button } from "antd";

const Calculator = () => {
    const calcButtons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '+', '-', '=', '/', '*'];
    const input = document.getElementById("calcInput");

    const useButton = (event) => {
        const theInput = event.target.value;
        switch (theInput) {
            case '+':
                console.log(theInput);
                break;
            case '-':
                console.log(theInput);
                break;
            case '/':
                console.log(theInput);
                break;
            case '*':
                console.log(theInput);
                break;
            case '=':
                console.log(theInput);
                break;
            default:
                input.value += theInput;
                break;
        };
    };

    return (
        <Card className="calculator-card">
            <CardHeader
                title="Calculator"
            />
            <div className="calc-input-container">
                <Input id="calcInput" className="calculator-input" />
                <Button onClick={() => { input.value = '' }} style={{ backgroundColor: "orange" }}>C</Button>
            </div>
            <div className="calculator-buttons">
                {calcButtons.map(button => (
                    <Button className="calculator-button" onClick={useButton} type="primary" key={button} value={button}>
                        {button}
                    </Button>
                ))}
            </div>
        </Card>
    )
};

export default Calculator;
import React from "react";
import Card from '@material-ui/core/Card';
import { CardHeader } from '@mui/material';
import { Input } from "@material-ui/core";
import { Button } from "antd";

const Calculator = () => {
    const calcButtons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '+', '=', '-', '/', '*']

    const useButton = (value) => {
        console.log(value);
    };

    return (
        <Card className="calculator-card">
            <CardHeader
                title="Calculator"
            />
            <Input className="calculator-input" />
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
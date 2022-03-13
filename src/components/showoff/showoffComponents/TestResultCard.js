import React, { useState } from 'react';
import { Card } from '@material-ui/core';
import { Typography } from 'antd';

const TestResultCard = (props) => {
    const answers = props.data;
    const totalQuestions = props.totalQuestions;
    console.log(answers);

    return (
        <Card>
            <Typography variant="h3">{answers}</Typography>
        </Card>
    )

};

export default TestResultCard;
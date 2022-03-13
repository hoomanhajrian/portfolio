import React, { useState } from 'react';
import { Card } from '@material-ui/core';
import { Typography } from 'antd';

const TestResultCard = (props) => {
    const [data, setData] = useState(props.data);

    return (
        <Card>
            <Typography>{data}</Typography>
        </Card>
    )

};

export default TestResultCard;
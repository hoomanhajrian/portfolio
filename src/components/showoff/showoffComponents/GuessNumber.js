import React, { useState } from 'react';
import { Card, CardHeader } from '@material-ui/core';
import { Button } from 'antd';

const GuessNumber = () => {

    const [started, changeStartStatus] = useState(false);

    return (
        <Card className='guess-number-card'>
            <CardHeader
                title="Guess the number"
            />
            {!started ? <Button type="primary" className='guess-number-start-button' onClick={() => { changeStartStatus(true) }}>button</Button> : <div>hey</div>}
        </Card>
    )

};

export default GuessNumber;
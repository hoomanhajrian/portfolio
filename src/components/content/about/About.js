import { Typography } from '@material-ui/core';
import React from 'react';


const About = () => {
    return (
        <div className="about">
            <h1>ABOUT</h1>
            <Typography>
                <p>This Domain is being used just as the portfolio for Hooman Hajarian.</p>
            </Typography>
            <Typography>
                <p>The website is coded using React running on a docker container.</p>
            </Typography>
        </div>
    )
};

export default About;
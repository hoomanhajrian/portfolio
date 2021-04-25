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
                <p>The web app is coded using React running on a docker container.</p>
            </Typography>
            <Typography>
                <p>GitHub page is open to public, so feel free to clone and do your changes if you find it useful:
                <a href="https://github.com/hoomanhajrian/portfolio.git">https://github.com/hoomanhajrian/portfolio.git</a></p>
            </Typography>
        </div>
    )
};

export default About;
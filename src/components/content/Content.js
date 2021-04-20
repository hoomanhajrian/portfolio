import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Technical from './contents/technical/Technical'
import Projects from './contents/projects/Projects'
import Work from './contents/work/Work'
import Education from './contents/education/Education'
import Awards from './contents/awards/Awards'



function Content() {
    return (
        <div className="content">
            <Technical />
            <Projects />
            <Work />
            <Education />
            <Awards />
        </div>
    );
}

export default Content;

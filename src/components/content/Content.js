import React from 'react';
import Technical from './contents/technical/Technical'
import Projects from './contents/projects/Projects'
import Work from './contents/work/Work'
import Education from './contents/education/Education'



function Content() {
    return (
        <div className="content">
            <Technical />
            <Projects />
            <Work />
            <Education />
        </div>
    );
}

export default Content;

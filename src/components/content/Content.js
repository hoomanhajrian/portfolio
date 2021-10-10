import React from 'react';
import Technical from './contents/technical/Technical'
import Work from './contents/work/Work'
import Education from './contents/education/Education'



const Content = () => {
    return (
        <div className="content">
            <Technical />
            <Work />
            <Education />
        </div>
    );
}

export default Content;

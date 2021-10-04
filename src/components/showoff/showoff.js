import React from 'react';
import Typography from '@material-ui/core/Typography';
import Graph from './showoffComponents/Graph'

function Showoff() {
    return (
        <ul className="showoff-list">
            <li><Graph /></li>
        </ul>
    )
}

export default Showoff;
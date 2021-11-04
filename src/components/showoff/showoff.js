import React from 'react';
import Graph from './showoffComponents/Graph';
import Bump from './showoffComponents/Bump';
import RadarController from './showoffComponents/RadarController';
import DogApi from './showoffComponents/DogApi';
import BarChart from './showoffComponents/BarChart';

function Showoff() {
    return (
        <div className="showoff-container">
            <h2 className="showoff-header">Showoff</h2>
            <ul className="showoff-list">
                <li><Graph /></li>
                <li><BarChart /></li>
                <li><Bump /></li>
                <li><RadarController /></li>
                <li><DogApi /></li>
            </ul>
        </div>
    )
}

export default Showoff;
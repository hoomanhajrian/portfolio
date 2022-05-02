import React from 'react';
import Graph from './showoffComponents/Graph';
import Bump from './showoffComponents/Bump';
import RadarController from './showoffComponents/RadarController';
import DogApi from './showoffComponents/DogApi';
import BarChart from './showoffComponents/BarChart';
import MouseMagic from './showoffComponents/mouseMagic';
import Calculator from './showoffComponents/Calculator';
import MusicPlayer from './showoffComponents/MusicPlayer';
import Test from './showoffComponents/Test';
import GameContainer from './showoffComponents/GameContainer';
import Map from './showoffComponents/Map';
import Todo from './showoffComponents/Todo';

function Showoff() {
    return (
        <div className="showoff-container">
            <h2 className="showoff-header">Showoff</h2>
            <ul className="showoff-list">
                <li><BarChart /></li>
                <li><GameContainer /></li>
                <li><Calculator /></li>
                <li><RadarController /></li>
                <li><Todo /></li>
                <li><Graph /></li>
                <li><DogApi /></li>
                <li><MusicPlayer /></li>
                <li><Test /></li>
                <li><Bump /></li>
                <li><Map className="googlemap" /></li>
                <li><MouseMagic /></li>
            </ul>
        </div>
    )
}

export default Showoff;
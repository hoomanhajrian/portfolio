import React from 'react';
import Card from '@material-ui/core/Card';
import { CardHeader } from '@mui/material';
import Ball from './Ball'



export default class MouseMagic extends React.Component {
    constructor(props) {
        super(props);
        this.name = "Mouse Game";
        this.state = {
            position: {
                x: "100px",
                y: "100px"
            }
        }
    }
    componentWillMount = () => {
        document.addEventListener("mousemove", (event) => {
            let mousex = event.clientX; // Gets Mouse X
            let mousey = event.clientY; // Gets Mouse Y
            this.setState({ position: { x: mousex, y: mousey } })
            // console.log([mousex, mousey]); // Prints data
        });
    }
    render() {

        return (
            <Card className="mouse-game-card">
                <CardHeader
                    title={this.name}
                />
                <Ball position={this.state.position} />
            </Card>
        );
    }
};
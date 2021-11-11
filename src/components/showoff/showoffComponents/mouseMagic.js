import React from 'react';
import Card from '@material-ui/core/Card';
import { CardHeader } from '@mui/material';


export default class MouseMagic extends React.Component {
    constructor(props) {
        super(props);
        this.name = "Mouse Game";
    }
    // tick() {
    //     this.setState({ count: this.state.count + 1 });
    // }
    render() {
        return (
            <Card className="mouse-game-card">
                <CardHeader
                    title={this.name}
                />
            </Card>
        );
    }
}
// Counter.propTypes = { initialCount: React.PropTypes.number };
// Counter.defaultProps = { initialCount: 0 };
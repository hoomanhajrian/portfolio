import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { Link, Router, Route } from 'react-router-dom';

const Header = (props) => {
    const [state, setState] = React.useState({
        checkedB: false,
    });
    const handleChangeNightMode = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    return (
        <div className="header">
            <FormControlLabel
                control={
                    <Switch
                        checked={state.checkedB}
                        onChange={handleChangeNightMode}
                        name="checkedB"
                        color="primary"
                    />
                }
                label="Night Mode (Under construction)"
            />
            <div className="titles">
                <h1 className="title">Hooman Hajarian</h1>
            </div>
        </div>

    );
}

export default Header;

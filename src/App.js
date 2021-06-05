import React from 'react';
import {
    BrowserRouter as Router,
    Switch as NavSwitch,
    Route,
    Link
} from "react-router-dom";
import Header from './components/header/Header';
import Contact from './components/header/Contact'
import Projects from './components/content/contents/projects/Projects'
import Resume from './Resume';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Footer from './components/footer/Footer';


const App = () => {
    const [state, setState] = React.useState({
        checkedB: false,
    });
    const handleChangeNightMode = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    return (
        <div className="app">
            <Router>
                <div className="header">
                    <ul className="header_menu">
                        <li>
                            <Link to="/"><Header /></Link>
                        </li>
                        <li>
                            <div className="header_nav">
                                <li>
                                    <Link to="/">Projects</Link>
                                </li>
                                <li>
                                    <Link to="/contact">Contact</Link>
                                </li>
                                <li>
                                    <Link to="/resume">Resume</Link>
                                </li>
                            </div>
                        </li>
                        <li className="dark-mode-container">
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={state.checkedB}
                                        onChange={handleChangeNightMode}
                                        name="checkedB"
                                        color="primary"
                                    />
                                }
                                label="Night Mode"
                            />
                        </li>
                    </ul>
                </div>
                <NavSwitch>
                    <Route exact path="/">
                        <Projects />
                    </Route>
                    <Route path="/contact">
                        <Contact />
                    </Route>
                    <Route path="/resume">
                        <Resume />
                    </Route>
                </NavSwitch>
            </Router>
            <Footer />
        </div>
    )
};

export default App;
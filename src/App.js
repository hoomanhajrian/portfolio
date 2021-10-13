import React from 'react';
import './sass/main.scss';
import {
    BrowserRouter as Router,
    Switch as NavSwitch,
    Route,
    Link
} from "react-router-dom";
import Header from './components/header/Header';
import Contact from './components/contact/Contact'
import Projects from './components/content/contents/projects/Projects'
import Resume from './components/resume/Resume';
import Footer from './components/footer/Footer';
import MenuButton from './components/menu/Menu';
import Showoff from './components/showoff/showoff';


const App = () => {

    return (
        <div className="app">
            <Router>
                <div className="header">

                    <ul className="header_menu">

                        <li>
                            <Link to="/"><Header /></Link>
                        </li>

                        <li>
                            <MenuButton />
                            <ul id="menuitems" className="header_nav">
                                <li>
                                    <Link to="/">Projects</Link>
                                </li>
                                <li>
                                    <Link to="/contact">Contact</Link>
                                </li>
                                <li>
                                    <Link to="/resume">Resume</Link>
                                </li>
                                <li>
                                    <Link to="/showoff">Showoff</Link>
                                </li>
                            </ul>
                        </li>

                    </ul>
                </div>
                <NavSwitch>
                    <Route path="/contact">
                        <Contact />
                    </Route>
                    <Route path="/resume">
                        <Resume />
                    </Route>
                    <Route path="/showoff">
                        <Showoff />
                    </Route>
                    <Route exact path="/">
                        <Projects />
                    </Route>
                </NavSwitch>
            </Router>
            <Footer />
        </div>
    )
};

export default App;
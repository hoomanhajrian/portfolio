import React from 'react';
import './sass/main.scss';
import {
    HashRouter as Router,
    Switch as NavSwitch,
    Route,
    NavLink
} from "react-router-dom";
import Header from './components/header/Header';
import Contact from './components/contact/Contact'
import Projects from './components/content/contents/projects/Projects'
import Resume from './components/resume/Resume';
import Footer from './components/footer/Footer';
import MenuButton from './components/menu/Menu';
import Showoff from './components/showoff/showoff';
import NotFound from './components/notfound/NotFound';

const App = () => {

    return (
        <div className="app">
            <Router>
                <div className="header">

                    <ul className="header_menu">

                        <li>
                            <NavLink to="/"><Header /></NavLink>
                        </li>

                        <li>
                            <MenuButton />
                            <ul id="menuitems" className="header_nav">
                                <li>
                                    <NavLink to="/">Projects</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/contact">Contact</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/resume">Resume</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/showoff">Showoff</NavLink>
                                </li>
                            </ul>
                        </li>

                    </ul>
                </div>
                <NavSwitch>
                    <Route path="/contact" >
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
                    <Route>
                        <NotFound />
                    </Route>
                </NavSwitch>
            </Router>
            <Footer />
        </div>
    )
};

export default App;
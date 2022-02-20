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
                                    <NavLink className="menu-item" to="/">Projects</NavLink>
                                </li>
                                <li>
                                    <NavLink className="menu-item" to="/contact">Contact</NavLink>
                                </li>
                                <li>
                                    <NavLink className="menu-item" to="/resume">Resume</NavLink>
                                </li>
                                <li>
                                    <NavLink className="menu-item" to="/showoff">Showoff</NavLink>
                                </li>
                            </ul>
                        </li>

                    </ul>
                </div>
                <NavSwitch>
                    <Route exact path="/" component={Projects} />
                    <Route path="/contact" component={Contact} />
                    <Route path="/resume" component={Resume} />
                    <Route path="/showoff" component={Showoff} />
                    <Route component={NotFound} />
                </NavSwitch>
            </Router>
            <Footer />
        </div>
    )
};

export default App;
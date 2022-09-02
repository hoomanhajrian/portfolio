import React from 'react';
import './sass/main.scss';
import {
    HashRouter as Router,
    Switch as NavSwitch,
    Route,
    NavLink
} from "react-router-dom";
import About from './components/about/About'
import Projects from './components/content/contents/projects/Projects'
import Resume from './components/resume/Resume';
import Footer from './components/footer/Footer';
import Showoff from './components/showoff/showoff';
import NotFound from './components/notfound/NotFound';
import ContactLinks from './components/contact/ContactLinks';



const App = () => {

    return (
        <main className="app">
            <Router>
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">Hooman Hajarian</a>
                        <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="navbar-collapse collapse" id="navbarColor01">
                            <ul className="navbar-nav me-auto">
                                <li className="nav-item">
                                    <NavLink exact className="nav-link" to="/">Projects</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/resume">Resume</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/showoff">Showoff</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/about">About</NavLink>
                                </li>
                                <li className="nav-item">
                                    <ContactLinks />
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <NavSwitch>
                    <Route exact path="/" component={Projects} />
                    <Route path="/about" component={About} />
                    <Route path="/resume" component={Resume} />
                    <Route path="/showoff" component={Showoff} />
                    <Route component={NotFound} />
                </NavSwitch>
            </Router>
            <Footer />
        </main>
    )
};

export default App;
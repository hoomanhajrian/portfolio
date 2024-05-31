import React, { lazy } from "react";
import "./sass/main.scss";
import {
  HashRouter as Router,
  Switch as NavSwitch,
  Route,
} from "react-router-dom";
import Footer from "./components/footer/Footer";
import NavComponent from './components/nav/NavComponent';

const About = lazy(()=>import("./components/about/About"));
const Projects = lazy(()=>import("./components/content/contents/projects/Projects"));
const Resume = lazy(()=>import("./components/resume/Resume"));
const Showoff = lazy(()=>import("./components/showoff/showoff"));
const NotFound = lazy(()=>import("./components/notfound/NotFound"));

const App = () => {
  return (
    <main className="app">
      <Router>
        <NavComponent/>
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
  );
};

export default App;

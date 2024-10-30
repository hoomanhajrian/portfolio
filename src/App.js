import React, { lazy } from "react";
import "./sass/main.scss";
import {
  HashRouter,
  Switch,
  Route,
} from "react-router-dom";
import Footer from "./components/footer/Footer";
import NavComponent from './components/nav/NavComponent';

const About = lazy(()=>import("./components/about/About"));
const Projects = lazy(()=>import("./components/content/contents/projects/Projects"));
const Resume = lazy(()=>import("./components/resume/Resume"));
const Showoff = lazy(()=>import("./components/showoff/showoff"));
const Game = lazy(()=>import("./components/content/game/Game"));
const NotFound = lazy(()=>import("./components/notfound/NotFound"));

const App = () => {
  return (
    <main className="app">
      <HashRouter>
        <NavComponent/>
        <Switch>
          <Route exact path="/" component={Projects} />
          <Route path="/about" component={About} />
          <Route path="/resume" component={Resume} />
          <Route path="/showoff" component={Showoff} />
          <Route path="/game" component={Game} />
          <Route component={NotFound} />
        </Switch>
      </HashRouter>
      <Footer />
    </main>
  );
};

export default App;

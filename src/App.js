import React, { lazy, Suspense } from "react";
import "./sass/main.scss";
import {
  HashRouter,
  Switch,
  Route,
} from "react-router-dom";
import Footer from "./components/footer/Footer";
import NavComponent from './components/nav/NavComponent';
import AppLoading from "./components/loading/AppLoading";

const Projects = lazy(() => import("./components/content/contents/projects/Projects"));
const Resume = lazy(() => import("./components/resume/Resume"));
const About = lazy(() => import("./components/about/About"));
const Showoff = lazy(() => import("./components/showoff/showoff"));
const Game = lazy(() => import("./components/content/game/Game"));

const App = () => {
  return (
    <main className="app">
      <HashRouter>
        <NavComponent />
        <Switch>
          <Suspense fallback={<AppLoading loadingTitle={'Loading'} />}>
            <Route exact path="/" component={Projects} />
            <Route path="/about" component={About} />
            <Route path="/resume" component={Resume} />
            <Route path="/showoff" component={Showoff} />
            <Route path="/game" component={Game} />
          </Suspense>
        </Switch>
      </HashRouter>
      <Footer />
    </main>
  );
};

export default App;

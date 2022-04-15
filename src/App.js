import React, { useState } from 'react';
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
import Showoff from './components/showoff/showoff';
import NotFound from './components/notfound/NotFound';
import { makeStyles } from '@mui/styles';
import { List, ListItem } from '@mui/material';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles({
    menuLink: {
        color: 'black',
        background: 'transparent',
        boxShadow: 'none',
        margin: '0',
        fontWeight: "bold",
        width: '100%',
        height: '100%',
    },
    menuItem: {
        padding: '0 !important',
        margin: '1rem !important',
        width: '100% !important',
        height: '100% !important',
    },
    activeLink: {
        color: 'cyan',
    },
    header: {
        display: 'flex',
        justifyContent: '',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '0 1.5rem !important',
        background: '#188BB0'
    },
    menuButton: {
        border: '1px solid black',
        "& span": {
            fontWeight: "bold",
            color: 'white',
            fontSize: '1.2rem',
        },
    }
});


const App = () => {
    const classes = useStyles();
    const [anchorEl, changeAnchorEl] = useState(null)


    const handleClick = event => {
        changeAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        changeAnchorEl(null);
    };


    return (
        <div className="app">
            <Router>
                <List className={classes.header}>
                    <ListItem>
                        <NavLink to="/"><Header className={classes.titles} /></NavLink>
                    </ListItem>
                    <Button
                        aria-owns={anchorEl ? 'portfolio-menu' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                        className={classes.menuButton}
                    >
                        Menu
                    </Button>
                    <Menu
                        id="portfolio-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose} className={classes.menuItem}><NavLink className={classes.menuLink} activeClassName={classes.activeLink} exact to="/">Projects</NavLink></MenuItem>

                        <MenuItem onClick={handleClose} className={classes.menuItem}><NavLink className={classes.menuLink} activeClassName={classes.activeLink} to="/resume">Resume</NavLink></MenuItem>

                        <MenuItem onClick={handleClose} className={classes.menuItem}><NavLink className={classes.menuLink} activeClassName={classes.activeLink} to="/showoff">Showoff</NavLink></MenuItem>

                        <MenuItem onClick={handleClose} className={classes.menuItem}><NavLink className={classes.menuLink} activeClassName={classes.activeLink} to="/about">About</NavLink></MenuItem>
                    </Menu>
                </List>
                <NavSwitch>
                    <Route exact path="/" component={Projects} />
                    <Route path="/about" component={Contact} />
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
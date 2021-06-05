import './sass/main.scss';
import React from 'react';
import Content from './components/content/Content'
import Footer from './components/footer/Footer'
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Contact from './components/header/Contact';
import About from './components/content/about/About';
import Technical from './components/content/contents/technical/Technical';
import Work from './components/content/contents/work/Work';
import Education from './components/content/contents/education/Education';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));



const App = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const [state, setState] = React.useState({
    checkedB: false,
  });

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }

  const handleChangeNightMode = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className="resume">
      <h2 className="resume-header">Resume</h2>
      <div className="cards-container">
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          <Tab label="Skills" {...a11yProps(0)} />
          <Tab label="Work Experience" {...a11yProps(1)} />
          <Tab label="Education" {...a11yProps(2)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Technical />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Work />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Education />
        </TabPanel>
      </div>
    </div>


  );
}

export default App;

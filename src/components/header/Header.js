import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    title: { color: 'antiquewhite' },
    subTitle: { color: 'azure', padding: '0' }
})


const Header = () => {
    const classes = useStyles();

    return (
        <div>
            <h1 className={classes.title}>Hooman Hajarian</h1>
            <h2 className={classes.subTitle}>Full Stack Developer</h2>
        </div>
    );
}

export default Header;

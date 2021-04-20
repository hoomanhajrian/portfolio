import React from 'react';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    footer: {

    }
});


function Footer() {
    const styles = useStyles();
    return (
        <div className={styles.footer}>
            <h1>This is the Footer</h1>
        </div>
    );
}

export default Footer;

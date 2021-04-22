import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    contact: {

    }
});



function Contact() {
    const styles = useStyles();

    return (
        <div className={styles.header}>
            <h3>Contact me:</h3>
            <h4>LinkedIn:</h4>
            <h4>Email:</h4>
            <h4>GitHub:</h4>
        </div>
    );
}

export default Contact;

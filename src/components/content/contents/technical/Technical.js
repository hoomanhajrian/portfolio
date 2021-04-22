import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    technical: {
        textAlign: 'center'
    }
})


function Technical() {
    const styles = useStyles();
    return (
        <div className={styles.technical}>
            <h2>Technical Skills</h2>
            <table className="skills_table">
                <tr><td>JavaScript</td><td>HTML3/5/X</td></tr>
                <tr><td>Java</td><td>CSS and SASS</td></tr>
                <tr><td>Docker</td><td>Amazon Web Services</td></tr>
                <tr><td>GitHub</td><td>Docker Hub</td></tr>
                <tr><td>Node.js</td><td>React and related libraries</td></tr>
                <tr><td>Data Bases(MySQL,MongoDb,FireBase)</td><td>GraphQl</td></tr>
            </table>
        </div>
    );
}

export default Technical;


//  Microsoft Office(ICDL Degree)
// React WordPress.
// Material UI / Ant design AWS(Linux Server)
// GitHub 
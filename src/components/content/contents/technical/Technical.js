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
            <ul className="skills_table">
                <li>JavaScript</li>
                <li>HTML3/5/X</li>
                <li>Java</li>
                <li>CSS and SASS</li>
                <li>Docker</li>
                <li>Amazon Web Services</li>
                <li>GitHub</li>
                <li>Docker Hub</li>
                <li>Node.js</li>
                <li>React and related libraries</li>
                <li>GraphQl</li>
                <li>Data Bases(MySQL,MongoDb,FireBase)</li>
            </ul>
        </div>
    );
}

export default Technical;


//  Microsoft Office(ICDL Degree)
// React WordPress.
// Material UI / Ant design AWS(Linux Server)
// GitHub 
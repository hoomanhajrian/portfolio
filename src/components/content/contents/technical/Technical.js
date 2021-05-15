import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ProgressBar } from 'react-bootstrap';
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
                <li><ProgressBar now={70} /></li>
                <li>HTML3/5/X</li>
                <li><ProgressBar now={80} /></li>
                <li>Java</li>
                <li><ProgressBar now={50} /></li>
                <li>CSS and SASS</li>
                <li><ProgressBar now={70} /></li>
                <li>Docker</li>
                <li><ProgressBar now={30} /></li>
                <li>Amazon Web Services</li>
                <li><ProgressBar now={40} /></li>
                <li>GitHub</li>
                <li><ProgressBar now={90} /></li>
                <li>Docker Hub</li>
                <li><ProgressBar now={90} /></li>
                <li>Node.js</li>
                <li><ProgressBar now={50} /></li>
                <li>React and related libraries</li>
                <li><ProgressBar now={65} /></li>
                <li>GraphQl</li>
                <li><ProgressBar now={50} /></li>
                <li>Data Bases(MySQL,MongoDb,FireBase)</li>
                <li><ProgressBar now={60} /></li>
                <li>Restful API</li>
                <li><ProgressBar now={65} /></li>
                <li>Express</li>
                <li><ProgressBar now={60} /></li>
            </ul>
        </div>
    );
}

export default Technical;


//  Microsoft Office(ICDL Degree)
// React WordPress.
// Material UI / Ant design AWS(Linux Server)
// GitHub 
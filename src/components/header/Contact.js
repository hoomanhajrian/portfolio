import React from 'react';
import { makeStyles } from '@material-ui/core/styles';




function Contact() {

    return (
        <div className="contact">
            <h1>Contact me</h1>
            <ul className="links">
                <li><h4>LinkedIn:</h4></li>
                <li><a href="https://www.linkedin.com/in/hooman-hajarian/" target="_blank"><i class="fab fa-linkedin"></i><span className="visually-hidden">https://www.linkedin.com/in/hooman-hajarian/</span></a></li>
                <li><h4>Email:</h4></li>
                <li>hajarianhooman@gmail.com</li>
                <li><h4>GitHub:</h4></li>
                <li><a href="https://github.com/hoomanhajrian" target="_blank"><i class="fab fa-github-square"></i><span className="visually-hidden">https://github.com/hoomanhajrian</span></a></li>
            </ul>
        </div>
    );
}

export default Contact;

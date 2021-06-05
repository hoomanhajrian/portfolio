import React from 'react';




function Contact() {

    return (
        <div className="contact">
            <h2>Contact me</h2>
            <ul className="links">
                <li><h6>LinkedIn:</h6></li>
                <li><a href="https://www.linkedin.com/in/hooman-hajarian/" target="_blank"><i class="fab fa-linkedin"></i><span className="visually-hidden">https://www.linkedin.com/in/hooman-hajarian/</span></a></li>
                <li><h6>Email:</h6></li>
                <li>hajarianhooman@gmail.com</li>
                <li><h6>GitHub:</h6></li>
                <li><a href="https://github.com/hoomanhajrian" target="_blank"><i class="fab fa-github-square"></i><span className="visually-hidden">https://github.com/hoomanhajrian</span></a></li>
            </ul>
        </div>
    );
}

export default Contact;

import React, { useState } from 'react';
import Map from './Map'
import ContactForm from './ContactForm';
const axios = require("axios");


const Contact = () => {

    const [isDone, changeIsDone] = useState(false);
    const [message, changeMessage] = useState("");

    const sendMessage = async (data) => {
        try {
            await axios.post('http://hh-portfolio.com:8080/message', data)
                .then((response) => {
                    changeMessage("Thank you I will get back to you as soon as possible!");
                    changeIsDone(true);
                    setTimeout(() => { changeIsDone(false) }, 6000);
                })
                .catch((error) => {
                    changeIsDone(true);
                    changeMessage(`${error}`);
                    setTimeout(() => { changeIsDone(false) }, 3000)
                    console.log(error);
                });
        }
        catch (err) {
            // console.error(err);
        }
    };


    return (
        <div className="contact">
            <h2>Contact me</h2>
            <Map className="googlemap" />
            {isDone ? <p className="message">{message}</p> : <ContactForm sendMessage={sendMessage} />}

            <ul className="links">

                <li><a href="https://www.linkedin.com/in/hooman-hajarian/" target="_blank" rel="noreferrer"><i className="fab fa-linkedin"></i><span className="visually-hidden">https://www.linkedin.com/in/hooman-hajarian/</span></a></li>

                <li><a href="https://github.com/hoomanhajrian" target="_blank" rel="noreferrer"><i className="fab fa-github-square"></i><span className="visually-hidden">https://github.com/hoomanhajrian</span></a></li>
            </ul>
        </div>
    );
}

export default Contact;

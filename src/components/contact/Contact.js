import React, { useState } from 'react';
import ContactForm from './ContactForm';
const axios = require("axios");


const Contact = () => {

    const [isDone, changeIsDone] = useState(false);
    const [message, changeMessage] = useState("");

    const sendMessage = async (data) => {
        try {
            // await axios.post('http://hh-portfolio.com:8080/message', data) //change this to change the posting port
            await axios.post('https://hh-portfolio.com:5000/message', data)
                .then((response) => {
                    changeMessage("Thank you I will get back to you as soon as possible!");
                    changeIsDone(true);
                    setTimeout(() => { changeIsDone(false) }, 6000);
                })
                .catch((error) => {
                    changeIsDone(true);
                    changeMessage(`${error}`);
                    setTimeout(() => { changeIsDone(false) }, 3000);
                });
        }
        catch (err) {
            // console.error(err);
        }
    };


    return (
        <div className="contact">
            <h2>About me</h2>
            <p className='aboutme'>This website is just an asset for me to show off part of my skills and my resume to help me find my place in tech industry as a full stack developer. I studied Hardware and Software engineering to be able to understand the concepts of computer language and how to build one and become a developer. Also finished my studies in coding for web, mobile, and software and still coding to add to my knowledge day by day.</p>
            <p className='aboutme'>All this project is coded by me usign <a href="https://ant.design/" target="_blank" rel="noreferrer">Ant Design</a> and <a href="https://mui.com/">Material UI</a> and many more liberaries and dependencies and can be provided upon request.</p>
            <p className='aboutme'>Please do not hesitate to contact me through my <a href="https://www.linkedin.com/in/hooman-hajarian/" target='_blank' rel="noreferrer">linkedin</a> mentioned below.</p>
            {isDone ? <p className="message">{message}</p> : <ContactForm sendMessage={sendMessage} />}

            <ul className="links">

                <li><a href="https://www.linkedin.com/in/hooman-hajarian/" target="_blank" rel="noreferrer"><i className="fab fa-linkedin"></i><span className="visually-hidden">https://www.linkedin.com/in/hooman-hajarian/</span></a></li>

                <li><a href="https://github.com/hoomanhajrian" target="_blank" rel="noreferrer"><i className="fab fa-github-square"></i><span className="visually-hidden">https://github.com/hoomanhajrian</span></a></li>
            </ul>
        </div>
    );
}

export default Contact;

import React, { useState } from "react";
import GitHub from "../github/GitHub";
import ContactForm from "../contact/ContactForm";

const axios = require("axios");

const About = () => {
  const [isDone, changeIsDone] = useState(false);
  const [message, changeMessage] = useState("");

  const sendMessage = async (data) => {
    try {
      // await axios.post('http://hh-portfolio.com:8080/message', data) //change this to change the posting port
      await axios
        .post("https://hh-portfolio.com:5000/message", data)
        .then((response) => {
          changeMessage(
            "Thank you I will get back to you as soon as possible!"
          );
          changeIsDone(true);
          setTimeout(() => {
            changeIsDone(false);
          }, 6000);
        })
        .catch((error) => {
          changeIsDone(true);
          changeMessage(`${error}`);
          setTimeout(() => {
            changeIsDone(false);
          }, 3000);
        });
    } catch (err) {
      // console.error(err);
    }
  };

  return (
    <div className="about">
      <h2>About me</h2>
      <div className="about-me-wrapper">
        <img src="/img/me.jpg" alt="hooman-hajarian" className="my-picture" />
        <p className="aboutme">
          This website is just an asset for me to show off part of my skills and
          my resume to help me find my place in tech industry as a full stack
          developer. I studied Hardware and Software engineering to be able to
          understand the concepts of computer language and how to build one and
          become a developer. Also finished my studies in coding for web,
          mobile, and software and still coding to add to my knowledge day by
          day.
        </p>
      </div>
      <p className="aboutme">
        All this project is coded by me usign{" "}
        <a href="https://react.dev/" target="_blank" rel="noreferrer">
          React{" "}
        </a>{" "}
        and liberaries such as
        <a href="https://ant.design/" target="_blank" rel="noreferrer">
          {" "}
          Ant Design
        </a>{" "}
        and{" "}
        <a href="https://mui.com/" target="_blank" rel="noreferrer">
          Material UI
        </a>{" "}
        and many more liberaries and dependencies for styling and components.
      </p>
      <p className="aboutme">
        Styling was done using using{" "}
        <a
          href="https://www.npmjs.com/package/node-sass"
          target="_blank"
          rel="noreferrer"
        >
          node-sass
        </a>{" "}
        library and 3D solar system was made by a library called{" "}
        <a href="https://threejs.org/" target="_blank" rel="noreferrer">
          Threejs
        </a>
        .
      </p>
      <p className="aboutme">
        Please do not hesitate to contact me through my social media links or
        phone number.
      </p>
      <h3>GitHub Activity</h3>
      <GitHub year="2020" />
      <GitHub year="2021" />
      <GitHub year="2022" />
      <GitHub year="2023" />
      {isDone ? (
        <p className="message">{message}</p>
      ) : (
        <ContactForm sendMessage={sendMessage} />
      )}
    </div>
  );
};

export default About;

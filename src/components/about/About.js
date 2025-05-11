import GitHub from "../github/GitHub";
// import ContactForm from "../contact/ContactForm";
// import axios from "axios";

const About = () => {
  // const [isDone, setIsDone] = useState(false);
  // const [message, setMessage] = useState("");

  /*
  const sendMessage = async (data) => {
    try {
      const response = await axios.post("https://hh-portfolio.com:5000/message", data);
      setMessage("Thank you! I’ll get back to you as soon as possible.");
      setIsDone(true);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      setIsDone(true);
    } finally {
      setTimeout(() => {
        setIsDone(false);
      }, 5000);
    }
  };
  */

  return (
    <div className="about">
      <h2>About Me</h2>

      <div className="about-me-wrapper">
        <img src="/img/me.jpg" alt="Hooman Hajarian" className="my-picture" />
        <p className="aboutme">
          Welcome to my portfolio! I'm Hooman Hajarian, a Full Stack Developer with a passion for building scalable web
          applications and immersive 3D experiences. This site is a reflection of my journey—combining my engineering
          background with hands-on experience in web, mobile, and software development.
        </p>
      </div>

      <p className="aboutme">
        I build modern, full-featured applications using tools like{" "}
        <a href="https://react.dev/" target="_blank" rel="noreferrer">React</a> and{" "}
        <a href="https://nextjs.org/" target="_blank" rel="noreferrer">Next.js</a>. With Next.js, I've developed several
        projects utilizing features like server-side rendering, API routes, dynamic routing, and seamless integration
        with databases and third-party services—perfect for building fast, production-ready apps.
      </p>

      <p className="aboutme">
        I also incorporate UI libraries such as{" "}
        <a href="https://ant.design/" target="_blank" rel="noreferrer">Ant Design</a> and{" "}
        <a href="https://mui.com/" target="_blank" rel="noreferrer">Material UI</a>, and handle styling using{" "}
        <a href="https://www.npmjs.com/package/node-sass" target="_blank" rel="noreferrer">node-sass</a>. Whether
        building clean interfaces or reusable components, I focus on performance and usability.
      </p>

      <p className="aboutme">
        On the creative side, I've also explored 3D development by integrating{" "}
        <a href="https://threejs.org/" target="_blank" rel="noreferrer">Three.js</a> and{" "}
        <a href="https://docs.pmnd.rs/react-three-fiber" target="_blank" rel="noreferrer">React Three Fiber</a> into
        some of my work—like the dynamic solar system showcased here.
      </p>

      <p className="aboutme">
        I’m constantly improving my skills and staying up to date with the latest in web development. I'm currently open
        to new opportunities where I can contribute, collaborate, and grow.
      </p>

      <p className="aboutme">
        Feel free to contact me via my form, GitHub, or social channels. I’m always up for a great conversation or
        collaboration.
      </p>

      <h3>GitHub History</h3>
      <GitHub />

      {/* Contact form (optional) */}
      {/*
      {isDone ? (
        <p className="message">{message}</p>
      ) : (
        <ContactForm sendMessage={sendMessage} />
      )}
      */}
    </div>
  );
};

export default About;

import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import SEO from "../components/SEO";
import BlurText from "../components/BlurText";
import VariableProximity from "../components/VariableProximity";
import AnimatedBackground from "../components/AnimatedBackground";
import useScrollNavigation from "../hooks/useScrollNavigation";
import { useTheme } from "../context/ThemeContext";

const Home = () => {
  useScrollNavigation();
  const containerRef = useRef(null);
  const { isDarkMode } = useTheme();
  // Theme-aware colors matching site's sky blue palette

    useEffect(() => {
      console.log(isDarkMode);
    }, [isDarkMode]);

  return (
    <>
      <SEO
        title="Hooman Hajarian - Full Stack Developer | React, Next.js, Node.js"
        description="Full Stack Developer specializing in React, Next.js, TypeScript, and Node.js. Building beautiful, functional web and mobile applications. View my portfolio of 13+ completed projects."
        keywords="Full Stack Developer, React Developer, Next.js Developer, TypeScript, Node.js, Web Developer, Mobile Apps, Portfolio"
      />
      <AnimatedBackground
        className="fixed inset-0 z-10"
        colors={isDarkMode ? ["#0ea5e9", "#38bdf8", "#fff", "#0ea5e9"] : ["#000", "#fff", "#f2f2d7", "#fff2b3"]}
      />
      <div
        ref={containerRef}
        className="min-h-screen flex flex-col justify-center items-center text-center relative px-4 pb-40 bg-white dark:bg-gray-900"
      >
        <div className="max-w-5xl mx-auto py-20">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
            <BlurText
              text="Hi, I'm"
              delay={0}
              animateBy="words"
              direction="top"
            />{" "}
            <span className="text-sky-500 dark:text-sky-400">
              <BlurText
                text="Hooman Hajarian"
                delay={300}
                animateBy="words"
                direction="top"
              />
            </span>
          </h1>

          <h4 className="text-xl md:text-3xl mb-6 text-gray-600 dark:text-gray-400">
            <BlurText
              text="Full Stack Developer | Designer | Creator"
              delay={600}
              animateBy="words"
              direction="left"
            />
          </h4>

          <p className="text-base md:text-lg max-w-3xl mx-auto mb-10 text-gray-600 dark:text-gray-400">
            <VariableProximity
              label="I build beautiful, functional, and user-friendly web applications. Passionate about creating amazing digital experiences."
              fromFontVariationSettings="'wght' 400"
              toFontVariationSettings="'wght' 700"
              containerRef={containerRef}
              radius={150}
              falloff="linear"
            />
          </p>

          {/* Social Links */}
          <div className="flex justify-center gap-4 mb-10">
            <motion.a
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 }}
              href="https://github.com/hoomanhajrian"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all text-gray-700 dark:text-gray-300 hover:text-sky-500 dark:hover:text-sky-400"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.a>

            <motion.a
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4 }}
              href="https://linkedin.com/in/hooman-hajarian"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all text-gray-700 dark:text-gray-300 hover:text-sky-500 dark:hover:text-sky-400"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </motion.a>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/projects"
              className="px-8 py-4 bg-sky-500 hover:bg-sky-600 dark:bg-sky-600 dark:hover:bg-sky-700 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl no-underline"
            >
              View My Work
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 border-2 border-sky-500 dark:border-sky-400 text-sky-500 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-900/20 font-semibold rounded-lg transition-all no-underline"
            >
              Get In Touch
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 animate-bounce">
          <svg
            className="w-10 h-10 text-gray-400 dark:text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </>
  );
};

export default Home;

import React from 'react';
import SEO from '../components/SEO';
import useScrollNavigation from '../hooks/useScrollNavigation';

const Contact = () => {
  useScrollNavigation();

  return (
    <>
      <SEO
        title="Contact Hooman Hajarian - Full Stack Developer"
        description="Get in touch with Hooman Hajarian for web development projects, collaborations, or freelance opportunities. Specializing in React, Next.js, and full-stack development."
        keywords="Contact Developer, Hire React Developer, Hire Full Stack Developer, Web Development Services, Freelance Developer"
        url="https://hoomanhajrian.github.io/portfolio/contact"
      />
      <div className="w-full min-h-screen bg-white dark:bg-gray-900 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-2 text-gray-900 dark:text-white">
            Get In Touch
          </h2>
          <p className="text-xl text-center text-gray-600 dark:text-gray-400 mb-12">
            Have a project in mind? Let's work together!
          </p>

          <div className="max-w-2xl mx-auto space-y-6">
            {/* Contact Info */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 transition-colors animate-fade-in-up">
              <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
                Contact Information
              </h3>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-sky-500 dark:bg-sky-600 rounded-2xl text-white flex-shrink-0">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                    <p className="text-gray-900 dark:text-white font-medium">
                      Vancouver, BC
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-sky-500 dark:bg-sky-600 rounded-2xl text-white flex-shrink-0">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">LinkedIn</p>
                    <a href="https://www.linkedin.com/in/hooman-hajarian" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-white font-medium hover:text-sky-500 dark:hover:text-sky-400 transition-colors text-sm break-all">
                      linkedin.com/in/hooman-hajarian
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-sky-500 dark:bg-sky-600 rounded-2xl text-white flex-shrink-0">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">GitHub</p>
                    <a href="https://github.com/hoomanhajrian" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-white font-medium hover:text-sky-500 dark:hover:text-sky-400 transition-colors text-sm">
                      github.com/hoomanhajrian
                    </a>
                  </div>
                </div>
              </div>
            </div>
          
            <div className="bg-gradient-to-br from-sky-500 to-sky-600 rounded-3xl shadow-lg p-6 text-white animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <h3 className="text-xl font-semibold mb-3">
                Let's Build Something Amazing!
              </h3>
              <p className="text-sky-50 opacity-90">
                I'm always open to discussing new projects, creative ideas, or opportunities. Feel free to contact me directly via chat on my LinkedIn profile!
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Contact;

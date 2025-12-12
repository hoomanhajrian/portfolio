import React, { useEffect } from 'react';
import SEO from '../components/SEO';
import useScrollNavigation from '../hooks/useScrollNavigation';

const About = () => {
  useScrollNavigation();
  const skills = [
    {
      name: 'Frontend Development',
      description: 'React (Advanced), Next.js (Advanced), TypeScript (Advanced), Tailwind CSS',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 19V7h16l.002 12H4z"/>
          <path d="M9.293 9.293 5.586 13l3.707 3.707 1.414-1.414L8.414 13l2.293-2.293zm5.414 0-1.414 1.414L15.586 13l-2.293 2.293 1.414 1.414L18.414 13z"/>
        </svg>
      ),
    },
    {
      name: 'Backend Development',
      description: 'Node.js (Advanced), SQL (Proficient), Spring Boot, RESTful APIs',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
        </svg>
      ),
    },
    {
      name: 'Cloud & DevOps',
      description: 'AWS (EC2, S3, Lambda, RDS), Docker, Kubernetes, Firebase',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
        </svg>
      ),
    },
    {
      name: 'Mobile Development',
      description: 'React Native, Responsive Web Design',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17 1.01 7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/>
        </svg>
      ),
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 10);
  }, []);

  return (
    <>
      <SEO
        title="About Hooman Hajarian - Full Stack Developer"
        description="Learn about Hooman Hajarian, a passionate Full Stack Developer with expertise in React, Next.js, TypeScript, Node.js. Experience in building modern web applications, e-commerce platforms, and mobile apps."
        keywords="About Hooman Hajarian, Full Stack Developer Skills, React Expert, Next.js Developer, Web Development Experience"
        url="https://hoomanhajrian.github.io/portfolio/about"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 bg-white dark:bg-gray-900">
        <div className="animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-gray-900 dark:text-white">
            About Me
          </h2>

          {/* Introduction */}
          <div className="mb-12 bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 md:p-8 transition-colors">
            <p className="text-lg leading-relaxed mb-4 text-gray-700 dark:text-gray-300">
              Passionate Full Stack Developer with extensive experience in React, TypeScript, and modern front-end development. 
              Highly motivated to contribute to high-visibility, fast-paced product development, while growing technical expertise 
              in full-stack technologies. Specialized in building intuitive, user-centered features that enhance digital experiences.
            </p>
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              When I'm not coding, you'll find me playing basketball, swimming, hiking, biking, or enjoying video games. 
              I'm passionate about IoT, cloud solutions, software design patterns, and staying current with emerging technologies.
            </p>
          </div>

          {/* Skills */}
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            Skills & Expertise
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-3 bg-sky-500 dark:bg-sky-600 rounded-2xl text-white flex items-center justify-center">
                    {skill.icon}
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {skill.name}
                  </h4>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  {skill.description}
                </p>
              </div>
            ))}
          </div>

          {/* Experience */}
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            Experience
          </h3>

          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 md:p-8 transition-colors animate-fade-in-up">
              <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Full Stack Developer (Freelancer)
              </h4>
              <p className="text-sky-500 dark:text-sky-400 font-medium mb-3">
                Self-Employed | Apr 2022 - Present | Vancouver, BC / Remote
              </p>
              <ul className="text-gray-600 dark:text-gray-400 space-y-2 list-disc list-inside">
                <li>Developed responsive, client-facing applications using React, Next.js, and TypeScript</li>
                <li>Optimized application performance using AWS services and integrated third-party APIs</li>
                <li>Applied Agile methodologies, collaborating with clients and remote teams to ensure timely project delivery</li>
                <li>Delivered 5+ web applications, improving client engagement</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 md:p-8 transition-colors animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Product Care Specialist
              </h4>
              <p className="text-sky-500 dark:text-sky-400 font-medium mb-3">
                TELUS Mobileklinik | Feb 2022 - Present | Vancouver, BC
              </p>
              <ul className="text-gray-600 dark:text-gray-400 space-y-2 list-disc list-inside">
                <li>Provided product care and technical support for TELUS customers, enhancing customer experience and satisfaction</li>
                <li>Resolved software-related issues for mobile devices, ensuring optimal performance and user experience</li>
                <li>Gained insights into TELUS' internal systems and customer-facing technologies</li>
                <li>Collaborated with cross-functional teams to troubleshoot complex customer issues</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 md:p-8 transition-colors animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Software Developer
              </h4>
              <p className="text-sky-500 dark:text-sky-400 font-medium mb-3">
                Gohar Shafa | Jan 2017 - Oct 2021 | Tehran, Iran
              </p>
              <ul className="text-gray-600 dark:text-gray-400 space-y-2 list-disc list-inside">
                <li>Led the development of large-scale business applications with C# and SQL</li>
                <li>Built Windows-based applications with scalable solutions using Visual Studio</li>
                <li>Collaborated with Waterfall methodology team to ensure successful delivery of high-performance software</li>
              </ul>
            </div>
          </div>

          {/* Education */}
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-8 mt-12 text-gray-900 dark:text-white">
            Education
          </h3>

          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 md:p-8 transition-colors animate-fade-in-up">
              <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Post Degree Diploma in Web and Mobile Development
              </h4>
              <p className="text-sky-500 dark:text-sky-400 font-medium mb-2">
                Langara College | 2020 - 2022
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Vancouver, BC
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 md:p-8 transition-colors animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Bachelor's Degree in Computer Software Engineering
              </h4>
              <p className="text-sky-500 dark:text-sky-400 font-medium mb-2">
                Azad University | 2017 - 2019
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Tehran, Iran
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;

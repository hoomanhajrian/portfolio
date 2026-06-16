import React, { useEffect } from 'react';
import SEO from '../components/SEO';
import useScrollNavigation from '../hooks/useScrollNavigation';

const About = () => {
  useScrollNavigation();

  useEffect(() => {
    window.scrollTo(0, 10);
  }, []);

  return (
    <>
      <SEO
        title="About Hooman Hajarian - Full Stack Developer & Data Analyst"
        description="Hooman Hajarian is a Full Stack Developer and Data Analyst with experience in React, Node.js, SQL/PostgreSQL, AWS, and data-driven systems."
        keywords="Full Stack Developer, Data Analyst, SQL, PostgreSQL, React, AWS, Data Analytics"
        url="https://hoomanhajarian.github.io/portfolio/about"
      />
      <div className="w-full min-h-screen bg-white dark:bg-gray-900 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <div className="space-y-10">
            <section className="text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-sky-500 mb-3">Full Stack Developer | Data Analyst</p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              I build reliable web applications and turn data into practical business insight.
            </h1>
            <p className="mx-auto max-w-3xl text-base md:text-lg text-gray-600 dark:text-gray-300 leading-8">
              Experienced in developing full stack solutions with React, Node.js, AWS, SQL, and PostgreSQL. I combine software engineering with data analytics to improve system reliability, support informed decisions, and deliver measurable results.
            </p>
          </section>

          <section className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Technical Focus</h2>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                <li>React, Next.js, JavaScript, TypeScript</li>
                <li>Node.js, Express, REST APIs</li>
                <li>SQL / PostgreSQL database development</li>
                <li>AWS, Docker, Kubernetes, cloud-native deployment</li>
              </ul>
            </div>
            <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Data & Analytics</h2>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                <li>Data cleaning, validation, and integrity</li>
                <li>Visualization, reporting, and business insight</li>
                <li>Google Data Analytics methodology</li>
                <li>Documenting requirements and process workflows</li>
              </ul>
            </div>
            <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Impact</h2>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                <li>Reduced query latency and improved data security</li>
                <li>Resolved critical system issues quickly</li>
                <li>Maintained operational compliance with accurate documentation</li>
                <li>Delivered customer-facing products with reliable backend support</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
              Professional Experience
            </h2>
            <div className="space-y-6">
              <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-6 md:p-8 shadow-sm">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Freelance / Self-Employed</h3>
                <p className="text-sky-500 dark:text-sky-400 font-medium mb-4">Full Stack & Cloud Engineer | Apr 2022 – Present</p>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300 list-disc list-inside text-sm">
                  <li>Built cloud-native applications with Docker and Kubernetes while maintaining strong data integrity across AWS environments.</li>
                  <li>Designed scalable architectures that supported efficient data exchange and PostgreSQL-backed systems.</li>
                  <li>Implemented automated testing and data validation checks to improve reliability and data quality.</li>
                  <li>Administered PostgreSQL databases for query performance, security, and consistent transactional integrity.</li>
                </ul>
              </div>

              <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-6 md:p-8 shadow-sm">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">TELUS Mobileklinik</h3>
                <p className="text-sky-500 dark:text-sky-400 font-medium mb-4">Product Care Specialist | Feb 2022 – Present</p>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300 list-disc list-inside text-sm">
                  <li>Analyzed and resolved complex system issues quickly, minimizing downtime and improving customer experience.</li>
                  <li>Provided hardware and software support while maintaining accurate documentation and compliance.</li>
                  <li>Used data-driven diagnostics to ensure high service quality and support operational continuity.</li>
                </ul>
              </div>

              <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-6 md:p-8 shadow-sm">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Gohar Shafa</h3>
                <p className="text-sky-500 dark:text-sky-400 font-medium mb-4">Software Developer | Jan 2017 – Oct 2019</p>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300 list-disc list-inside text-sm">
                  <li>Built enterprise applications using C# and SQL, with a strong focus on data integrity and advanced mapping logic.</li>
                  <li>Translated complex requirements into clear technical specifications and data-driven solutions.</li>
                  <li>Applied QA and data validation best practices through code reviews and systematic testing.</li>
                  <li>Delivered front-end interfaces integrated with backend services for complete full-stack solutions.</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">Education & Certification</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-6 md:p-8 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Education</h3>
                <div className="space-y-4 text-gray-600 dark:text-gray-300 text-sm">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Diploma in Web and Mobile Development</p>
                    <p>Langara College | 2022</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Bachelor's Degree in Computer Software Engineering</p>
                    <p>Azad University | 2019</p>
                  </div>
                </div>
              </div>
              <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-6 md:p-8 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Certification</h3>
                <div className="space-y-4 text-gray-600 dark:text-gray-300 text-sm">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Google Data Analytics Professional Certificate</p>
                    <p>Coursera | Data cleaning, SQL, visualization, and analytics.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">React.js</p>
                    <p>Udemy | Component-driven web development.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        </div>
      </div>
    </>
  );
};

export default About;

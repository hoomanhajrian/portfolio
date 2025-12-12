import React, { useState } from 'react';
import projectsData from '../data/projectsData';
import SEO from '../components/SEO';
import TiltCard from '../components/TiltCard';
import useScrollNavigation from '../hooks/useScrollNavigation';

const Projects = () => {
  useScrollNavigation();
  const [filter, setFilter] = useState('all');
  const [loadedImages, setLoadedImages] = useState({});

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'mobile', label: 'Mobile' },
  ];

  const filteredProjects = filter === 'all'
    ? projectsData
    : projectsData.filter(project => project.category === filter);

  const handleImageLoad = (projectId) => {
    setLoadedImages(prev => ({ ...prev, [projectId]: true }));
  };

  return (
    <>
      <SEO 
        title="Projects Portfolio - Hooman Hajarian"
        description="Explore 13+ web and mobile projects by Hooman Hajarian including Next.js applications, React e-commerce platforms, mobile apps, and full-stack solutions. Projects include Pacivil, Tariq Louis, Gojunk4moving, and more."
        keywords="Portfolio Projects, React Projects, Next.js Applications, Web Development Portfolio, Mobile Apps, E-commerce Platforms, Full Stack Projects"
        url="https://hoomanhajrian.github.io/portfolio/projects"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 bg-white dark:bg-gray-900">
        <div className="animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900 dark:text-white">
            My Projects
          </h2>
          <p className="text-xl text-center text-gray-600 dark:text-gray-400 mb-8">
            Here are some of my recent works and side projects
          </p>

          {/* Filter Buttons */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setFilter(category.id)}
                  className={`px-6 py-3 font-semibold transition-all ${
                    filter === category.id
                      ? 'bg-sky-500 text-white dark:bg-sky-600'
                      : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <div key={project.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                <TiltCard className="h-full min-h-[480px] flex flex-col">
                  {/* Image Container */}
                  <div className="relative w-full h-[200px] overflow-hidden rounded-t-3xl">
                    {!loadedImages[project.id] && (
                      <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700 animate-pulse" />
                    )}
                    <img
                      src={project.imgUrl}
                      alt={project.name}
                      onLoad={() => handleImageLoad(project.id)}
                      className={`w-full h-full object-cover transition-opacity ${
                        loadedImages[project.id] ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-grow p-5 flex flex-col">
                    <div className="flex justify-between items-center mb-2">
                      <h5 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {project.name}
                      </h5>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {project.year}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 text-xs font-medium rounded-full border border-sky-500 text-sky-500 dark:border-sky-400 dark:text-sky-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 mt-auto">
                      <a
                        href={project.gitHub}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                        Code
                      </a>
                      {project.href && project.href !== '#' && (
                        <a
                          href={project.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </TiltCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;

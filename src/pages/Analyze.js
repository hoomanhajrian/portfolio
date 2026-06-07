import React from 'react';
import SEO from '../components/SEO';
import useScrollNavigation from '../hooks/useScrollNavigation';

const Analyze = () => {
  useScrollNavigation();

  const analysisProjects = [
    {
      title: 'Customer Churn Analysis',
      dataset: 'Subscription data, product usage, support logs',
      tools: 'Python, pandas, scikit-learn, Power BI',
      impact: 'Identified high-risk segments and reduced churn by 18% through targeted retention strategies.',
    },
    {
      title: 'Sales Trend Forecast',
      dataset: 'Monthly sales, inventory, and promotion history',
      tools: 'SQL, pandas, Prophet, Tableau',
      impact: 'Forecasted demand for the next 6 months and improved inventory planning for seasonal products.',
    },
    {
      title: 'Product Mix Optimization',
      dataset: 'Product margins, customer demand, and channel performance',
      tools: 'Excel, Python, matplotlib',
      impact: 'Recommended a product mix change that increased average margin by 12%.',
    },
  ];

  return (
    <>
      <SEO
        title="Data Analysis Portfolio - Hooman Hajarian"
        description="Explore data analysis projects, insights, and analytical workflows from Hooman Hajarian. Includes customer churn analysis, sales forecasting, and product mix optimization." 
        keywords="Data Analysis, Analytics Portfolio, Sales Forecasting, Churn Analysis, Business Intelligence, Python, pandas, SQL"
        url="https://hoomanhajrian.github.io/portfolio/analyze"
      />

      <div className="px-4 sm:px-6 lg:px-8 py-10 md:py-14 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto space-y-12">
          <section className="text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-sky-500 mb-3">Data Analysis Portfolio</p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Turning data into insights, strategy, and business outcomes.
            </h1>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              I build clear, actionable analytics stories from complex data. Each project is centered on business impact, clean data workflows, and visualization that helps teams make confident decisions.
            </p>
          </section>

          <section className="grid gap-6 md:grid-cols-3">
            {analysisProjects.map((project, index) => (
              <div
                key={project.title}
                className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 transition hover:-translate-y-1 hover:shadow-lg"
                style={{ transitionDuration: '200ms', animationDelay: `${index * 80}ms` }}
              >
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{project.title}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{project.dataset}</p>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-sky-500 mb-1">Tools</p>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">{project.tools}</p>
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-sky-500 mb-1">Impact</p>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">{project.impact}</p>
                  </div>
                </div>
              </div>
            ))}
          </section>

          <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">
            <div className="space-y-6">
              <div className="bg-sky-50 dark:bg-sky-950/20 rounded-3xl border border-sky-100 dark:border-sky-900/70 p-8 shadow-sm">
                <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">Sample insights at a glance</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-7">
                  These visuals demonstrate how I structure an analysis story: define the question, compare performance, and highlight the result that moves the business forward.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
                  <p className="text-sm uppercase tracking-[0.2em] text-sky-500 mb-3">Revenue Growth</p>
                  <div className="space-y-3">
                    <div className="flex items-end gap-2 h-44">
                      {[70, 85, 60, 90, 120, 105].map((value, idx) => (
                        <div key={idx} className="flex-1 flex flex-col items-center">
                          <div className="w-full rounded-t-3xl bg-sky-500 dark:bg-sky-400" style={{ height: `${value}%` }} />
                          <span className="mt-2 text-[11px] text-gray-500 dark:text-gray-400">M{idx + 1}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Month-over-month revenue improvement in a product line.</p>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
                  <p className="text-sm uppercase tracking-[0.2em] text-sky-500 mb-3">Customer Segments</p>
                  <div className="space-y-4">
                    {[
                      { label: 'High risk', value: '28%' },
                      { label: 'Growth', value: '42%' },
                      { label: 'Stable', value: '30%' },
                    ].map((segment) => (
                      <div key={segment.label} className="flex justify-between items-center text-sm text-gray-700 dark:text-gray-300">
                        <span>{segment.label}</span>
                        <span className="font-semibold text-sky-600 dark:text-sky-400">{segment.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Analysis process</h3>
              <div className="space-y-4">
                {[
                  { step: 'Collect', detail: 'Gathered data from internal systems, product logs, and customer feedback.' },
                  { step: 'Clean', detail: 'Standardized formats, removed duplicates, and handled missing values.' },
                  { step: 'Analyze', detail: 'Used SQL and Python to model trends, anomalies, and correlations.' },
                  { step: 'Visualize', detail: 'Built dashboards and charts that surface the right business signals.' },
                  { step: 'Deliver', detail: 'Translated findings into recommendations for product and growth teams.' },
                ].map((item) => (
                  <div key={item.step} className="rounded-3xl border border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900">
                    <p className="text-sm uppercase tracking-[0.2em] text-sky-500 mb-2">{item.step}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-sky-500 mb-3">Skills & tools</p>
                <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">Analytics technologies I use</h2>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
                  I combine analytics scripting, visualization, and domain understanding to deliver insights that are easy to act on.
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                {['Python', 'pandas', 'SQL', 'Tableau', 'Power BI', 'Data Storytelling'].map((skill) => (
                  <span key={skill} className="inline-flex items-center justify-center rounded-2xl border border-sky-200 dark:border-sky-700 bg-sky-50 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300 py-2 px-3">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Analyze;

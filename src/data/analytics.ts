/**
 * Data & Analytics section. Only skills backed by the resume/LinkedIn; no claimed outcomes.
 */
export const analytics = {
  intro:
    'Alongside full stack work I hold the Google Data Analytics Professional Certificate. I use the same discipline in my day-to-day engineering: clean data models, validation before anything ships, and SQL that answers real questions.',
  credential: { name: 'Google Data Analytics Professional Certificate', issuer: 'Google / Coursera' },
  skills: ['SQL', 'PostgreSQL', 'SQL Server', 'Python', 'Data cleaning', 'Data validation', 'Data modelling', 'Visualization', 'Spreadsheets'],
  process: [
    { step: 'Ask', detail: 'Pin down the business question and what a useful answer looks like.' },
    { step: 'Prepare', detail: 'Collect data from the systems that hold it and check where it came from.' },
    { step: 'Clean', detail: 'Standardize formats, remove duplicates and handle missing values.' },
    { step: 'Analyze', detail: 'Query and model the data with SQL and Python to find trends and outliers.' },
    { step: 'Share', detail: 'Turn findings into clear charts and a short recommendation people can act on.' },
  ],
  inEngineering: [
    'Data-mapping logic and validation for large-scale record systems (C# / SQL).',
    'PostgreSQL administration focused on query performance, security and integrity.',
    'One typed contract from schema to UI so bad data fails the build, not the customer.',
  ],
}

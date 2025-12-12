import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = 'Hooman Hajarian - Full Stack Developer',
  description = 'Full Stack Developer specializing in React, Next.js, TypeScript, and Node.js. Portfolio showcasing 13+ web and mobile applications.',
  keywords = 'Full Stack Developer, React Developer, Next.js, TypeScript, Node.js, Web Developer, Portfolio, Hooman Hajarian',
  ogImage = '/img/me.jpg',
  url = 'https://hoomanhajrian.github.io/portfolio/'
}) => {
  const fullTitle = title.includes('Hooman Hajarian') 
    ? title 
    : `${title} | Hooman Hajarian`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Hooman Hajarian",
          "url": "https://hoomanhajrian.github.io/portfolio/",
          "image": "https://hoomanhajrian.github.io/portfolio/img/me.jpg",
          "sameAs": [
            "https://github.com/hoomanhajrian",
            "https://linkedin.com/in/hoomanhajrian"
          ],
          "jobTitle": "Full Stack Developer",
          "worksFor": {
            "@type": "Organization",
            "name": "Freelance"
          },
          "knowsAbout": [
            "React",
            "Next.js",
            "TypeScript",
            "Node.js",
            "JavaScript",
            "Web Development",
            "Mobile Development"
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEO;

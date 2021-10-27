import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const SEO = ({ title }: { title: string }): JSX.Element => (
  <HelmetProvider>
    <Helmet htmlAttributes={{ lang: 'en' }}>
      <title>{`${title}`}</title>
    </Helmet>
  </HelmetProvider>
);

export default SEO;

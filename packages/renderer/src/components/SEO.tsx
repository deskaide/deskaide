import { Helmet, HelmetProvider } from 'react-helmet-async';

export const SEO = ({ title }: { title: string }): JSX.Element => (
  <HelmetProvider>
    <Helmet htmlAttributes={{ lang: 'en' }}>
      <title>{`${title}`}</title>
    </Helmet>
  </HelmetProvider>
);

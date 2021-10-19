// import React from 'react';
// import { Helmet, HelmetProvider } from 'react-helmet-async';
// import urljoin from 'url-join';
// import PropTypes from 'prop-types';

// import generateSchema from '../utils/generateSchema';
// import { siteMetadata } from '../config';

// const SEO = ({
//   title,
//   description,
//   url = '',
//   image = '',
//   author,
//   keywords,
//   createdAt,
//   updatedAt,
//   pageType,
// }) => {
//   const seoTitle = `${title ? `${title} ${siteMetadata.titleSeparator} ` : ``}${
//     siteMetadata.siteTitle
//   }`;
//   const canonicalUrl = urljoin(siteMetadata.siteUrl, url);
//   const metaDescription = description || siteMetadata.siteDescription;
//   const seoImage = image || siteMetadata.seoImage;

//   const schemaOrgJSONLD = generateSchema({
//     author,
//     image: seoImage,
//     description: metaDescription,
//     url: canonicalUrl,
//     title: seoTitle,
//     keywords,
//     updatedAt,
//     createdAt,
//     type: pageType,
//     config: {
//       ...siteMetadata,
//     },
//   });

//   return (
//     <HelmetProvider>
//       <Helmet htmlAttributes={{ lang: 'en' }}>
//         {/* General tags */}
//         <title>{`${seoTitle}`}</title>
//         <meta name="description" content={metaDescription} />
//         <meta
//           name="image"
//           content={seoImage ? urljoin(siteMetadata.siteUrl, seoImage) : ''}
//         />

//         {/* Schema.org tags */}
//         <script type="application/ld+json">
//           {JSON.stringify(schemaOrgJSONLD)}
//         </script>

//         {/* OpenGraph tags */}
//         <meta property="og:url" content={`${canonicalUrl}`} />
//         {pageType === 'Article' ? (
//           <meta property="og:type" content="article" />
//         ) : null}
//         <meta property="og:title" content={seoTitle} />
//         <meta property="og:description" content={metaDescription} />
//         <meta
//           property="og:image"
//           content={seoImage ? urljoin(siteMetadata.siteUrl, seoImage) : ''}
//         />
//         {keywords && <meta name="keywords" content={keywords.join(', ')} />}
//         <meta property="fb:app_id" content={siteMetadata.fbAppId || ''} />

//         {/* Twitter Card tags */}
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta
//           name="twitter:creator"
//           content={siteMetadata.author ? siteMetadata.author.links.twitter : ''}
//         />
//         <meta name="twitter:title" content={seoTitle} />
//         <meta name="twitter:description" content={metaDescription} />
//         <meta
//           name="twitter:image"
//           content={seoImage ? urljoin(siteMetadata.siteUrl, seoImage) : ''}
//         />
//       </Helmet>
//     </HelmetProvider>
//   );
// };

// SEO.defaultProps = {
//   title: '',
//   description: '',
//   url: '',
//   image: '',
//   author: {},
//   keywords: [],
//   createdAt: new Date().toISOString(),
//   updatedAt: new Date().toISOString(),
//   pageType: '',
// };

// SEO.propTypes = {
//   title: PropTypes.string,
//   description: PropTypes.string,
//   url: PropTypes.string,
//   image: PropTypes.string,
//   author: PropTypes.shape({
//     name: PropTypes.string,
//   }),
//   keywords: PropTypes.arrayOf(PropTypes.string),
//   createdAt: PropTypes.string,
//   updatedAt: PropTypes.string,
//   pageType: PropTypes.string,
// };

// export default SEO;
export {};

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: var(--color-bg-0);
    color: var(--color-text-0);
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: ${({ theme }) => theme.fontSizes.body};
    line-height: ${({ theme }) => theme.lineHeights.body};
  }

  p {
    margin: 1rem 0 2rem 0;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    line-height: ${({ theme }) => theme.lineHeights.heading};
    margin: ${({ theme }) => theme.space.xl}px 0;
  }

  h1 {
    font-size: ${({ theme }) => theme.fontSizes.h1};
  }
  
  h2 {
    font-size: ${({ theme }) => theme.fontSizes.h2};
  }
  
  h3 {
    font-size: ${({ theme }) => theme.fontSizes.h3};
  }
  
  h4 {
    font-size: ${({ theme }) => theme.fontSizes.h4};
  }
  
  h5 {
    font-size: ${({ theme }) => theme.fontSizes.h5};
  }
  
  h6 {
    font-size: ${({ theme }) => theme.fontSizes.h6};
  }

  a {
    text-decoration: none;
    color: var(--color-accent-0);
    transition: all ease-in-out 0.3s;

    &:hover {
      color: var(--color-accent-1);
    }
  }

  img {
    filter: ${({ theme }) =>
      theme.name === 'dark' ? `brightness(0.8) contrast(1.2)` : ''};
  }

  blockquote {
    p {
      &:first-child {
        margin-top: 0;
      }
 
      &:last-child {
        margin-bottom: 0;
      }
    }

    margin: ${({ theme }) => theme.space.lg}px 0;
    padding: ${({ theme }) => theme.space.xl}px;
    border-left: 4px solid ${({ theme }) => theme.colors.primary0};
    font-size: ${({ theme }) => theme.fontSizes.h5};
    font-style: italic;
    line-height: ${({ theme }) => theme.lineHeights.heading};
    background-color: var(--color-bg-1);
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  .gatsby-highlight {
    overflow: auto;
    margin: ${({ theme }) => theme.space.lg}px 0;
    
    pre {
      border-radius: 8px;
    }
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      font-size: ${({ theme }) => theme.fontSizes.body};
      font-weight: ${({ theme }) => theme.fontWeights.normal};
      line-height: ${({ theme }) => theme.lineHeights.list};

      ::before {
        color: var(--color-text-0);
        content: '⧉';
        margin-right: ${({ theme }) => theme.space.md}px;
      }
    }
  }

  .post-body {
    word-break: break-word;
    
    p {
      margin: 2rem 0;

      :first-child {
        margin-top: 0;
      }
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      scroll-margin-top: 76px;
    }
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background-color: var(--color-bg-1);
  }

  ::-webkit-scrollbar-thumb {
    cursor: pointer;
    background-color: var(--color-accent-0);
    transition: all ease-in-out 0.3s;

    
    :hover {
      background-color: var(--color-accent-1);
    }
    
    :active {
      background-color: var(--color-accent-2);
    }
  }
`;

export default GlobalStyle;

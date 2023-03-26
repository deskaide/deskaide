import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: var(--color-bg-0);
    color: var(--color-text-1);
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: ${({ theme }) => theme.fontSizes.body};
    line-height: ${({ theme }) => theme.lineHeights.body};
  }

  p {
    margin: 1rem 0 2rem 0;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    font-family: ${({ theme }) => theme.fonts.heading};
    line-height: ${({ theme }) => theme.lineHeights.heading};
    margin: ${({ theme }) => theme.space.md}px 0;
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
      theme.name === 'dark' ? 'brightness(0.8) contrast(1.2)' : ''};
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
    border-left: 4px solid ${({ theme }) => theme.colors.primary[0]};
    font-size: ${({ theme }) => theme.fontSizes.h5};
    font-style: italic;
    line-height: ${({ theme }) => theme.lineHeights.heading};
    background-color: var(--color-bg-1);
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  pre, code {
    font-family: ${({ theme }) => theme.fonts.code};
  }

  .deskaide-highlight {
    display: grid;

    pre {
      white-space: pre-wrap;
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

      p {
        margin: 0;
        display: inline-block;
      }
    }
  }

  ol {
      margin-left: ${({ theme }) => theme.space.lg}px;
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

  .logo-bottom {
    fill: var(--color-dark-1);
  }

  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }

  table {
    border-collapse: collapse;
    width: 100%;
    margin-bottom: 2rem;
  }

  th, td {
    padding: ${({ theme }) => theme.space.md}px;
    text-align: left;
    border: 1px solid var(--color-dark-2);
  }

  input[type='checkbox'] {
    accent-color: var(--color-accent-1);

    &[aria-disabled="true"] {
      pointer-events: none;
      accent-color: var(--color-accent-2);
    }
  }

  input {
    ::placeholder {
      color: var(--color-text-1);
      opacity: 0.6;
    }
  }

  .deskaide-md-editor {
    width: 100%;
    color: var(--color-text-1);
    background: var(--color-bg-1);
    border-radius: 4px;
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    padding: ${({ theme }) => theme.space[4]}px;
    padding-top: 0;
    overflow-y: auto;

    .cm-gutters {
      display: none;
    }

    .cm-line {
      white-space: pre-wrap;
    }

    .cm-editor {
      color: var(--color-text-1);
      background: var(--color-bg-1);
      padding-top: 1rem;

      &.cm-focused {
        outline: none;
      }

      .cm-line {
        padding: 0;

        &:first-child span {
          margin-top: 0;
        }
      }
    }

    .cm-scroller {
      font-family: ${({ theme }) => theme.fonts.code};
    }

    .cm-selectionBackground {
      background: var(--color-bg-1) !important;
    }

    .cm-content {
      :: selection {
        background: var(--color-bg-1) !important;
      }
    }
  }

  .deskaide-md-preview {
    border-bottom: 2px solid var(--color-bg-1);
    overflow-y: auto;
    background: var(--color-bg-1);
    border-radius: 4px;
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    padding: ${({ theme }) => theme.space[4]}px;
    padding-top: 0;
    color: var(--color-text-0);

    .contains-task-list {
      margin: ${({ theme }) => theme.space[4]}px 0;

      .task-list-item {
        p {
          margin: 0;
        }

        &::before {
          content: none;
        }
      }
    }
  }

  .deskaide-inline-highlight {
    font-weight: bold;
    color: var(--color-text-1);

    &:before, &:after {
      content: "\`";
    }
  }

  ::-webkit-scrollbar-thumb {
    cursor: pointer;
    background-color: var(--color-bg-2);
    transition: all ease-in-out 0.3s;

    :hover {
      background-color: var(--color-accent-2);
    }

    :active {
      background-color: var(--color-accent-2);
    }
  }

  :: selection {
    color: var(--color-bg-1);
    background-color: var(--color-accent-0) !important;
  }
`;

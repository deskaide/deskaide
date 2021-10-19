import React from 'react';
import styled from 'styled-components';
import { variant, space, typography, color, layout } from 'styled-system';

const variants = {
  h1: {
    fontSize: 'h1',
    lineHeight: 'heading',
    fontWeight: 'bold',
  },
  h2: {
    fontSize: 'h2',
    lineHeight: 'heading',
    fontWeight: 'bold',
  },
  h3: {
    fontSize: 'h3',
    lineHeight: 'heading',
    fontWeight: 'bold',
  },
  h4: {
    fontSize: 'h4',
    lineHeight: 'heading',
    fontWeight: 'bold',
  },
  h5: {
    fontSize: 'h5',
    lineHeight: 'heading',
    fontWeight: 'bold',
  },
  h6: {
    fontSize: 'h6',
    lineHeight: 'heading',
    fontWeight: 'bold',
  },
  p: {
    fontSize: 'body',
    lineHeight: 'body',
    fontWeight: 'normal',
  },
  label1: {
    fontSize: 'label1',
    lineHeight: '0',
    fontWeight: 'normal',
  },
  label2: {
    fontSize: 'label2',
    lineHeight: '0',
    fontWeight: 'normal',
  },
  display1: {
    fontSize: 'display1',
    lineHeight: '0',
    fontWeight: 'bold',
  },
  display2: {
    fontSize: 'display2',
    lineHeight: '0',
    fontWeight: 'bold',
  },
  blockquote: {
    fontSize: 'h5',
    lineHeight: 'body',
    fontWeight: 'medium',
  },
};

interface TextBaseProps {
  variant: string;
  as?: React.ElementType;
}

const TextBase = styled.p<TextBaseProps>`
  ${variant({
    variants,
  })};
  ${space};
  ${typography};
  ${color};
  ${layout};
`;

// const RawHTML: React.FC<{
//   dangerouslySetInnerHTML: { __html: string };
// }> = styled.div`
//   ${space};
//   ${typography};
//   ${color};
//   ${layout};
// `;

// eslint-disable-next-line no-shadow
const Text: React.FC<{
  variant: string;
  html?: string;
}> = ({ variant = 'p', ...props }) => {
  switch (variant) {
    case 'h1':
      return <TextBase variant={variant} as="h1" {...props} />;
    case 'h2':
      return <TextBase variant={variant} as="h2" {...props} />;
    case 'h3':
      return <TextBase variant={variant} as="h3" {...props} />;
    case 'h4':
      return <TextBase variant={variant} as="h4" {...props} />;
    case 'h5':
      return <TextBase variant={variant} as="h5" {...props} />;
    case 'h6':
      return <TextBase variant={variant} as="h6" {...props} />;
    case 'display1':
      return <TextBase variant={variant} as="h1" {...props} />;
    case 'display2':
      return <TextBase variant={variant} as="h1" {...props} />;
    case 'label1':
      return <TextBase variant={variant} as="label" {...props} />;
    case 'label2':
      return <TextBase variant={variant} as="label" {...props} />;
    case 'blockquote':
      return <TextBase variant={variant} as="blockquote" {...props} />;
    // case 'raw':
    //   return html ? (
    //     <RawHTML dangerouslySetInnerHTML={{ __html: html }} {...props} />
    //   ) : (
    //     <></>
    //   );
    default:
      return <TextBase variant="p" as="p" {...props} />;
  }
};

export default Text;

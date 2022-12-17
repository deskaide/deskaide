import * as React from 'react';
import styled from 'styled-components';
import {
  variant as generateVariant,
  space,
  typography,
  color,
  layout,
  border,
} from 'styled-system';
import type {
  SpaceProps,
  TypographyProps,
  ColorProps,
  LayoutProps,
  BorderProps,
} from 'styled-system';

type TextVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'display1'
  | 'display2'
  | 'label1'
  | 'label2'
  | 'blockquote'
  | 'raw';

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
    fontWeight: 'normal',
  },
};

type TextProps = SpaceProps &
  TypographyProps &
  ColorProps &
  LayoutProps &
  BorderProps & {
    variant?: string;
    as?: React.ElementType;
    children?: React.ReactNode;
  };

const TextBase = styled.p<TextProps>`
  ${generateVariant({
    variants,
  })};
  ${space};
  ${typography};
  ${color};
  ${layout};
  ${border};
`;

const RawHTMLContainer = styled.div`
  ${space};
  ${typography};
  ${color};
  ${layout};
  ${border};
`;

const RawHTML: React.FC<TextProps & { html: string }> = ({
  html,
  ...props
}) => (
  <RawHTMLContainer dangerouslySetInnerHTML={{ __html: html }} {...props} />
);

export const Text: React.FC<
  TextProps & {
    variant?: TextVariant;
    html?: string;
  }
> = ({ variant = 'p', html, ...props }) => {
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
    case 'raw':
      return <RawHTML html={html as string} {...props} />;
    default:
      return <TextBase variant="p" as="p" {...props} />;
  }
};

import { HighlightStyle } from '@codemirror/language';
import { styleTags, Tag, tags } from '@lezer/highlight';
import type { MarkdownConfig } from '@lezer/markdown';

import { baseTheme } from '../styles';

const customTags = {
  taskMarker: Tag.define(),
};

export const MarkStylingExtension: MarkdownConfig = {
  props: [
    styleTags({
      TaskMarker: customTags.taskMarker,
    }),
  ],
};

export const markdownHighlighting = HighlightStyle.define([
  {
    tag: tags.content,
    fontFamily: baseTheme.fonts.body,
    fontSize: baseTheme.fontSizes.body,
    lineHeight: baseTheme.lineHeights.body,
  },
  {
    tag: tags.heading1,
    fontFamily: baseTheme.fonts.heading,
    fontSize: baseTheme.fontSizes.h1,
    fontWeight: baseTheme.fontWeights.bold,
    lineHeight: baseTheme.lineHeights.heading,
    margin: `${baseTheme.space.md}px 0`,
    display: 'inline-block',
  },
  {
    tag: tags.heading2,
    fontFamily: baseTheme.fonts.heading,
    fontSize: baseTheme.fontSizes.h2,
    fontWeight: baseTheme.fontWeights.bold,
    lineHeight: baseTheme.lineHeights.heading,
    margin: `${baseTheme.space.md}px 0`,
    display: 'inline-block',
  },
  {
    tag: tags.heading3,
    fontFamily: baseTheme.fonts.heading,
    fontSize: baseTheme.fontSizes.h3,
    fontWeight: baseTheme.fontWeights.bold,
    lineHeight: baseTheme.lineHeights.heading,
    margin: `${baseTheme.space.md}px 0`,
    display: 'inline-block',
  },
  {
    tag: tags.heading4,
    fontFamily: baseTheme.fonts.heading,
    fontSize: baseTheme.fontSizes.h4,
    fontWeight: baseTheme.fontWeights.bold,
    lineHeight: baseTheme.lineHeights.heading,
    margin: `${baseTheme.space.md}px 0`,
    display: 'inline-block',
  },
  {
    tag: tags.heading5,
    fontFamily: baseTheme.fonts.heading,
    fontSize: baseTheme.fontSizes.h5,
    fontWeight: baseTheme.fontWeights.bold,
    lineHeight: baseTheme.lineHeights.heading,
    margin: `${baseTheme.space.md}px 0`,
    display: 'inline-block',
  },
  {
    tag: tags.heading6,
    fontFamily: baseTheme.fonts.heading,
    fontSize: baseTheme.fontSizes.h6,
    fontWeight: baseTheme.fontWeights.bold,
    lineHeight: baseTheme.lineHeights.heading,
    margin: `${baseTheme.space.md}px 0`,
    display: 'inline-block',
  },
  {
    tag: tags.monospace,
    fontFamily: baseTheme.fonts.code,
    lineHeight: baseTheme.lineHeights.body,
    display: 'inline-block',
  },
  {
    tag: tags.list,
    fontFamily: baseTheme.fonts.body,
    fontSize: baseTheme.fontSizes.body,
    lineHeight: baseTheme.lineHeights.body,
  },
  {
    tag: customTags.taskMarker,
    fontFamily: baseTheme.fonts.code,
    color: '#d19a66',
  },
]);

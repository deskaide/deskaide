import { useEffect, useState, useRef } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap, highlightActiveLine } from '@codemirror/view';
import { defaultKeymap } from '@codemirror/commands';
import { history, historyKeymap } from '@codemirror/history';
import { indentOnInput } from '@codemirror/language';
import { bracketMatching } from '@codemirror/matchbrackets';
import { lineNumbers, highlightActiveLineGutter } from '@codemirror/gutter';
import {
  defaultHighlightStyle,
  HighlightStyle,
  tags,
} from '@codemirror/highlight';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { oneDark } from '@codemirror/theme-one-dark';
import { baseTheme } from '../styles/themes';

export const transparentTheme = EditorView.theme({
  '&': {
    backgroundColor: 'transparent !important',
    height: '100%',
  },
});

const syntaxHighlighting = HighlightStyle.define([
  {
    tag: tags.heading1,
    fontSize: baseTheme.fontSizes.h1,
    fontWeight: baseTheme.fontWeights.bold,
    fontFamily: baseTheme.fonts.heading,
    lineHeight: baseTheme.lineHeights.heading,
    margin: `${baseTheme.space.md}px 0`,
  },
  {
    tag: tags.heading2,
    fontSize: baseTheme.fontSizes.h2,
    fontWeight: baseTheme.fontWeights.bold,
    fontFamily: baseTheme.fonts.heading,
    lineHeight: baseTheme.lineHeights.heading,
    margin: `${baseTheme.space.md}px 0`,
  },
  {
    tag: tags.heading3,
    fontSize: baseTheme.fontSizes.h3,
    fontWeight: baseTheme.fontWeights.bold,
    fontFamily: baseTheme.fonts.heading,
    lineHeight: baseTheme.lineHeights.heading,
    margin: `${baseTheme.space.md}px 0`,
  },
  {
    tag: tags.heading4,
    fontSize: baseTheme.fontSizes.h4,
    fontWeight: baseTheme.fontWeights.bold,
    fontFamily: baseTheme.fonts.heading,
    lineHeight: baseTheme.lineHeights.heading,
    margin: `${baseTheme.space.md}px 0`,
  },
  {
    tag: tags.heading5,
    fontSize: baseTheme.fontSizes.h5,
    fontWeight: baseTheme.fontWeights.bold,
    fontFamily: baseTheme.fonts.heading,
    lineHeight: baseTheme.lineHeights.heading,
    margin: `${baseTheme.space.md}px 0`,
  },
  {
    tag: tags.heading6,
    fontSize: baseTheme.fontSizes.h6,
    fontWeight: baseTheme.fontWeights.bold,
    fontFamily: baseTheme.fonts.heading,
    lineHeight: baseTheme.lineHeights.heading,
    margin: `${baseTheme.space.md}px 0`,
  },
  {
    tag: tags.content,
    fontSize: baseTheme.fontSizes.body,
    fontWeight: baseTheme.fontWeights.normal,
    fontFamily: baseTheme.fonts.body,
    lineHeight: baseTheme.lineHeights.body,
    margin: '1rem 0 2rem 0',
    display: 'block',
  },
  {
    tag: tags.comment,
    fontSize: baseTheme.fontSizes.body,
    fontFamily: baseTheme.fonts.code,
  },
  {
    tag: tags.lineComment,
    fontSize: baseTheme.fontSizes.body,
    fontFamily: baseTheme.fonts.code,
  },
  {
    tag: tags.blockComment,
    fontSize: baseTheme.fontSizes.body,
    fontFamily: baseTheme.fonts.code,
  },
  {
    tag: tags.docComment,
    fontSize: baseTheme.fontSizes.body,
    fontFamily: baseTheme.fonts.code,
  },
  {
    tag: tags.name,
    fontSize: baseTheme.fontSizes.body,
    fontFamily: baseTheme.fonts.code,
  },
  {
    tag: tags.variableName,
    fontSize: baseTheme.fontSizes.body,
    fontFamily: baseTheme.fonts.code,
  },
  {
    tag: tags.typeName,
    fontSize: baseTheme.fontSizes.body,
    fontFamily: baseTheme.fonts.code,
  },
  {
    tag: tags.tagName,
    fontSize: baseTheme.fontSizes.body,
    fontFamily: baseTheme.fonts.code,
  },
  {
    tag: tags.propertyName,
    fontSize: baseTheme.fontSizes.body,
    fontFamily: baseTheme.fonts.code,
  },
  {
    tag: tags.attributeName,
    fontSize: baseTheme.fontSizes.body,
    fontFamily: baseTheme.fonts.code,
  },
  {
    tag: tags.className,
    fontSize: baseTheme.fontSizes.body,
    fontFamily: baseTheme.fonts.code,
  },
  {
    tag: tags.labelName,
    fontSize: baseTheme.fontSizes.body,
    fontFamily: baseTheme.fonts.code,
  },
  {
    tag: tags.namespace,
    fontSize: baseTheme.fontSizes.body,
    fontFamily: baseTheme.fonts.code,
  },
  {
    tag: tags.macroName,
    fontSize: baseTheme.fontSizes.body,
    fontFamily: baseTheme.fonts.code,
  },
  {
    tag: tags.literal,
    fontSize: baseTheme.fontSizes.body,
    fontFamily: baseTheme.fonts.code,
  },
  {
    tag: tags.string,
    fontSize: baseTheme.fontSizes.body,
    fontFamily: baseTheme.fonts.code,
  },
  {
    tag: tags.docString,
    fontSize: baseTheme.fontSizes.body,
    fontFamily: baseTheme.fonts.code,
  },
  {
    tag: tags.character,
    fontSize: baseTheme.fontSizes.body,
    fontFamily: baseTheme.fonts.code,
  },
  {
    tag: tags.attributeValue,
    fontSize: baseTheme.fontSizes.body,
    fontFamily: baseTheme.fonts.code,
  },
  {
    tag: tags.number,
    fontSize: baseTheme.fontSizes.body,
    fontFamily: baseTheme.fonts.code,
  },
  {
    tag: tags.integer,
    fontSize: baseTheme.fontSizes.body,
    fontFamily: baseTheme.fonts.code,
  },
  {
    tag: tags.float,
    fontSize: baseTheme.fontSizes.body,
    fontFamily: baseTheme.fonts.code,
  },
  {
    tag: tags.bool,
    fontSize: baseTheme.fontSizes.body,
    fontFamily: baseTheme.fonts.code,
  },
  {
    tag: tags.regexp,
    fontSize: baseTheme.fontSizes.body,
    fontFamily: baseTheme.fonts.code,
  },
  {
    tag: tags.escape,
    fontSize: baseTheme.fontSizes.body,
    fontFamily: baseTheme.fonts.code,
  },
  {
    tag: tags.color,
    fontSize: baseTheme.fontSizes.body,
    fontFamily: baseTheme.fonts.code,
  },
  {
    tag: tags.url,
    fontSize: baseTheme.fontSizes.body,
    fontFamily: baseTheme.fonts.code,
  },
  {
    tag: tags.keyword,
    fontSize: baseTheme.fontSizes.body,
    fontFamily: baseTheme.fonts.code,
  },
  {
    tag: tags.self,
    fontSize: baseTheme.fontSizes.body,
    fontFamily: baseTheme.fonts.code,
  },
  {
    tag: tags.null,
    fontSize: baseTheme.fontSizes.body,
    fontFamily: baseTheme.fonts.code,
  },
  {
    tag: tags.atom,
    fontSize: baseTheme.fontSizes.body,
    fontFamily: baseTheme.fonts.code,
  },
  {
    tag: tags.unit,
    fontSize: baseTheme.fontSizes.body,
    fontFamily: baseTheme.fonts.code,
  },
  {
    tag: tags.modifier,
    fontSize: baseTheme.fontSizes.body,
    fontFamily: baseTheme.fonts.code,
  },
  {
    tag: tags.operatorKeyword,
    fontSize: baseTheme.fontSizes.body,
    fontFamily: baseTheme.fonts.code,
  },
  {
    tag: tags.controlKeyword,
    fontSize: baseTheme.fontSizes.body,
    fontFamily: baseTheme.fonts.code,
  },
  {
    tag: tags.definitionKeyword,
    fontSize: baseTheme.fontSizes.body,
    fontFamily: baseTheme.fonts.code,
  },
  {
    tag: tags.moduleKeyword,
    fontSize: baseTheme.fontSizes.body,
    fontFamily: baseTheme.fonts.code,
  },
]);

import type React from 'react';

interface Props {
  initialDoc: string;
  onChange?: (state: EditorState) => void;
  showGutter?: boolean;
}

const useCodeMirror = <T extends Element>(
  props: Props
): [React.MutableRefObject<T | null>, EditorView?] => {
  const refContainer = useRef<T>(null);
  const [editorView, setEditorView] = useState<EditorView>();
  const { onChange, showGutter = true } = props;
  const extensions = [
    keymap.of([...defaultKeymap, ...historyKeymap]),
    history(),
    indentOnInput(),
    bracketMatching(),
    defaultHighlightStyle.fallback,

    markdown({
      base: markdownLanguage,
      codeLanguages: languages,
      addKeymap: true,
    }),
    oneDark,
    transparentTheme,
    syntaxHighlighting,
    EditorView.lineWrapping,
    EditorView.updateListener.of((update) => {
      if (update.changes) {
        onChange && onChange(update.state);
      }
    }),
  ];

  if (showGutter) {
    extensions.push(
      ...[lineNumbers(), highlightActiveLineGutter(), highlightActiveLine()]
    );
  }

  useEffect(() => {
    if (!refContainer.current) return;

    const startState = EditorState.create({
      doc: props.initialDoc,
      extensions,
    });

    const view = new EditorView({
      state: startState,
      parent: refContainer.current,
    });
    setEditorView(view);
  }, [refContainer]);

  return [refContainer, editorView];
};

export default useCodeMirror;

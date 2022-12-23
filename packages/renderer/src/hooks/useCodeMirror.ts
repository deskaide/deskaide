import { useEffect, useState } from 'react';
import { EditorState, StateEffect } from '@codemirror/state';
import { indentWithTab } from '@codemirror/commands';
import type { ViewUpdate } from '@codemirror/view';
import { EditorView, keymap, placeholder } from '@codemirror/view';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { syntaxHighlighting } from '@codemirror/language';

import { oneDark } from '@codemirror/theme-one-dark';
import type { CodeMirrorProps } from '../components/CodeMirror';
import { markdownHighlighting, MarkStylingExtension } from '../config';

export interface UseCodeMirror extends CodeMirrorProps {
  container?: HTMLDivElement | null;
}

export function useCodeMirror(props: UseCodeMirror) {
  const {
    value,
    selection,
    onChange,
    onUpdate,
    extensions = [],
    autoFocus,
    theme = 'light',
    height = '',
    minHeight = '',
    maxHeight = '',
    placeholder: placeholderStr = '',
    width = '',
    minWidth = '',
    maxWidth = '',
    editable = true,
    readOnly = false,
    indentWithTab: defaultIndentWithTab = true,
    root,
  } = props;
  const [container, setContainer] = useState(props.container);
  const [view, setView] = useState<EditorView>();
  const [state, setState] = useState<EditorState>();
  const defaultLightThemeOption = EditorView.theme(
    {
      '&': {
        backgroundColor: 'var(--color-bg-1)',
        color: 'var(--color-text-1)',
        caretColor: 'var(--color-text-1)',
      },
      '.cm-content': {
        caretColor: 'var(--color-text-1)',
      },
    },
    {
      dark: true,
    }
  );
  const defaultThemeOption = EditorView.theme({
    '&': {
      height,
      minHeight,
      maxHeight,
      width,
      minWidth,
      maxWidth,
    },
  });
  const updateListener = EditorView.updateListener.of((vu: ViewUpdate) => {
    if (vu.docChanged && typeof onChange === 'function') {
      const doc = vu.state.doc;
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const value = doc.toString();
      onChange(value, vu);
    }
  });

  let getExtensions = [updateListener, defaultThemeOption];
  if (defaultIndentWithTab) {
    getExtensions.unshift(keymap.of([indentWithTab]));
  }

  if (placeholderStr) {
    getExtensions.unshift(placeholder(placeholderStr));
  }

  switch (theme) {
    case 'light':
      getExtensions.push(defaultLightThemeOption);
      break;
    case 'dark':
      getExtensions.push(oneDark);
      break;
    default:
      getExtensions.push(theme);
      break;
  }

  if (editable === false) {
    getExtensions.push(EditorView.editable.of(false));
  }
  if (readOnly) {
    getExtensions.push(EditorState.readOnly.of(true));
  }

  if (onUpdate && typeof onUpdate === 'function') {
    getExtensions.push(EditorView.updateListener.of(onUpdate));
  }
  getExtensions = getExtensions.concat(extensions);
  getExtensions = getExtensions.concat([
    markdown({
      base: markdownLanguage,
      codeLanguages: languages,
      extensions: [MarkStylingExtension],
    }),
    syntaxHighlighting(markdownHighlighting),
    EditorView.lineWrapping,
  ]);

  useEffect(() => {
    if (container && !state) {
      const stateCurrent = EditorState.create({
        doc: value,
        selection,
        extensions: getExtensions,
      });
      setState(stateCurrent);
      if (!view) {
        const viewCurrent = new EditorView({
          state: stateCurrent,
          parent: container,
          root,
        });
        setView(viewCurrent);
      }
    }
    return () => {
      if (view) {
        setView(undefined);
      }
    };
  }, [container, state]);

  useEffect(
    () => () => {
      if (view) {
        view.destroy();
        setView(undefined);
      }
    },
    [view]
  );

  useEffect(() => {
    if (autoFocus && view) {
      view.focus();
    }
  }, [autoFocus, view]);

  useEffect(() => {
    if (view) {
      view.dispatch({ effects: StateEffect.reconfigure.of(getExtensions) });
    }
  }, [
    theme,
    extensions,
    height,
    minHeight,
    maxHeight,
    width,
    minWidth,
    maxWidth,
    placeholderStr,
    editable,
    readOnly,
    defaultIndentWithTab,
    onChange,
    onUpdate,
  ]);

  useEffect(() => {
    const currentValue = view ? view.state.doc.toString() : '';
    if (view && value !== currentValue) {
      view.dispatch({
        changes: { from: 0, to: currentValue.length, insert: value || '' },
      });
    }
  }, [value, view]);

  return { state, setState, view, setView, container, setContainer };
}

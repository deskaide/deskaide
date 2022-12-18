import { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { Box } from './Box';
import { useCodeMirror } from '../hooks';

interface Props {
  initialDoc: string;
  placeholder?: string;
  onChange: (doc: string) => void;
  onBlur: React.FocusEventHandler;
}

const Wrapper = styled(Box)`
  height: calc(100vh - 228px);

  .diary-editor {
    width: 100%;
    color: var(--color-text-1);
    background: var(--color-bg-1);
    border-radius: 4px;
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    padding: ${({ theme }) => theme.space[4]}px;
    padding-top: 0;
    overflow-y: auto;

    .cm-focused {
      outline: none;
    }

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
`;

export const DiaryEditor: React.FC<Props> = (props) => {
  const { initialDoc, placeholder = 'Write something...', onChange } = props;
  const handleChange = useCallback(
    (state: string) => onChange(state),
    [onChange]
  );
  const editor = useRef<HTMLDivElement>(null);
  const { setContainer } = useCodeMirror({
    autoFocus: initialDoc === '',
    container: editor.current,
    onChange: handleChange,
    value: initialDoc,
    placeholder: placeholder,
    theme: 'dark',
    basicSetup: {
      lineNumbers: false,
      highlightActiveLine: false,
      highlightActiveLineGutter: false,
    },
  });

  useEffect(() => {
    setContainer(editor.current);
  }, []);

  return (
    <Wrapper>
      <Box
        className="diary-editor"
        paddingTop={placeholder ? '1rem' : 0}
        height="100%"
        ref={editor}
        onBlur={props.onBlur}
      />
    </Wrapper>
  );
};

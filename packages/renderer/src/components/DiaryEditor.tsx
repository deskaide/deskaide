import { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { Box } from './Box';
import { useCodeMirror } from '../hooks';

interface Props {
  initialDoc: string;
  onChange: (doc: string) => void;
  onBlur: (e: unknown) => void;
}

const Wrapper = styled(Box)`
  height: calc(100vh - 228px);

  .diary-editor {
    width: 100%;
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
      background: var(--color-bg-1);
    }

    .cm-scroller {
      font-family: ${({ theme }) => theme.fonts.code};
    }
  }
`;

export const DiaryEditor: React.FC<Props> = (props) => {
  const { initialDoc, onChange } = props;
  const handleChange = useCallback(
    (state: string) => onChange(state),
    [onChange]
  );
  const editor = useRef<HTMLDivElement>(null);
  const { setContainer } = useCodeMirror({
    container: editor.current,
    onChange: handleChange,
    value: initialDoc,
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
        height="100%"
        ref={editor}
        onBlur={props.onBlur}
      />
    </Wrapper>
  );
};

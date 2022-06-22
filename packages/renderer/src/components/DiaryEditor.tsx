import { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';

import Box from './Box';
import { useCodeMirror } from '../hooks';

interface Props {
  initialDoc: string;
  onChange: (doc: string) => void;
  onBlur: (e: any) => void;
}

const Wrapper = styled(Box)`
  height: calc(100vh - 188px);

  .diary-editor {
    width: 100%;
    background: ${({ theme }) => theme.colors.dark[1]};
    border-radius: 4px;
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    padding: ${({ theme }) => theme.space[4]}px;
    padding-top: ${({ theme }) => theme.space[2]}px;

    .cm-focused {
      outline: none;
    }

    .cm-gutters {
      display: none;
    }

    .cm-line {
      white-space: pre-wrap;
    }
  }
`;

const DiaryEditor: React.FC<Props> = (props) => {
  console.log(props);

  const { initialDoc, onChange } = props;
  const handleChange = useCallback((state: any) => onChange(state), [onChange]);
  const editor = useRef<HTMLDivElement>(null);
  const { setContainer } = useCodeMirror({
    container: editor.current,
    onChange: handleChange,
    value: initialDoc,
    basicSetup: {
      lineNumbers: false,
      highlightActiveLine: false,
      highlightActiveLineGutter: false,
    },
  });

  useEffect(() => {
    setContainer(editor.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

export default DiaryEditor;
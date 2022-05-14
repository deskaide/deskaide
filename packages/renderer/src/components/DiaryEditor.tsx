import React, { useEffect, useCallback } from 'react';

import Box from './Box';
import useCodemirror from '../hooks/useCodemirror';
import styled from 'styled-components';

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
  }
`;

const DiaryEditor: React.FC<Props> = (props) => {
  const { initialDoc, onChange } = props;
  const handleChange = useCallback(
    (state) => onChange(state.doc.toString()),
    [onChange]
  );
  const [refContainer, editorView] = useCodemirror<HTMLDivElement>({
    initialDoc,
    onChange: handleChange,
    showGutter: false,
  });

  useEffect(() => {
    if (editorView) {
      editorView.focus();
    }
  }, [editorView]);

  return (
    <Wrapper>
      <Box
        className="diary-editor"
        height="100%"
        ref={refContainer}
        onBlur={props.onBlur}
      />
    </Wrapper>
  );
};

export default DiaryEditor;

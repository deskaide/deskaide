import React from 'react';

import Box from './Box';
// import { useCodeMirror } from '../hooks';
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
  console.log(props);

  // const { initialDoc, onChange } = props;
  // const handleChange = useCallback(
  //   (state: any) => onChange(state.doc.toString()),
  //   [onChange]
  // );
  // const [refContainer, editorView] = useCodeMirror<HTMLDivElement>({
  //   initialDoc,
  //   onChange: handleChange,
  //   showGutter: false,
  // });

  // useEffect(() => {
  //   if (editorView) {
  //     editorView.focus();
  //   }
  // }, [editorView]);

  return (
    <Wrapper>
      <p> Test</p>
    </Wrapper>
  );
};

export default DiaryEditor;

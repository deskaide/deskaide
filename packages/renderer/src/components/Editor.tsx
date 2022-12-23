import { useCallback, useEffect, useRef } from 'react';

import { Box } from './Box';
import { useCodeMirror } from '../hooks';

interface Props {
  initialDoc: string;
  placeholder?: string;
  onChange: (doc: string) => void;
  onBlur: React.FocusEventHandler;
}

export const Editor: React.FC<Props> = (props) => {
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
    <Box
      className="deskaide-md-editor"
      paddingTop={placeholder ? '1rem' : 0}
      height="100%"
      ref={editor}
      onBlur={props.onBlur}
    />
  );
};

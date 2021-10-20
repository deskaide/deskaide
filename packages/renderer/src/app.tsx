import React, { useContext } from 'react';
import { ThemeProvider } from 'styled-components';

import * as themes from './styles/themes';
import { ThemeContext } from './components/ThemeProvider';
import GlobalStyles from './styles/GlobalStyles';
import { Pomodoro } from './pages';

// import Editor from './editor';
// import Preview from './preview';

const App: React.FC = () => {
  // const [doc, setDoc] = useState<string>('# Hello, World!\n');

  // const handleDocChange = useCallback((newDoc) => {
  //   setDoc(newDoc);
  // }, []);

  const context = useContext<{
    colorMode: string | undefined;
    setColorMode: (newValue: string) => void;
  } | null>(ThemeContext);
  const selectedTheme = (context?.colorMode ?? 'light') as keyof typeof themes;

  return (
    <ThemeProvider theme={themes[selectedTheme]}>
      {/* <Editor onChange={handleDocChange} initialDoc={doc} />
      <Preview doc={doc} /> */}
      <GlobalStyles />
      <Pomodoro />
    </ThemeProvider>
  );
};

export default App;

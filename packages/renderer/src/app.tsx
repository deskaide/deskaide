import React, { useContext } from 'react';
import { ThemeProvider } from 'styled-components';
import { HashRouter as Router } from 'react-router-dom';

import * as themes from './styles/themes';
import { ThemeContext } from './components/ThemeProvider';
import GlobalStyles from './styles/GlobalStyles';
import Routes from './routes';

// import Editor from './editor';
// import Preview from './preview';

const App: React.FC = () => {
  // const [doc, setDoc] = useState<string>('# Hello, World!\n');

  // const handleDocChange = useCallback((newDoc) => {
  //   setDoc(newDoc);
  // }, []);

  const context = useContext(ThemeContext);
  const selectedTheme = context?.colorMode as keyof typeof themes;

  return (
    <>
      {selectedTheme ? (
        <ThemeProvider theme={themes[selectedTheme]}>
          {/* <Editor onChange={handleDocChange} initialDoc={doc} />
      <Preview doc={doc} /> */}
          <GlobalStyles />
          <Router>
            <Routes />
          </Router>
        </ThemeProvider>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default App;

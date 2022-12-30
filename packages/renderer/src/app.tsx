import { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { HashRouter as Router } from 'react-router-dom';
import { useSelector } from 'react-redux';

import * as themes from './styles/themes';
import { GlobalStyle } from './styles';
import Routes from './routes';
import type { RootState } from './store';
import { useAppDispatch } from './hooks';
import { getAppSettings } from './store/settingsSlice';
import { Box, InitPomodoroTimer } from './components';

const App: React.FC = () => {
  const { appSettings, isSettingsLoading } = useSelector(
    (state: RootState) => state.settings
  );
  const selectedTheme = appSettings?.theme as keyof typeof themes;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAppSettings());
  }, []);

  return (
    <>
      {!isSettingsLoading && selectedTheme ? (
        <>
          <ThemeProvider theme={themes[selectedTheme]}>
            <GlobalStyle />
            <Router>
              <Routes />
            </Router>
            <InitPomodoroTimer />
          </ThemeProvider>
        </>
      ) : (
        <Box
          width="100vw"
          height="100vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <p>Loading...</p>
        </Box>
      )}
    </>
  );
};

export default App;

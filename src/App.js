import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { dark, light } from './views/styles/themes';
import Routes from './routes';

const App = ({ selectedTheme = 'dark' }) => {
  return (
    <ThemeProvider theme={selectedTheme === 'light' ? light : dark}>
      <Suspense fallback={<div>Loading</div>}>
        <Routes />
      </Suspense>
    </ThemeProvider>
  );
};

const mapStateToProps = ({ setting }) => {
  return {
    selectedTheme: setting.selectedTheme,
  };
};

export default connect(mapStateToProps)(App);

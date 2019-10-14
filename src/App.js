import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { dark, light } from './views/styles/themes';
import Routes from './routes';

const App = props => {
  const { theme = 'light' } = props;

  return (
    <ThemeProvider theme={theme === 'light' ? light : dark}>
      <Suspense fallback={<div>Loading</div>}>
        <Routes />
      </Suspense>
    </ThemeProvider>
  );
};

const mapStateToProps = ({ setting }) => {
  return {
    theme: setting.theme,
  };
};

export default connect(mapStateToProps)(App);

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import createStore from './redux/store';
import './i18n';
import App from './App';
import SettingService from './services/setting';

const setting = new SettingService().getSetting();
let initialState = {
  setting,
};

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }


  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 400;
    src: local('IBM Plex Sans'), local('IBMPlexSans'),
         url('./assets/fonts/ibm-plex-sans-v7-latin-regular.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
         url('./assets/fonts/ibm-plex-sans-v7-latin-regular.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
  }
`;

const store = createStore(initialState);

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyle />
    <App />
  </Provider>,
  document.getElementById('root')
);

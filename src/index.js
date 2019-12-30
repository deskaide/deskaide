import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import createStore from './state/store';
import './i18n';
import App from './App';
import GlobalStyle from './views/styles/GlobalStyle';
import DBService from './services/DBService';
import { db, pomodoroSettingsId, POMODORO_INITIAL_SETTINGS } from './config';
import { pomodoroActions } from './state/pomodoro';

const DB = new DBService(db);
const store = createStore({});

async function init() {
  let pomodoroSettings = await DB.getById(pomodoroSettingsId);
  if (!pomodoroSettings) {
    pomodoroSettings = POMODORO_INITIAL_SETTINGS;
  }
  store.dispatch(pomodoroActions.saveSettings(pomodoroSettings));
}

init();

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyle />
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

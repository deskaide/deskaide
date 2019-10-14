import React from 'react';
import { AppContainer, AppHeader, AppLink, Logo } from '../components';
import logo from '../../assets/images/logo.svg';

const { shell } = window.require('electron');

const HomePage = () => (
  <AppContainer>
    <AppHeader>
      <Logo src={logo}></Logo>
      <p>
        Edit <code>src/views/pages/HomePage.js</code> and save to reload.
      </p>
      <AppLink
        onClick={() =>
          shell.openExternal('https://github.com/sh4hids/reactron')
        }
      >
        View instructions
      </AppLink>
    </AppHeader>
  </AppContainer>
);

export default HomePage;

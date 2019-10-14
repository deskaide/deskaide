import React from 'react';
import { AppContainer, AppHeader, AppLink, Logo, Text } from '../components';
import logo from '../../assets/images/logo.svg';

const { shell } = window.require('electron');

const HomePage = () => (
  <AppContainer>
    <AppHeader>
      <Logo src={logo}></Logo>
      <Text variant="h4">
        Edit <code>src/views/pages/HomePage.js</code> and save to reload.
      </Text>
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

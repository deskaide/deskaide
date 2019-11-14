import React from 'react';
import styled from 'styled-components';
import { SettingsMenuContainer, Text, Divider } from '../../components';

const PomodoroSettings = () => {
  return (
    <SettingsMenuContainer>
      <Text variant="h5" textAlign="center" margin={0} lineHeight="70px">
        Pomodoro Settings
      </Text>
      <Divider />
    </SettingsMenuContainer>
  );
};

export default PomodoroSettings;

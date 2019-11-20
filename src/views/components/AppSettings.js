import React from 'react';
import styled from 'styled-components';
import Box from './Box';
import Divider from './Divider';
import Text from './Text';

const SettingsContainer = styled(Box)`
  height: 100vh;
  overflow-y: auto;
  border-right: 2px solid ${({ theme }) => theme.colors.border};
`;

const AppSettings = ({ appTitle, children }) => (
  <SettingsContainer>
    <Text variant="h5" textAlign="center" margin={0} lineHeight="70px">
      {appTitle}
    </Text>
    <Divider />
    {children}
  </SettingsContainer>
);

export default AppSettings;

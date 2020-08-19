import React from 'react';
import { SettingsPageLayout } from '../../layouts';
import { Box, Divider, Flex, Text } from '../../components';
import SettingsForm from './SettingsForm';

const Settings = () => {
  return (
    <SettingsPageLayout>
      <Text variant="h5" textAlign="center" margin={0} lineHeight="70px">
        Settings
      </Text>
      <Divider />
      <Box pr={4} pl={4} pt={3}>
        <Flex display="flex" justifyContent="center">
          <SettingsForm />
        </Flex>
      </Box>
    </SettingsPageLayout>
  );
};

export default Settings;

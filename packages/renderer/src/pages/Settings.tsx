import React from 'react';
import { Link } from 'react-router-dom';

import { Box, Text } from '../components';

const Settings: React.FC = () => {
  console.log('Hello...');

  return (
    <Box>
      <Text>Settings</Text>
      <Link to="/">Go to Home</Link>
    </Box>
  );
};

export default Settings;

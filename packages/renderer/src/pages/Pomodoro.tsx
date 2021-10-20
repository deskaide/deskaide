import React from 'react';
import { Link } from 'react-router-dom';

import { Box, Text } from '../components';

const Pomodoro: React.FC = () => {
  console.log('Hello...');

  return (
    <Box>
      <Text>Pomodoro</Text>
      <Link to="/">Go to Home</Link>
    </Box>
  );
};

export default Pomodoro;

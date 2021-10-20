import React from 'react';
import { Link } from 'react-router-dom';

import { Box, Text } from '../components';

const Diary: React.FC = () => {
  console.log('Hello...');

  return (
    <Box>
      <Text>Diary</Text>
      <Link to="/">Go to Home</Link>
    </Box>
  );
};

export default Diary;

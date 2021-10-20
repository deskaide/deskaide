import React from 'react';
import { Link } from 'react-router-dom';

import { Box, Text } from '../components';

const Notes: React.FC = () => {
  console.log('Hello...');

  return (
    <Box>
      <Text>Notes</Text>
      <Link to="/">Go to Home</Link>
    </Box>
  );
};

export default Notes;

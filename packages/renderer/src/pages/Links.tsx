import React from 'react';
import { Link } from 'react-router-dom';

import { Box, Text } from '../components';

const Links: React.FC = () => {
  console.log('Hello...');

  return (
    <Box>
      <Text>Links</Text>
      <Link to="/">Go to Home</Link>
    </Box>
  );
};

export default Links;

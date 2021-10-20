import React from 'react';
import { Link } from 'react-router-dom';

import { Box, Text } from '../components';

const Todos: React.FC = () => {
  console.log('Hello...');

  return (
    <Box>
      <Text>Todos</Text>
      <Link to="/">Go to Home</Link>
    </Box>
  );
};

export default Todos;

import React from 'react';
import { Link } from 'react-router-dom';

import { Box, Text } from '../components';

const Home: React.FC = () => {
  return (
    <Box>
      <Text>Home</Text>
      <Link to="/diary">Go to diary</Link> <br />
      <Link to="/links">Go to links</Link> <br />
      <Link to="/notes">Go to notes</Link> <br />
      <Link to="/pomodoro">Go to pomodoro</Link> <br />
      <Link to="/settings">Go to settings</Link> <br />
      <Link to="/todos">Go to todos</Link>
    </Box>
  );
};

export default Home;

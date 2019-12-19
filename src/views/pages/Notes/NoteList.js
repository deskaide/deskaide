import React from 'react';
import { SubmenuContainer, Box, Text } from '../../components';

const NoteList = () => {
  return (
    <SubmenuContainer appTitle="All Notes">
      <Box pr={4} pl={4} pt={3}>
        <Text>Note list</Text>
      </Box>
    </SubmenuContainer>
  );
};

export default NoteList;

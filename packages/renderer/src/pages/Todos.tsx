import * as React from 'react';

import { DefaultLayout } from '../layouts';
import { Box, Logo, Text } from '../components';

export const Todos: React.FC = () => {
  return (
    <DefaultLayout>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        textAlign="center"
        maxWidth="36vw"
        margin="0 auto"
      >
        <Logo height="6rem" width="6rem" />
        <Text variant="h2" mb={0}>
          Todos page
        </Text>
      </Box>
    </DefaultLayout>
  );
};

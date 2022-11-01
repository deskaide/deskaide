import * as React from 'react';
import { info } from '#preload';

import { DefaultLayout } from '../layouts';
import { Box, Divider, Logo, Text } from '../components';

export const Home: React.FC = () => {
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
          Deskaide
        </Text>
        <Text variant="h5" fontWeight="normal" mt={3}>
          An aide to your desk life!
        </Text>
        <Divider my={3} border="1px dashed" borderColor="bg2" />
        <Text variant="h6">v{info.versions.app}</Text>
        <Text fontWeight="normal">
          Deskaide is a desktop application to assist a user make their desk
          life efficient.
        </Text>
      </Box>
    </DefaultLayout>
  );
};

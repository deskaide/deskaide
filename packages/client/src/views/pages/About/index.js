import React from 'react';
import { withTheme } from 'styled-components';
import { Link } from 'react-router-dom';
import { SplashScreenLayout } from '../../layouts';
import { Box, Divider, Image, Text } from '../../components';

import logoLight from '../../../assets/images/logo-light.svg';
import logoDark from '../../../assets/images/logo-dark.svg';

const About = ({ theme }) => (
  <SplashScreenLayout>
    <Box color="text" textAlign="center">
      <Image
        src={theme.name === 'light' ? logoDark : logoLight}
        height="12vmin"
      />
      <Text variant="h2">Deskaide</Text>
      <Text variant="h5" fontWeight="400">
        An aide to your desk life!
      </Text>
      <Divider width="50vw" m="0 auto" />
      <Text variant="h6">v1.0.0</Text>
      <Box width="48vw" m="0 auto">
        <Text>
          Deskaide is a desktop application to assist an user to manage and
          track his/her desktop life easily.
        </Text>
        <Text>
          <Link to="/#/">{'> Back to app <'}</Link>
        </Text>
      </Box>
    </Box>
  </SplashScreenLayout>
);

export default withTheme(About);

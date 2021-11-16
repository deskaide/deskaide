import React from 'react';

import { DefaultLayout, WithSidebarLayout } from '../layouts';
import { Box, Button, Logo, Text, IconJournal, IconLink } from '../components';

const Pomodoro: React.FC = () => {
  return (
    <DefaultLayout>
      <WithSidebarLayout
        sidebar={
          <Box padding={3}>
            <Button variant="primary" icon={<IconJournal />}>
              test
            </Button>
            <br />
            <br />
            <Button
              variant="secondary"
              icon={<IconLink />}
              iconPosition="right"
            >
              test
            </Button>
            <br />
            <br />
            <Button variant="destructive">test</Button>
            <br />
            <br />
            <Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Blanditiis optio tempora libero voluptate nam commodi iste at
              veniam enim consequatur quia maiores dolor quisquam, debitis ipsam
              odio culpa. Nam, voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Blanditiis optio tempora libero voluptate nam commodi iste at
              veniam enim consequatur quia maiores dolor quisquam, debitis ipsam
              odio culpa. Nam, voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Blanditiis optio tempora libero voluptate nam commodi iste at
              veniam enim consequatur quia maiores dolor quisquam, debitis ipsam
              odio culpa. Nam, voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Blanditiis optio tempora libero voluptate nam commodi iste at
              veniam enim consequatur quia maiores dolor quisquam, debitis ipsam
              odio culpa. Nam, voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Blanditiis optio tempora libero voluptate nam commodi iste at
              veniam enim consequatur quia maiores dolor quisquam, debitis ipsam
              odio culpa. Nam, voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Blanditiis optio tempora libero voluptate nam commodi iste at
              veniam enim consequatur quia maiores dolor quisquam, debitis ipsam
              odio culpa. Nam, voluptatem.
            </Text>
          </Box>
        }
        sidebarTitle="Pomodoro Settings"
      >
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
            Pomodoro page
          </Text>
        </Box>
      </WithSidebarLayout>
    </DefaultLayout>
  );
};

export default Pomodoro;

import React from 'react';
import { Formik, Form } from 'formik';
import { Box, Button, Flex, TextInput } from '../../components';

const SaveLink = () => (
  <Box pr={4} pl={4} pt={3}>
    <Formik
      initialValues={{ url: '' }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          console.log(values);
          actions.resetForm({ url: '' });
          actions.setSubmitting(false);
        }, 1000);
      }}
    >
      <Form>
        <TextInput name="url" type="text" placeholder="Enter your link..." />

        <Flex display="inline-flex" justifyContent="flex-end" width="100%">
          <Button type="submit" width="100%">
            Save
          </Button>
        </Flex>
      </Form>
    </Formik>
  </Box>
);

export default SaveLink;

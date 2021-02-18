import React, { useEffect } from 'react';
import { Formik, Form } from 'formik';
import { Box, Button, Flex, TextInput } from '../../components';

const electron = window.require('electron');
const { ipcRenderer } = electron;

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
      enableReinitialize
    >
      {({ values, setFieldValue }) => {
        useEffect(() => {
          let isUnmounted = false;

          ipcRenderer.on('CLIPBOARD_TEXT', (event, data) => {
            if (!values.url && !isUnmounted) {
              setFieldValue('url', data);
            }
          });

          return () => {
            isUnmounted = true;
          };
        }, [values]);

        return (
          <Form>
            <TextInput
              name="url"
              type="text"
              placeholder="Enter your link..."
              value={values.url}
            />

            <Flex display="inline-flex" justifyContent="flex-end" width="100%">
              <Button type="submit" width="100%">
                Save Link
              </Button>
            </Flex>
          </Form>
        );
      }}
    </Formik>
  </Box>
);

export default SaveLink;

import React, { useEffect } from 'react';
import { Formik, Form } from 'formik';
import { Box, Button, Flex, TextInput } from '../../components';

const electron = window.require('electron');
const { ipcRenderer } = electron;

const SaveLinkForm = ({ values, setFieldValue }) => {
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
    }, [values, setFieldValue]);

    return (
      <Form>
        <TextInput
          name="url"
          type="text"
          placeholder="Enter your link..."
          value={values.url}
        />
        {({values, setFieldValue}) => <SaveLinkForm values={values} setFieldValue={setFieldValue} />}
        <Flex display="inline-flex" justifyContent="flex-end" width="100%">
          <Button type="submit" width="100%">
            Save Link
          </Button>
        </Flex>
      </Form>
    );
  }


const SaveLink = () => (
  <Box pr={4} pl={4} pt={3}>
    <Formik
      initialValues={{ url: '' }}
      onSubmit={async (values, actions) => {
        ipcRenderer.sendSync('UPSERT_DATA', {
          data: { ...values, type: 'LINKS_DOC_PREFIX' },
        });

        actions.resetForm({ url: '' });
        actions.setSubmitting(false);
      }}
      enableReinitialize
    >

    </Formik>
  </Box>
);

export default SaveLink;

import React, { useEffect, useCallback } from 'react';
import { Formik, Form } from 'formik';
import { Box, Button, Flex, Input } from '../../components';

const electron = window.require('electron');
const { ipcRenderer } = electron;

const SaveLinkForm = ({ setFieldValue }) => {
  const handleLinkPaste = useCallback(
    (_, data) => {
      setFieldValue('url', data);
    },
    [setFieldValue]
  );

  useEffect(() => {
    ipcRenderer.on('CLIPBOARD_TEXT', handleLinkPaste);
  }, [handleLinkPaste]);

  return (
    <Form>
      <Input
        fieldOptions={{
          name: 'url',
          type: 'text',
          placeholder: 'Enter your link...',
        }}
      />
      <Flex display="inline-flex" justifyContent="flex-end" width="100%">
        <Button type="submit" width="100%">
          Save Link
        </Button>
      </Flex>
    </Form>
  );
};

const SaveLink = () => (
  <Box pr={4} pl={4} pt={3}>
    <Formik
      initialValues={{ url: '' }}
      onSubmit={async (values, actions) => {
        ipcRenderer.send('SAVE_LINK_DATA', {
          data: { ...values, type: 'LINKS_DOC_PREFIX' },
        });

        actions.resetForm({ url: '' });
        actions.setSubmitting(false);
      }}
      enableReinitialize
    >
      {(props) => <SaveLinkForm {...props} />}
    </Formik>
  </Box>
);

export default SaveLink;

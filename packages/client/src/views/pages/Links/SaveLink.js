import React, { useEffect, useCallback } from 'react';
import { Formik, Form } from 'formik';
import { Box, Button, Flex, Input } from '../../components';
import { useIpcRenderer } from '../../../hooks';

const SaveLinkForm = ({ setFieldValue }) => {
  const { listenForEvent } = useIpcRenderer();

  const listen = useCallback(
    (event, callback) => {
      listenForEvent(event, callback);
    },
    [listenForEvent]
  );

  const handleLinkPaste = useCallback(
    (e, data) => {
      setFieldValue('url', data);
    },
    [setFieldValue]
  );

  useEffect(() => {
    listen('CLIPBOARD_TEXT', handleLinkPaste);
  }, [handleLinkPaste, listen]);

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

const SaveLink = () => {
  const { sendEvent } = useIpcRenderer();

  return (
    <Box pr={4} pl={4} pt={3}>
      <Formik
        initialValues={{ url: '' }}
        onSubmit={async (values, actions) => {
          sendEvent('UPSERT_DATA', {
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
};

export default SaveLink;

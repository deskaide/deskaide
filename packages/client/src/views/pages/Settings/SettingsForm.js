import React, { useState } from 'react';
import { withFormik, Form } from 'formik';
import { connect } from 'react-redux';
import {
  Box,
  Button,
  Flex,
  Modal,
  ModalActions,
  RadioInput,
  Text,
  Input,
} from '../../components';
import { settingsActions } from '../../../state/settings';
import { DEFAULT_SETTINGS, appSettingsId } from '../../../config';

const electron = window.require('electron');
const { ipcRenderer } = electron;

const AppSettingsForm = ({ saveSettings, resetForm, values }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const handleReset = async () => {
    ipcRenderer.sendSync('UPSERT_DATA', {
      id: appSettingsId,
      data: { ...DEFAULT_SETTINGS },
    });
    saveSettings({ ...DEFAULT_SETTINGS });
    resetForm({ ...DEFAULT_SETTINGS });
    setIsModalOpen(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    ipcRenderer.sendSync('UPSERT_DATA', {
      id: appSettingsId,
      data: values,
    });
    saveSettings(values);
    setSuccessModal(true);
    setTimeout(() => {
      setSuccessModal(false);
    }, 1500);
  };

  return (
    <>
      <Box width="50vw">
        <Form onSubmit={handleSave}>
          <RadioInput
            name="autoStart"
            label="Do you want to start the app on startup?"
            options={[
              { name: 'Yes', value: 'Y' },
              { name: 'No', value: 'N' },
            ]}
          />
          <RadioInput
            name="selectedTheme"
            label="In which theme do you want to see the app?"
            options={[
              { name: 'Dark', value: 'dark' },
              { name: 'Light', value: 'light' },
            ]}
          />
          <Input
            fieldOptions={{
              name: 'remoteDBUrl',
              type: 'text',
              label: 'Remote DB URL',
              placeholder: 'Enter a remote db url...',
            }}
          />
          <RadioInput
            name="isTrackingOn"
            label="Do you want to track your app usage?"
            options={[
              { name: 'Yes', value: 'Y' },
              { name: 'No', value: 'N' },
            ]}
          />

          <Flex
            display="inline-flex"
            justifyContent="space-between"
            width="100%"
            mt={4}
          >
            <Button
              type="button"
              onClick={() => setIsModalOpen(true)}
              width="46%"
            >
              Reset
            </Button>
            <Button type="submit" width="46%">
              Save
            </Button>
          </Flex>
        </Form>
      </Box>

      <Modal isOpen={isModalOpen} onClose={setIsModalOpen} p={32}>
        <Text mt={0} variant="h5">
          Do you really want to reset settings?
        </Text>
        <ModalActions mt={4}>
          <Button onClick={() => setIsModalOpen(false)} mr={3}>
            No
          </Button>
          <Button onClick={handleReset}>Yes</Button>
        </ModalActions>
      </Modal>
      <Modal isOpen={successModal} onClose={setSuccessModal} p={32}>
        <Text variant="h5">Settings saved successfully!</Text>
      </Modal>
    </>
  );
};

const SettingsForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (values) => ({
    autoStart: values.autoStart,
    selectedTheme: values.selectedTheme,
    remoteDBUrl: values.remoteDBUrl,
    isTrackingOn: values.isTrackingOn,
  }),
})(AppSettingsForm);

const mapStateToProps = ({ settings }) => ({
  autoStart: settings.autoStart,
  selectedTheme: settings.selectedTheme,
  remoteDBUrl: settings.remoteDBUrl,
  isTrackingOn: settings.isTrackingOn,
});

const mapActionsToProps = {
  saveSettings: settingsActions.save,
};

export default connect(mapStateToProps, mapActionsToProps)(SettingsForm);

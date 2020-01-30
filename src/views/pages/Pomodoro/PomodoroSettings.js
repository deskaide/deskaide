import React, { useState } from 'react';
import { withFormik, Form } from 'formik';
import { connect } from 'react-redux';
import {
  SubmenuContainer,
  Box,
  Button,
  Flex,
  Modal,
  ModalActions,
  RangeInput,
  Text,
} from '../../components';
import { pomodoroActions } from '../../../state/pomodoro';
import { POMODORO_INITIAL_SETTINGS, pomodoroSettingsId } from '../../../config';

const electron = window.require('electron');
const { ipcRenderer } = electron;

const PomodoroSettingsForm = ({ saveSettings, resetForm, values }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const handleReset = async () => {
    ipcRenderer.sendSync('UPSERT_DATA', {
      id: pomodoroSettingsId,
      data: { ...POMODORO_INITIAL_SETTINGS },
    });
    saveSettings({ ...POMODORO_INITIAL_SETTINGS });
    resetForm({ ...POMODORO_INITIAL_SETTINGS });
    setIsModalOpen(false);
  };

  const handleSave = async e => {
    e.preventDefault();
    ipcRenderer.sendSync('UPSERT_DATA', {
      id: pomodoroSettingsId,
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
      <SubmenuContainer appTitle="Pomodoro Settings">
        <Box pr={4} pl={4} pt={3}>
          <Form onSubmit={handleSave}>
            <RangeInput
              name="focusTime"
              label="Focus Time"
              unit="min"
              min={1}
              max={60}
            />
            <RangeInput
              name="shortBreakTime"
              label="Short Break Time"
              unit="min"
              min={5}
              max={10}
            />
            <RangeInput
              name="longBreakTime"
              label="Long Break Time"
              unit="min"
              min={15}
              max={30}
            />
            <RangeInput
              name="remindBefore"
              label="Remind before"
              unit="sec"
              min={20}
              max={60}
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
      </SubmenuContainer>
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

const PomodoroSettings = withFormik({
  enableReinitialize: true,
  mapPropsToValues: values => {
    return {
      focusTime: values.focusTime,
      shortBreakTime: values.shortBreakTime,
      longBreakTime: values.longBreakTime,
      remindBefore: values.remindBefore,
    };
  },
})(PomodoroSettingsForm);

const mapStateToProps = ({ pomodoro }) => ({
  focusTime: pomodoro.settings.focusTime,
  shortBreakTime: pomodoro.settings.shortBreakTime,
  longBreakTime: pomodoro.settings.longBreakTime,
  remindBefore: pomodoro.settings.remindBefore,
});

const mapActionsToProps = {
  saveSettings: pomodoroActions.saveSettings,
};

export default connect(mapStateToProps, mapActionsToProps)(PomodoroSettings);

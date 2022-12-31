import * as React from 'react';
import { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import type { RootState } from '../store';
import { savePomodoroSettings } from '../store/settingsSlice';
import { defaultPomodoroSettings } from '../config';
import { useAppDispatch, useAppSelector } from '../hooks';
import { Button } from './Button';
import { Box } from './Box';
import { RangeInput } from './RangeInput';
import { Modal } from './Modal';
import { ModalActions } from './ModalActions';
import { Text } from './Text';

const PomodoroDefaults = {
  focusTime: {
    min: 20,
    max: 40,
  },
  shortBreakTime: {
    min: 2,
    max: 5,
  },
  remindBefore: {
    min: 30,
    max: 60,
  },
};

export const PomodoroSettings: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const pomodoroSettings = useAppSelector(
    (state: RootState) => state.settings.pomodoroSettings
  );
  const dispatch = useAppDispatch();

  const handleReset = () => {
    dispatch(
      savePomodoroSettings({
        ...pomodoroSettings,
        ...defaultPomodoroSettings,
      })
    );
    setIsModalOpen(false);
  };

  return (
    <>
      <Formik
        initialValues={{ ...pomodoroSettings }}
        enableReinitialize={true}
        validationSchema={Yup.object({
          focusTime: Yup.number()
            .min(
              PomodoroDefaults.focusTime.min,
              `Must be greater or equal ${PomodoroDefaults.focusTime.min} minutes`
            )
            .max(
              PomodoroDefaults.focusTime.max,
              `Must be less or equal ${PomodoroDefaults.focusTime.max} minutes`
            )
            .required('Focus time is required'),
          shortBreakTime: Yup.number()
            .min(
              PomodoroDefaults.shortBreakTime.min,
              `Must be greater or equal ${PomodoroDefaults.shortBreakTime.min} minutes`
            )
            .max(
              PomodoroDefaults.shortBreakTime.max,
              `Must be less or equal ${PomodoroDefaults.shortBreakTime.max} minutes`
            )
            .required('Focus time is required'),
          remindBefore: Yup.number()
            .min(
              PomodoroDefaults.remindBefore.min,
              `Must be greater or equal ${PomodoroDefaults.remindBefore.min} seconds`
            )
            .max(
              PomodoroDefaults.remindBefore.max,
              `Must be less or equal ${PomodoroDefaults.remindBefore.max} seconds`
            )
            .required('Focus time is required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(savePomodoroSettings(values));
          setSubmitting(false);
          setSuccessModal(true);
          setTimeout(() => {
            setSuccessModal(false);
          }, 1500);
        }}
      >
        <Form>
          <RangeInput
            min={PomodoroDefaults.focusTime.min}
            max={PomodoroDefaults.focusTime.max}
            unit="min"
            name="focusTime"
            label="Focus Time"
          />
          <RangeInput
            min={PomodoroDefaults.shortBreakTime.min}
            max={PomodoroDefaults.shortBreakTime.max}
            unit="min"
            name="shortBreakTime"
            label="Short Break Time"
          />
          <RangeInput
            min={PomodoroDefaults.remindBefore.min}
            max={PomodoroDefaults.remindBefore.max}
            unit="sec"
            name="remindBefore"
            label="Remind Before"
          />

          <Box display="flex" flexWrap="wrap" mx={-3} mt={4}>
            <Box p={3} width={1 / 2}>
              <Button
                type="button"
                width="100%"
                onClick={() => setIsModalOpen(true)}
              >
                Reset
              </Button>
            </Box>
            <Box p={3} width={1 / 2} textAlign="right">
              <Button type="submit" variant="primary" width="100%">
                Save
              </Button>
            </Box>
          </Box>
        </Form>
      </Formik>
      <Modal isOpen={isModalOpen} onClose={setIsModalOpen} p={32}>
        <Text mt={0} variant="h5">
          Do you really want to reset settings?
        </Text>
        <ModalActions mt={4}>
          <Button
            onClick={() => setIsModalOpen(false)}
            mr={3}
            variant="secondary"
          >
            No
          </Button>
          <Button onClick={handleReset} variant="warning">
            Yes
          </Button>
        </ModalActions>
      </Modal>
      <Modal isOpen={successModal} onClose={setSuccessModal} p={32}>
        <Text variant="h5">Settings saved successfully!</Text>
      </Modal>
    </>
  );
};

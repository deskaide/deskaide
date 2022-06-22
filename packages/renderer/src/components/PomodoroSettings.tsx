import * as React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

import type { RootState } from '../store';
import { setPomodoroSettings } from '../store/settingsSlice';
import { defaultPomodoroSettings } from '../constants';
import Button from './Button';
import Box from './Box';
import RangeInput from './RangeInput';

const PomodoroSettings: React.FC = () => {
  const pomodoroSettings = useSelector(
    (state: RootState) => state.settings.pomodoroSettings
  );
  const dispatch = useDispatch();

  const handleReset = () => {
    dispatch(setPomodoroSettings(defaultPomodoroSettings));
  };

  return (
    <Formik
      initialValues={{ ...pomodoroSettings }}
      enableReinitialize={true}
      validationSchema={Yup.object({
        focusTime: Yup.number()
          .min(20, 'Must be greater or equal 20 minutes')
          .max(40, 'Must be less or equal 45 minutes')
          .required('Focus time is required'),
        shortBreakTime: Yup.number()
          .min(3, 'Must be greater or equal 2 minutes')
          .max(10, 'Must be less or equal 10 minutes')
          .required('Focus time is required'),
        remindBefore: Yup.number()
          .min(15, 'Must be greater or equal 15 seconds')
          .max(60, 'Must be less or equal 60 seconds')
          .required('Focus time is required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        dispatch(setPomodoroSettings(values));
        setSubmitting(false);
      }}
    >
      <Form>
        <RangeInput
          min={20}
          max={40}
          unit="min"
          name="focusTime"
          label="Focus Time"
        />
        <RangeInput
          min={3}
          max={10}
          unit="min"
          name="shortBreakTime"
          label="Short Break Time"
        />
        <RangeInput
          min={15}
          max={60}
          unit="sec"
          name="remindBefore"
          label="Remind Before"
        />

        <Box display="flex" flexWrap="wrap" mx={-3} mt={4}>
          <Box p={3} width={1 / 2}>
            <Button type="button" width="100%" onClick={handleReset}>
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
  );
};

export default PomodoroSettings;

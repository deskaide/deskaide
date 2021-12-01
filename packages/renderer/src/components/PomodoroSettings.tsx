import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import Button from './Button';
import Box from './Box';
import RangeInput from './RangeInput';

const PomodoroSettings: React.FC = () => (
  <Formik
    initialValues={{ focusTime: 20, shortBreakTime: 2, remindBefore: 15 }}
    validationSchema={Yup.object({
      focusTime: Yup.number()
        .min(20, 'Must be greater or equal 20 minutes')
        .max(45, 'Must be less or equal 45 minutes')
        .required('Focus time is required'),
      shortBreakTime: Yup.number()
        .min(2, 'Must be greater or equal 2 minutes')
        .max(10, 'Must be less or equal 10 minutes')
        .required('Focus time is required'),
      remindBefore: Yup.number()
        .min(15, 'Must be greater or equal 15 seconds')
        .max(60, 'Must be less or equal 60 seconds')
        .required('Focus time is required'),
    })}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 400);
    }}
  >
    <Form>
      <RangeInput
        min={20}
        max={45}
        unit="min"
        name="focusTime"
        label="Focus Time"
      />
      <RangeInput
        min={2}
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
          <Button type="submit" width="100%">
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

export default PomodoroSettings;

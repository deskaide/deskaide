import React from 'react';
// import styled from 'styled-components';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { AppSettings, Box, Text, RangeInput } from '../../components';

const PomodoroSettings = () => {
  return (
    <AppSettings appTitle="Pomodoro Settings">
      <Box pr={4} pl={4}>
        <Formik
          initialValues={{
            focusTime: 35,
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          <Form>
            <RangeInput name="focusTime" label="Focus Time" min={25} max={60} />
          </Form>
        </Formik>
      </Box>
    </AppSettings>
  );
};

export default PomodoroSettings;

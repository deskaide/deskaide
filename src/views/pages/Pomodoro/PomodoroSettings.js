import React from 'react';
// import styled from 'styled-components';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  AppSettings,
  Box,
  Button,
  Flex,
  Text,
  RangeInput,
} from '../../components';

const PomodoroSettings = () => {
  return (
    <AppSettings appTitle="Pomodoro Settings">
      <Box pr={4} pl={4} pt={3}>
        <Formik
          initialValues={{
            focusTime: 25,
            shortBreakTime: 5,
            longBreakTime: 20,
            remindBefore: 30,
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
          onReset={values => {
            console.log(values);
          }}
        >
          <Form>
            <RangeInput
              name="focusTime"
              label="Focus Time"
              unit="min"
              min={25}
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
              <Button type="submit" width="46%">
                Submit
              </Button>
              <Button type="reset" width="46%">
                Reset
              </Button>
            </Flex>
          </Form>
        </Formik>
      </Box>
    </AppSettings>
  );
};

export default PomodoroSettings;

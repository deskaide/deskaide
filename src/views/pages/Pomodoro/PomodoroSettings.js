import React from 'react';
import { Formik, Form } from 'formik';
import {
  SubmenuContainer,
  Box,
  Button,
  Flex,
  RangeInput,
} from '../../components';

const PomodoroSettings = () => {
  return (
    <SubmenuContainer appTitle="Pomodoro Settings">
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
              console.log(values);
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
              <Button type="reset" width="46%">
                Reset
              </Button>
              <Button type="submit" width="46%">
                Save
              </Button>
            </Flex>
          </Form>
        </Formik>
      </Box>
    </SubmenuContainer>
  );
};

export default PomodoroSettings;

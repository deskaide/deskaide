import React from 'react';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import {
  SubmenuContainer,
  Box,
  Button,
  Flex,
  RangeInput,
} from '../../components';
import { pomodoroActions } from '../../../state/pomodoro';
import { POMODORO_INITIAL_SETTINGS } from '../../../config';

const PomodoroSettings = ({
  focusTime,
  shortBreakTime,
  longBreakTime,
  remindBefore,
  saveSettings,
  resetSettings,
}) => {
  return (
    <SubmenuContainer appTitle="Pomodoro Settings">
      <Box pr={4} pl={4} pt={3}>
        <Formik
          initialValues={{
            focusTime,
            shortBreakTime,
            longBreakTime,
            remindBefore,
          }}
          onSubmit={(values, { setSubmitting }) => {
            saveSettings(values);
          }}
          onReset={() => {
            resetSettings({ ...POMODORO_INITIAL_SETTINGS });
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

const mapStateToProps = ({ pomodoro }) => ({
  focusTime: pomodoro.settings.focusTime,
  shortBreakTime: pomodoro.settings.shortBreakTime,
  longBreakTime: pomodoro.settings.longBreakTime,
  remindBefore: pomodoro.settings.remindBefore,
});

const mapActionsToProps = {
  saveSettings: pomodoroActions.saveSettings,
  resetSettings: pomodoroActions.resetSettings,
};

export default connect(mapStateToProps, mapActionsToProps)(PomodoroSettings);

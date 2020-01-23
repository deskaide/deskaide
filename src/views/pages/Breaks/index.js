import React from 'react';
import { connect } from 'react-redux';
import { SplashScreenLayout } from '../../layouts';
import { Box } from '../../components';
import Timer from './Timer';

const Breaks = ({ timerTime }) => (
  <SplashScreenLayout>
    <Box p={4} textAlign="center">
      <Timer duration={60 * 1000} />
    </Box>
  </SplashScreenLayout>
);

const mapStateToProps = ({ pomodoro }) => ({
  timerTime: pomodoro.timerTime,
});

export default connect(mapStateToProps)(Breaks);

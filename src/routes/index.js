import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Notes, Pomodoro, SplashScreen } from '../views/pages';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={SplashScreen} />
    <Route exact path="/pomodoro" component={Pomodoro} />
    <Route exact path="/notes" component={Notes} />
  </Switch>
);

export default Routes;

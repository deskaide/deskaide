import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  Breaks,
  Journals,
  Notes,
  Pomodoro,
  SplashScreen,
} from '../views/pages';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={SplashScreen} />
    <Route exact path="/pomodoro" component={Pomodoro} />
    <Route exact path="/notes" component={Notes} />
    <Route exact path="/journals" component={Journals} />
    <Route exact path="/breaks" component={Breaks} />
  </Switch>
);

export default Routes;

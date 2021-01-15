import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  About,
  Breaks,
  Journals,
  Notes,
  Pomodoro,
  SplashScreen,
  Settings,
} from '../views/pages';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={SplashScreen} />
    <Route exact path="/about" component={About} />
    <Route exact path="/pomodoro" component={Pomodoro} />
    <Route exact path="/breaks" component={Breaks} />
    <Route exact path="/notes" component={Notes} />
    <Route exact path="/journals" component={Journals} />
    <Route exact path="/settings" component={Settings} />
  </Switch>
);

export default Routes;

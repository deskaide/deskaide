import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  About,
  Breaks,
  Journals,
  Links,
  Notes,
  Pomodoro,
  SplashScreen,
  Stats,
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
    <Route exact path="/links" component={Links} />
    <Route exact path="/stats" component={Stats} />
    <Route exact path="/settings" component={Settings} />
    <Route component={SplashScreen} />
  </Switch>
);

export default Routes;

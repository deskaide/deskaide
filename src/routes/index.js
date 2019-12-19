import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { Notes, Pomodoro, SplashScreen } from '../views/pages';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={SplashScreen} />
      <Route exact path="/pomodoro" component={Pomodoro} />
      <Route exact path="/notes" component={Notes} />
    </Switch>
  </Router>
);

export default Routes;

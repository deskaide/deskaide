import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { SplashScreen } from '../views/pages';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={SplashScreen} />
    </Switch>
  </Router>
);

export default Routes;

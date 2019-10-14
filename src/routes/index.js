import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { HomePage } from '../views/pages';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={HomePage} />
    </Switch>
  </Router>
);

export default Routes;

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Diary, Home, Links, Notes, Pomodoro, Settings, Todos } from './pages';

const Routes = (): JSX.Element => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/diary" component={Diary} />
    <Route exact path="/links" component={Links} />
    <Route exact path="/notes" component={Notes} />
    <Route exact path="/pomodoro" component={Pomodoro} />
    <Route exact path="/settings" component={Settings} />
    <Route exact path="/todos" component={Todos} />
  </Switch>
);

export default Routes;

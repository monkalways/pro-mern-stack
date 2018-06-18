import React from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import IssueList from './IssueList';
import IssueEdit from './IssueEdit';

const NoMatch = () => <p>Page not found</p>;

const App = () => (
  <BrowserRouter>
    <div className="container">
      <h1>Issue Tracker</h1>
      <hr />
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/issues" />} />
        <Route exact path="/issues" component={IssueList} />
        <Route path="/issues/:id" component={IssueEdit} />
        <Route path="*" component={NoMatch} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default hot(module)(App);

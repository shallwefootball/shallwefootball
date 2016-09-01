import { Redirect, Router, Route, IndexRoute } from 'react-router';
import React from 'react';

import App from './containers/App';

import Match from './components/Match';
import Lineup from './components/Lineup';
import Record from './components/Record';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Match} />
    <Route path="/lineup" component={Lineup} />
    <Route path="/record" component={Record} />
  </Route>
)
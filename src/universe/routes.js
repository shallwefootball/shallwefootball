import { Redirect, Router, Route, IndexRoute } from 'react-router';
import React from 'react';

import App from './containers/App';
import Match from './components/Match';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Match} />
  </Route>
)
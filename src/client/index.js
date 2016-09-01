import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router';

import routes from '../universe/routes'

const rootEl = document.getElementById('app');

ReactDOM.render(
  <div>
    <Router children={routes} history={browserHistory} />
  </div>,
  rootEl
);
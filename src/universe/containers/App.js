import React, { Component } from 'react';
import { Link } from 'react-router';

export default class App extends Component {
  render () {

    return (
      <div>

        <div>i'm App.js</div>
        <Link to="/lineup">
          <button>lineup</button>
        </Link>
        <Link to="/record">
          <button>record</button>
        </Link>

        {this.props.children}
      </div>
    )
  }
}
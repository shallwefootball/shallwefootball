import express from 'express';
import cors from 'cors';
import config from 'config';


import React from 'react';

import { renderToString } from 'react-dom/server'
import { RouterContext, match } from 'react-router';

const app = express();
app.use(cors());

process.env.PORT = process.env.PORT || config.get('Player.port');


app.get('/*', function(req, res) {
  ReactRouter.match({ route: null, location: req.url}, function(err, redirectLocation, renderProps) {
    console.log('arg  : ', arguments);

    res.status(200).end(ReactDOMServer.renderToString(
      React.createElement('div', 'hihi')
    ));
  });
});

const server = app.listen(process.env.PORT, 'localhost', function(err) {
  if (err) return console.error(err);
  console.log('⚽ 🏃🏻 shallwefootball server listening on port: %s', process.env.PORT);
});
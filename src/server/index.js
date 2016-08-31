import path from 'path';
import express from 'express';
import cors from 'cors';
import config from 'config';

import React from 'react';

import { renderToString } from 'react-dom/server'
import { RouterContext, match } from 'react-router';
import routes from '../universe/routes';

const app = express();
app.use(cors());

process.env.PORT = process.env.PORT || config.get('Player.port');

app.get('/*', function(req, res) {

  match({ routes, location: req.url}, function(err, redirectLocation, renderProps) {
    if(!renderProps) return res.status(404).end('Not found');


    const renApp = renderToString(<RouterContext {...renderProps} />);
    res.status(200).end(renderFullPage(renApp));
  });
});

const server = app.listen(process.env.PORT, 'localhost', function(err) {
  if (err) return console.error(err);
  console.log('⚽ 🏃🏻 shallwefootball server listening on port: %s', process.env.PORT);
});

function renderFullPage(html, initialState) {
  return `
    <!doctype html>
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css" />
        <link rel="icon" href="./favicon.ico" type="image/x-icon" />
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <title>React Redux Socket.io Chat</title>
      </head>
      <body>
        <container id="react">${html}</container>
        <script src="/dist/bundle.js"></script>
      </body>
    </html>
  `
}
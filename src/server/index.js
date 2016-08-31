import path from 'path';
import express from 'express';
import cors from 'cors';
import config from 'config';

import React from 'react';

import { renderToString } from 'react-dom/server'
import { RouterContext, match } from 'react-router';
import routes from '../common/routes';

const app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, '../client'));
app.set('view engine', 'ejs');

process.env.PORT = process.env.PORT || config.get('Player.port');

app.get('/*', function(req, res) {
  match({ routes, location: req.url}, function(err, redirectLocation, renderProps) {
    console.log('arg  : ', renderProps);

    // res.status(200).end(renderToString(
    //   <RouterContext {...renderProps} />
    // ));

    res.render('index');

    // res.end(renderFullPage())
  });
});

const server = app.listen(process.env.PORT, 'localhost', function(err) {
  if (err) return console.error(err);
  console.log('⚽ 🏃🏻 shallwefootball server listening on port: %s', process.env.PORT);
});

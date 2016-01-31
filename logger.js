// var logger = require('winston')
// ReferenceError: __dirname is not defined
// logger = Meteor.require('winston');
// TypeError: Object [object Object] has no method 'require'
// console.log('logger  ; ', logger);
// module.exports = logger;

var winston = Npm.require('winston');
Npm.require('winston-mongodb').MongoDB;
Npm.require('winston-mysql-transport').Mysql;

var mysql = require('./config').mysql;

mysql.table = 'log';

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      colorize: true,
      handleExceptions: true,
      humanReadableUnhandledException: true,
      json: true
    }),
    new (winston.transports.Mysql)(mysql),
    new (winston.transports.MongoDB)({
      db: 'mongodb://localhost:3001/meteor',
      handleExceptions: true,
      humanReadableUnhandledException: true
    })
  ]
});

module.exports = logger;



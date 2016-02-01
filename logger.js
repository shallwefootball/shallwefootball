// var logger = require('winston')
// ReferenceError: __dirname is not defined
// logger = Meteor.require('winston');
// TypeError: Object [object Object] has no method 'require'
// console.log('logger  ; ', logger);
// module.exports = logger;

// var winston = require('winston');
// require('winston-mongodb').MongoDB;
// require('winston-mysql-transport').Mysql;

// var mysql = require('./config').mysql;

// mysql.table = 'log';

// var logger = new (winston.Logger)({
//   transports: [
//     new (winston.transports.Console)({
//       colorize: true,
//       handleExceptions: true,
//       json: true
//     }),
//     new (winston.transports.Mysql)(mysql),
//     new (winston.transports.MongoDB)({
//       level: 'error',
//       db: 'mongodb://localhost:3001/meteor',
//       handleExceptions: true,
//       json: true
//     })
//   ]
// });

// module.exports = logger;



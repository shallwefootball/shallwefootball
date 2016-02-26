Meteor.startup(function () {
  var smtp = require('../config.js').smtp;

  // console.log("smtp  : ", smtp);

  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
});
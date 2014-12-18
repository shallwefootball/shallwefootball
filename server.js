var express  = require('express');
var passport = require('passport');
var config   = require('./app/config/config');
var app      = express();

app.config = config;


require('./app/config/passport')(passport);
require('./app/config/express')(app, express, passport);


app.set('port', app.config.server.port);
app.listen(app.get('port'), function() {
	console.log(
			"✔ Express server listening on port %d in %s mode",
			app.get('port'),
			app.config.app.name
		);
});
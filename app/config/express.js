var logger          = require('morgan');
var path            = require('path');
var methodOverride  = require('method-override');
var favicon         = require('static-favicon');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var session         = require('express-session');
var multiparty      = require('connect-multiparty');
var flash           = require('connect-flash');
var routes          = require('../routes/index');


module.exports = function(app, express, passport) {

    // view engine setup
    app.set('views', path.join(__dirname, '..', 'views'));
    app.set('view engine', 'ejs');

    app.use(favicon());
    app.use(logger('dev'));
    app.use(multiparty());
    app.use(methodOverride());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());
    app.use(cookieParser('notagoodsecretnoreallydontusethisone'));
    app.use(session());
    app.use(passport.initialize());
    app.use(passport.session({
        maxAge: new Date(Date.now() + 3600000)
    }));
    app.use(flash());
    app.use(express.static(path.join(__dirname, '../..', 'public')));
    app.use('/images', express.static(path.join(__dirname, '../..', 'public/images')));

    // routes 폴더의 index.js 로 이동
    app.use(routes);


};
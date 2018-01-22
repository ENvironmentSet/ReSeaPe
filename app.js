var express = require('express');
var session = require('express-session');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require('./db');

var index = require('./routes/index');
var login = require('./routes/login');
var register = require('./routes/register');
var search = require('./routes/search');
var load = require('./routes/load');
var write = require('./routes/write');
var edit = require('./routes/edit');
var _delete = require('./routes/delete');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    'secret': '0xD_HAPPCKATHON',
    'resave': false,
    'saveUninitialized': true
}));

app.use('/', index);
app.use('/',login);
app.use('/',register);
app.use('/',search);
app.use('/',load);
app.use('/',write);
app.use('/',edit);
app.use('/',_delete);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var contactRouter = require('./routes/contact');

var app = express();

/**
 * Pug motor configuration
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // Middleware pour analyser les données du formulaire
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * Main Routes
 */
app.use('/', indexRouter);
app.use('/contact', contactRouter);


/**
 * 404 Error Handling
 */
app.use(function(req, res, next) {
  next(createError(404));
});

/**
 * Handling Global Errors
 */
app.use(function(err, req, res, next) {

  /**
   * Display error in development mode
   */

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};


  /**
   * Display error page
   */

  res.status(err.status || 500);
  res.render('error');

});

module.exports = app;

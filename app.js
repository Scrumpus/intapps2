var express =       require('express'),
    path =          require('path'),
    logger =        require('morgan'),
    cookieParser =  require('cookie-parser'),
    bodyParser =    require('body-parser'),
    session =       require('express-session'),
    passport =      require('passport');

//initialize mongoose schemas
require('./models/models');

//connect to Mongo
var mongoose = require('mongoose');
var uri = process.env.MONGOLAB_URI || 'mongodb://localhost/test-intapps2';
mongoose.connect(uri, function(err, res) {
  if (err) {
    console.log('ERROR connecting to ' + uri + '. ' + err);
  }
  else {
    console.log('Connected to ' + uri);
  }
});

//routes
var index = require('./routes/index');
var entry = require('./routes/entry');
var admin = require('./routes/admin');
var auth = require('./routes/auth')(passport);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(session({
  secret: 'keyboard cat'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());


app.use('/', index);
app.use('/entry', entry);
app.use('/admin', admin);
app.use('/auth', auth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//create admin
var getAdmin = require('./admin-init');
getAdmin();


//Initialize Passport
var initPassport = require('./passport-init');
initPassport(passport);


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

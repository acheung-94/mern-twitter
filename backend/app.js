require('./models/User')
require('./config/passport')
require('./models/Tweet')

const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const debug = require('debug');
const cors = require('cors');
const { isProduction } = require('./config/keys');
const passport = require('passport')
const csurf = require('csurf')

const csrfRouter = require('./routes/api/csrf')
const usersRouter = require('./routes/api/users');
const tweetsRouter = require('./routes/api/tweets');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && 'Lax',
            httpOnly: true
        }
    })
)
if (!isProduction) {
    app.use(cors())
}
app.use(passport.initialize());

app.use('/api/users', usersRouter);
app.use('/api/tweets', tweetsRouter)
app.use('/api/csrf', csrfRouter)
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.statusCode = 404;
    next(err);
  });
const serverErrorLogger = debug('backend:error')
app.use((err, req, res, next) => {
    serverErrorLogger(err);
    const statusCode = err.statusCode || 500;
    res.status(statusCode);
    res.json({
      message: err.message,
      statusCode,
      errors: err.errors
    })
  });

module.exports = app;

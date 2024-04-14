const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const cors = require('cors');
const { isProduction } = require('./config/keys');

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
            secure: isProdudction,
            sameSite: isProduction && 'Lax',
            httpOnly: true
        }
    })
)
if (!isProduction) {
    app.use(cors())
}

app.use('/api/users', usersRouter);
app.use('/api/tweets', tweetsRouter)
app.use('/api/csrf', csrfRouter)

module.exports = app;

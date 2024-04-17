const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const bodyParser = require('body-parser');
const {
    sessionSecret,
    mongoPassword,
    initPassport,
    clientID,
    clientSecret,
    port,
    clientAppEndpoint,
} = require('./config/index');
const { authRouter } = require('./routes/auth');
const { userRouter } = require('./routes/user');
const { postRouter } = require('./routes/post');
const { eventRouter } = require('./routes/event');

const app = express();

// * Middleware
app.use(
    cors({
        origin: clientAppEndpoint,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
    session({
        secret: sessionSecret,
        saveUninitialized: false,
        resave: false,
        cookie: {
            sameSite: 'none',
            httpOnly: false,
        },
    })
);
app.use(passport.initialize());
app.use(passport.session());
initPassport(passport, clientID, clientSecret);

// * Routing
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/event', eventRouter);

const start = () => {
    try {
        mongoose.connect(
            `mongodb+srv://midjiro:${mongoPassword}@local-newsletter.hjdkibl.mongodb.net/?retryWrites=true&w=majority&appName=local-newsletter`
        );
        app.listen(port);
        console.log('Listening on port ', port);
    } catch (e) {
        console.log(e.message);
    }
};

start();

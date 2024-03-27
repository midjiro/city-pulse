const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const bodyParser = require('body-parser');
const { sessionSecret, port, mongoPassword } = require('../config');
const { authRouter } = require('./routes/auth');
const { userRouter } = require('./routes/user');
const { initPassport } = require('./controllers/auth');

const app = express();

// * Middleware
app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    session({ secret: sessionSecret, saveUninitialized: false, resave: false })
);
app.use(passport.initialize());
app.use(passport.session());
initPassport(passport);

// * Routing
app.use('/auth', authRouter);
app.use('/user', userRouter);

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

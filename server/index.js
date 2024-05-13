const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoStore = require('connect-mongo');
const { Server } = require('socket.io');
const {
    sessionSecret,
    mongoPassword,
    initPassport,
    clientID,
    clientSecret,
    serverPort,
    socketPort,
    clientAppEndpoint,
} = require('./config/index');
const { authRouter } = require('./routes/auth');
const { userRouter } = require('./routes/user');
const { publicationRouter } = require('./routes/publication');
const { nodemailerUser, nodemailerPass } = require('./config');
const { recvNotification } = require('./services/notifications');

const sessionMiddleware = session({
    secret: sessionSecret,
    saveUninitialized: false,
    resave: false,
    cookie: {
        sameSite: 'none',
        secure: true,
    },
    store: MongoStore.create({
        mongoUrl: `mongodb+srv://midjiro:${mongoPassword}@local-newsletter.hjdkibl.mongodb.net/?retryWrites=true&w=majority&appName=local-newsletter`,
    }),
});
const corsOptions = {
    origin: clientAppEndpoint,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};

const app = express();
const io = new Server(socketPort, {
    cors: corsOptions,
});

// * Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
initPassport(passport, clientID, clientSecret, nodemailerUser, nodemailerPass);
io.use((socket, next) => {
    const req = socket.handshake;
    const res = {};
    sessionMiddleware(req, res, () => {
        passport.initialize()(req, res, () => {
            passport.session()(req, res, () => {
                if (req.isAuthenticated()) {
                    socket.user = req.user;
                    return next();
                }
                return next(new Error('User not authenticated'));
            });
        });
    });
});

// * Routing
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/publication', publicationRouter);

io.on('connection', (sock) => {
    sock.on('send-notification', (notification) =>
        recvNotification(io, notification)
    );
});

const start = () => {
    try {
        mongoose.connect(
            `mongodb+srv://midjiro:${mongoPassword}@local-newsletter.hjdkibl.mongodb.net/?retryWrites=true&w=majority&appName=local-newsletter`
        );
        app.listen(serverPort);
        console.log('Listening on port ', serverPort);
    } catch (e) {
        console.log(e.message);
    }
};

start();

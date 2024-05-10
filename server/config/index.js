const dotenv = require('dotenv');
const { initPassport } = require('./passport');
dotenv.config();

module.exports = {
    initPassport,
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    sessionSecret: process.env.SESSION_SECRET,
    gcsProjectId: process.env.GCS_PROJECT_ID,
    gcsKeyPath: process.env.GCS_KEY_PATH,
    gcsBucketName: process.env.GCS_BUCKET_NAME,
    mapAPIKey: process.env.MAP_API_KEY,
    nodemailerUser: process.env.NODEMAILER_USER,
    nodemailerPass: process.env.NODEMAILER_PASS,
    serverPort: process.env.SERVER_PORT,
    socketPort: process.env.SOCKET_PORT,
    mongoPassword: process.env.MONGO_PASSWORD,
    clientAppEndpoint: process.env.CLIENT_APP_ENDPOINT,
};

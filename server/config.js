const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    sessionSecret: process.env.SESSION_SECRET,
    port: process.env.PORT,
    mongoPassword: process.env.MONGO_PASSWORD,
    clientAppEndpoint: process.env.CLIENT_APP_ENDPOINT,
};

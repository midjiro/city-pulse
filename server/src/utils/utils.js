const isLoggedIn = (req, res, next) => {
    req.user ? next() : res.sendStatus(401);
};

const isCredentialsProvided = (req, res, next) => {
    const credentials = req.body;

    Object.keys(credentials).length !== 0
        ? next()
        : res.status(401).json({ message: 'No credentials provided.' });
};

module.exports = {
    isLoggedIn,
    isCredentialsProvided,
};

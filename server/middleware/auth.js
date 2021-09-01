
const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.ACCESS_TOKEN_STRING , (err, user) => {
            if (err) {
                return res.status(403).json({ error: "invalid token"});
            }
            req.user = user;
            next();
        });
    } else {
        res.status(401).json({ error: "token not provided"});;
    }
};

module.exports = authenticateJWT;
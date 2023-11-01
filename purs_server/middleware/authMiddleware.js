const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const header = req.headers['authorization'];      //header from request
    if (typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];

        jwt.verify(token, "f9b327e70bbcf42494ccb28b2d98e00e", (err, decoded) => {   //verify jwt token
            if (err) {
                return res.status(403).send({ message: 'Invalid token.' });   // invalid token
            }

            req.user = decoded;   //decoded token
            next();
        });
    } else {
        res.status(403).send({ message: 'No token provided.' });  //token not provided
    }
};

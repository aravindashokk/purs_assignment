const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const header = req.headers['authorization'];      //header from request
    if (typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];

        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {   //verify jwt token
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

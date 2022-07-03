const jwt  = require('jsonwebtoken')

exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) {
        return res.status(401).send({"error" : "Invalid Token!"});
    } else {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if(err) return res.status(403).send({"error" : "invalid Token!"});

            req.user = user
            next()
        })
    }
}

exports.authenticatedUser = (req, res, next) => {
    if(!req.isAuthenticated()) res.status(403).send({"error" : "Not authenticated!"});

    next();
}
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
   const token = req.header('auth-token');
   if (!token) res.status(401).send('Access Denied');
   else {
      try {
         console.log(token);
         jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            console.log(err)
        
            if (err) return res.sendStatus(403)
        
            req.user = user
            console.log(user);
            next()
          })
      } catch (err) {
         res.status(400).send('Invalid Token');
      }
   }
};
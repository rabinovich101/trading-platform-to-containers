const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) return res.status(401).json('not authorized');
    if (token.length > 10) {
      jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
        if (err) return res.status(403).json('not authorized');
        req.user = user;
        next();
      })
    }
  return;
  }

  module.exports = {
    authenticateToken: authenticateToken 
  }
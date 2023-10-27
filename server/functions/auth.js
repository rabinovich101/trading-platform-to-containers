const jwt = require('jsonwebtoken');
const db = require("../dbConfig.js");
const util = require('util');
const query = util.promisify(db.query).bind(db);

function authenticateToken  (req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json('not authorized');
  jwt.verify(token, process.env.SECRET_TOKEN, async (err, user) => {
    if(!user) return res.status(403).json('not authorized');
    let {id, email} = user;
    if (!id || !email) {
      return res.status(403).json('not authorized');
    } else {
      const results = await query(`SELECT uniqID, email FROM users WHERE uniqID='${id}'`);
      if (err) return res.status(403).json('not authorized');
      if (results[0]?.uniqID === id && results[0]?.email === email) {
        req.user = user;
        next();
      }
    }
  });
};

module.exports = {
  authenticateToken
}
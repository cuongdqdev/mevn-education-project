let jwt                         = require('jsonwebtoken');
const { SECRET_JWT }            = require('../config');

let checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length); // Remove Bearer from string
  }

  if (token) {
    jwt.verify(token, SECRET_JWT, (err, decoded) => {
      if (err) {
        return res.json({ status: false, message: 'invalid_token' });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({ status: false, message: 'token_not_provide' });
  }
};

module.exports = {
  checkToken: checkToken
}
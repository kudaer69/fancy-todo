const jwt = require('jsonwebtoken');

const createToken = payload => {
  return jwt.sign(payload, process.env.SECRET);
};

const checkToken = token => {
  try {
    return jwt.verify(token, process.env.SECRET);
  } catch { return false }
};

module.exports = {
  createToken,
  checkToken
}
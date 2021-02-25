const bcrypt = require('bcrypt');

const createHash = password => {
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);

  return hash;
};

const checkHash = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

module.exports = {
  createHash,
  checkHash
};
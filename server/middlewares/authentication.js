const jwt = require('jsonwebtoken');
const { User, Todo } = require('../models');
const { checkToken } = require('../helpers/jwt');

const authenticate = (req, res, next) => {
  const check = checkToken(req.headers.token);
  const email = check.email;
  
  if (!email) throw { message: `Invalid token`, name: 401 };

  User.findOne({ where: { email: email } })
    .then(data => {
      if (!data) throw { message: `Invalid token`, name: 401 };

      req.decoded = check;
      next();
    })
    .catch(err => next(err))
};

const authorize = (req, res, next) => {
  try {
    const id = req.decoded.id;
    Todo.findOne({ where: { id: req.params.id } })
    .then(data => {
        if (!data) throw { message: `Invalid token`, name: 401 };
        if (data.userId != req.decoded.id) throw { message: `Not authorized`, name: 401 };

        next();
      })
    .catch(next)
  } catch (err) { next(err) }
};

module.exports = {
  authenticate,
  authorize
};
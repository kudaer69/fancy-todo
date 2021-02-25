const { User } = require('../models');
const { checkHash } = require('../helpers/bcrypt');
const { createToken } = require('../helpers/jwt');
const { OAuth2Client } = require('google-auth-library');

class UserController {
  static login (req, res, next) {
    console.log(`URL: ${req.originalUrl}`);

    User.findOne({ where: { email: req.body.email } })
    .then(data => {
        
        if (!data) throw { name: 400, message: `Invalid email or password` };
        const compare = checkHash(req.body.password, data.password);
        if (!compare) throw { name: 400, message: `Invalid email or password` };
        
        const token = createToken({ id: data.id, username: data.username, email: data.email });
        console.log(token);
        res.json({ token: token, message: `Welcome ${data.username}` })
      })  
      .catch(next)
  };

  static register (req, res, next) {
    console.log(`URL: ${req.originalUrl}`);
    
    User.create(req.body)
      .then(user => {
        res.status(201).json({ data: { id: user.id, username: user.username, email: user.email, role: user.role }, message: `Success create ${user.username}` })
      })
      .catch(next)
  };

  static googleLogin (req, res, next) {
    // const token = req.body.tokenOauth;
    // const ticket = client.veryfyIdToken({

    // })
    // User.findOne({ where: { email:  } })
  };
};

module.exports = UserController;
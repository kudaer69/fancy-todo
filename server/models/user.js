'use strict';
const {
  Model
} = require('sequelize');

const { createHash } = require('../helpers/bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      unique: { msg: `Username is invalid or already taken` },
      validate: {
        notEmpty: { msg: `Username cannot be empty` }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: { msg: `Email is invalid or already taken` },
      validate: {
        notEmpty: { msg: `Email cannot be empty` },
        isEmail: { msg: `Email is invalid or already taken` }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        passwordValidation (password) {
          if (!password) throw new Error (`Password cannot be empty`)
          else if (password.length < 8) throw new Error (`Password must be at least 8 characters`)
          else if (!(/\d+/.test(password))) throw new Error (`Password must contain at least one number`)
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        user.password = createHash(user.password);
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};
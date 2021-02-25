'use strict';
const {
  Model
} = require('sequelize');

const { dateValidation } = require('../helpers/date');

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Todo.belongsTo(models.User, { foreignKey: 'userId' })
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: `Title cannot be empty` }
      }
    },
    description: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.BOOLEAN,
      validate: {
        notEmpty: { msg: `Status cannot be empty` }
      }
    },
    due_date: {
      type: DataTypes.DATEONLY,
      validate: {
        isDate: { msg: `Invalid date format` },
        isAfter: { 
          args: dateValidation(),
          msg: `Due date can't be passed` 
        }
      }
    },
    userId: {
      type: DataTypes.INTEGER,
    }
  }, {
    hooks: {
      beforeCreate: (todo, options) => {
        todo.status = false
      }
    },
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};
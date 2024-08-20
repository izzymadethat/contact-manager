"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsToMany(models.Contact, {
        through: models.UserContact,
        foreignKey: "user_id",
        otherKey: "contact_id",
      });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING(12),
        allowNull: false,
        unique: true,
        validate: {
          len: [6, 12],
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};

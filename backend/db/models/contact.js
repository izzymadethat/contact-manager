"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    static associate(models) {
      Contact.hasMany(models.PhoneNumber, {
        foreignKey: "contact_id",
        as: "ContactNumbers",
      });
      Contact.belongsToMany(models.User, {
        through: models.UserContact,
        foreignKey: "contact_id",
        otherKey: "user_id",
      });
      Contact.hasMany(models.EmailAddress, {
        foreignKey: "contact_id",
        as: "ContactEmailAddresses",
      });
    }
  }
  Contact.init(
    {
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          isAlpha: true,
          len: [2, 50],
          isCapitalized(value) {
            if (!value[0].match(/[A-Z]/))
              throw new Error("First name must be capitalized");
          },
        },
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          isAlpha: true,
          len: [2, 50],
          isCapitalized(value) {
            if (!value[0].match(/[A-Z]/))
              throw new Error("Last name must be capitalized");
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Contact",
    }
  );
  return Contact;
};

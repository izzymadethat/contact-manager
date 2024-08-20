"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EmailAddress extends Model {
    static associate(models) {
      EmailAddress.belongsTo(models.Contact, {
        foreignKey: "contact_id",
      });
    }
  }
  EmailAddress.init(
    {
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      type: {
        type: DataTypes.ENUM("personal", "work", "main", "home", "other"),
        allowNull: false,
      },
      contact_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "EmailAddress",
    }
  );
  return EmailAddress;
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PhoneNumber extends Model {
    static associate(models) {
      PhoneNumber.belongsTo(models.Contact, {
        foreignKey: "contact_id",
      });
    }
  }
  PhoneNumber.init(
    {
      number: {
        type: DataTypes.STRING(12),
        allowNull: false,
        validate: {
          isNumeric: true,
          isValidPhoneNumber(value) {
            let pattern = "/^\\d{3}-\\d{3}-\\d{4}$";
            if (!value.match(pattern))
              throw new Error(
                "Invalid phone number format. Must follow XXX-XXX-XXXX format"
              );
          },
        },
      },
      type: DataTypes.ENUM(
        "personal",
        "mobile",
        "work",
        "home",
        "main",
        "other"
      ),
      contact_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "PhoneNumber",
    }
  );
  return PhoneNumber;
};

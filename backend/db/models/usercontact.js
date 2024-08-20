'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserContact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserContact.init({
    user_id: DataTypes.INTEGER,
    contact_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserContact',
  });
  return UserContact;
};
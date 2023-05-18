'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserBiodata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserBiodata.init({
    user_id: DataTypes.INTEGER,
    first_name: DataTypes.TEXT,
    last_name: DataTypes.TEXT,
    hobby: DataTypes.TEXT
  }, {
    sequelize,
    timestamps: false,
    modelName: 'UserBiodata',
    tableName: 'user_biodata'
  });
  return UserBiodata;
};
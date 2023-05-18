'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserHistory.init({
    user_id: DataTypes.INTEGER,
    game_id: DataTypes.INTEGER,
    win: DataTypes.INTEGER,
    lose: DataTypes.INTEGER,
    draw: DataTypes.INTEGER
  }, {
    sequelize,
    timestamps: false,
    modelName: 'UserHistory',
    tableName: 'user_history',
  });
  return UserHistory;
};
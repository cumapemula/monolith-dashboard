'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Room.init({
    game_id: DataTypes.INTEGER,
    created_by: DataTypes.INTEGER,
    completed: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Room',
    tableName: 'rooms',
    timestamps:false
  });
  return Room;
};
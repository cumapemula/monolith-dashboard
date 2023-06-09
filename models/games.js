'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Games extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Games.init({
    name: DataTypes.TEXT,
    genre: DataTypes.TEXT,
    max_player: DataTypes.INTEGER,
    win_score: DataTypes.INTEGER,
    lose_score: DataTypes.INTEGER,
    draw_score: DataTypes.INTEGER,
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Games',
    tableName: 'games'
  });
  return Games;
};
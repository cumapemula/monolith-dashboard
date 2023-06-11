'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('games', 'max_player', {
      type: DataTypes.INTEGER
    })
    await queryInterface.addColumn('games', 'win_score', {
      type: DataTypes.INTEGER
    })
    await queryInterface.addColumn('games', 'lose_score', {
      type: DataTypes.INTEGER
    })
    await queryInterface.addColumn('games', 'draw_score', {
      type: DataTypes.INTEGER
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("games", "max_player");
    await queryInterface.removeColumn("games", "win_score");
    await queryInterface.removeColumn("games", "lose_score");
    await queryInterface.removeColumn("games", "draw_score");
  }
};

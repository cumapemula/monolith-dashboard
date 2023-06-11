'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('user_history', 'total_score', {
      type: DataTypes.INTEGER,
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('user_history', 'total_score')
  }
};

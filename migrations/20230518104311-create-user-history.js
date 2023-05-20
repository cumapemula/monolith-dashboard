'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("user_history", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "users",
          },
          key: "id",
        },
      },
      game_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "games",
          },
          key: "id",
        },
      },
      win: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      lose: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      draw: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_history');
  }
};
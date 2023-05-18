'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_biodata', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'users'
          },
          key: 'id'
        }
      },
      first_name: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      last_name: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      hobby: {
        allowNull: false,
        type: Sequelize.TEXT
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_biodata');
  }
};
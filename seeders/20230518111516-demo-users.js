'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          username: "admin",
          password: "admin123",
          role: "admin",
        },
        {
          username: "johndoe",
          password: "john123",
          role: "player",
        },
        {
          username: "loremipsum",
          password: "loremipsum123",
          role: "player",
        },
        {
          username: "dolorsit",
          password: "dolorsit123",
          role: "player",
        },
        {
          username: "ametconsectetur",
          password: "ametconsectetur123",
          role: "player",
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
        await queryInterface.bulkDelete("users", null, {});
  }
};

'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          username: "admin",
          password: bcrypt.hashSync("admin123", 10),
          role: "admin",
        },
        {
          username: "johndoe",
          password: bcrypt.hashSync("john123", 10),
          role: "player",
        },
        {
          username: "loremipsum",
          password: bcrypt.hashSync("lorem123", 10),
          role: "player",
        },
        {
          username: "dolorsit",
          password: bcrypt.hashSync("dolor123", 10),
          role: "player",
        },
        {
          username: "ametconsectetur",
          password: bcrypt.hashSync(("amet123"), 10),
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

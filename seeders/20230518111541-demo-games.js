'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "games",
      [
        {
          name: "valorant",
          genre: "fps",
        },
        {
          name: "grand theft auto 5",
          genre: "adventure",
        },
        {
          name: "sleeping dogs",
          genre: "action",
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("games", null, {});
  }
};

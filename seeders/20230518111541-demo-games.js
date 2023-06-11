'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "games",
      [
        {
          name: "rock paper scissors",
          genre: "action",
          max_player: 2,
          win_score: 50,
          lose_score: -15,
          draw_score: 20,
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("games", null, {});
  }
};

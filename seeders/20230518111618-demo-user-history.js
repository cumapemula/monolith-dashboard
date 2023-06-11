'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "user_history",
      [
        {
          user_id: 1,
          game_id: 1,
          win: 0,
          lose: 0,
          draw: 0,
          total_score: 0,
        },
        {
          user_id: 2,
          game_id: 1,
          win: 0,
          lose: 0,
          draw: 0,
          total_score: 0,
        },
        {
          user_id: 3,
          game_id: 1,
          win: 0,
          lose: 0,
          draw: 0,
          total_score: 0,
        },
        {
          user_id: 4,
          game_id: 1,
          win: 0,
          lose: 0,
          draw: 0,
          total_score: 0,
        },
        {
          user_id: 5,
          game_id: 1,
          win: 0,
          lose: 0,
          draw: 0,
          total_score: 0,
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("user_history", null, {});
  }
};

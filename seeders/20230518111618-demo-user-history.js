'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "user_history",
      [
        {
          user_id: 1,
          game_id: 2,
          win: 0,
          lose: 0,
          draw: 0,
        },
        {
          user_id: 2,
          game_id: 1,
          win: 3,
          lose: 0,
          draw: 5,
        },
        {
          user_id: 3,
          game_id: 3,
          win: 2,
          lose: 1,
          draw: 2,
        },
        {
          user_id: 4,
          game_id: 2,
          win: 5,
          lose: 3,
          draw: 0,
        },
        {
          user_id: 5,
          game_id: 2,
          win: 1,
          lose: 2,
          draw: 2,
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("user_history", null, {});
  }
};

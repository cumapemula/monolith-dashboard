'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "user_biodata",
      [
        {
          user_id: 1,
          first_name: "admin",
          last_name: "ganteng",
          hobby: "coding",
        },
        {
          user_id: 2,
          first_name: "john",
          last_name: "doe",
          hobby: "badminton",
        },
        {
          user_id: 3,
          first_name: "lorem",
          last_name: "ipsum",
          hobby: "futsal",
        },
        {
          user_id: 4,
          first_name: "dolor",
          last_name: "sit",
          hobby: "soccer",
        },
        {
          user_id: 5,
          first_name: "amet",
          last_name: "consectetur",
          hobby: "drawing",
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("user_biodata", null, {});
  }
};

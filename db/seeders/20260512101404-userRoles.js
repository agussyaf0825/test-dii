'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert('userRoles', [
      {
        id: 1,
        usersId: 1,
        rolesId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        usersId: 2,
        rolesId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        usersId: 2,
        rolesId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        usersId: 3,
        rolesId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('userRoles', null, {});
  },
};

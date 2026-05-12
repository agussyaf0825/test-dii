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
    const roleAccesses = [];

    // Admin dapat semua menu
    for (let menuId = 1; menuId <= 19; menuId++) {
      roleAccesses.push({
        rolesId: 1,
        menusId: menuId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // Manager dapat Menu 1 dan Menu 2
    for (let menuId = 1; menuId <= 16; menuId++) {
      roleAccesses.push({
        rolesId: 2,
        menusId: menuId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // Staff hanya dapat beberapa menu
    [1, 2, 3, 4, 8, 9, 17, 18].forEach((menuId) => {
      roleAccesses.push({
        rolesId: 3,
        menusId: menuId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });

    await queryInterface.bulkInsert('roleAccesses', roleAccesses);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('roleAccesses', null, {});
  },
};

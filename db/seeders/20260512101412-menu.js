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
    await queryInterface.bulkInsert('menus', [
      {
        id: 1,
        parentId: null,
        name: 'Menu 1',
        path: '/menu-1',
        icon: 'folder',
        sortOrder: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        parentId: 1,
        name: 'Menu 1.1',
        path: '/menu-1-1',
        icon: 'circle',
        sortOrder: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        parentId: 1,
        name: 'Menu 1.2',
        path: '/menu-1-2',
        icon: 'circle',
        sortOrder: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        parentId: 3,
        name: 'Menu 1.2.1',
        path: '/menu-1-2-1',
        icon: 'dot',
        sortOrder: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        parentId: 3,
        name: 'Menu 1.2.2',
        path: '/menu-1-2-2',
        icon: 'dot',
        sortOrder: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        parentId: 1,
        name: 'Menu 1.3',
        path: '/menu-1-3',
        icon: 'circle',
        sortOrder: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        parentId: 6,
        name: 'Menu 1.3.1',
        path: '/menu-1-3-1',
        icon: 'dot',
        sortOrder: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        id: 8,
        parentId: null,
        name: 'Menu 2',
        path: '/menu-2',
        icon: 'folder',
        sortOrder: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9,
        parentId: 8,
        name: 'Menu 2.1',
        path: '/menu-2-1',
        icon: 'circle',
        sortOrder: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 10,
        parentId: 8,
        name: 'Menu 2.2',
        path: '/menu-2-2',
        icon: 'circle',
        sortOrder: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 11,
        parentId: 10,
        name: 'Menu 2.2.1',
        path: '/menu-2-2-1',
        icon: 'dot',
        sortOrder: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 12,
        parentId: 10,
        name: 'Menu 2.2.2',
        path: '/menu-2-2-2',
        icon: 'dot',
        sortOrder: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 13,
        parentId: 12,
        name: 'Menu 2.2.2.1',
        path: '/menu-2-2-2-1',
        icon: 'dot',
        sortOrder: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 14,
        parentId: 12,
        name: 'Menu 2.2.2.2',
        path: '/menu-2-2-2-2',
        icon: 'dot',
        sortOrder: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 15,
        parentId: 10,
        name: 'Menu 2.2.3',
        path: '/menu-2-2-3',
        icon: 'dot',
        sortOrder: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 16,
        parentId: 8,
        name: 'Menu 2.3',
        path: '/menu-2-3',
        icon: 'circle',
        sortOrder: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        id: 17,
        parentId: null,
        name: 'Menu 3',
        path: '/menu-3',
        icon: 'folder',
        sortOrder: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 18,
        parentId: 17,
        name: 'Menu 3.1',
        path: '/menu-3-1',
        icon: 'circle',
        sortOrder: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 19,
        parentId: 17,
        name: 'Menu 3.2',
        path: '/menu-3-2',
        icon: 'circle',
        sortOrder: 2,
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
    await queryInterface.bulkDelete('menus', null, {});
  },
};
